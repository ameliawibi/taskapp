import {pool} from "../utility/connect";
import { validationResult } from "express-validator";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {sendPostTaskEmail} from "../utility/mail";

let errorMessage = [];
let payload ={};

dayjs.extend(relativeTime);

export const getTaskPost = (req,res, next) => {

  let ejsData = {
    active_user: req.cookies.avatar,
    error: errorMessage,
    due_date : "due_date" in payload ? payload.due_date : "",
    name: "name" in payload ? payload.name : "",
    description: "description" in payload ? payload.description : "",
    assigned_to: "assigned_to" in payload ? payload.assigned_to : "",
    label_id: "label_id" in payload ? payload.label_id : [],
    task_status_id: req.params.statusid,
  };


  pool.query('SELECT * FROM users').then((userList)  => {
  if (userList.rows) {
    ejsData.assigned_to_options = userList.rows;
  }
    return pool.query('SELECT * from labels')
     }).then((labelList) => {
   if (labelList.rows) {
     ejsData.label_options = labelList.rows;
   }
   //console.log(ejsData);
   errorMessage = [];
   payload = {};
   //res.send('NOT IMPLEMENTED: render add new task form');
   res.render('addTask',ejsData);
  })
  .catch((error) => console.log(error.stack));  
};

export const postTask = (req,res) => {
  //console.log(req.body);
  payload = req.body;
  //console.log(payload);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //store error message and session data
    errorMessage = errors.errors;
    res.redirect(`/task/add/${req.params.statusid}`);
    return;
  }
  
  const task = req.body;
 
  const taskInput = [
    task.due_date,
    task.name,
    task.description,
    Number(task.assigned_to),
    Number(req.params.statusid),
  ];
  const taskQuery = 'INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ($1, $2, $3, $4, $5) RETURNING id';

  pool.query(taskQuery,taskInput).then((result) => {
    const taskId = result.rows[0].id;
    const labelArray = task.label_id;
    labelArray.forEach((labelId) => {
      const labelQuery = 'INSERT INTO task_labels (task_id,label_id) VALUES ($1,$2)'
      const labelInput = [taskId,labelId];
      return pool.query(labelQuery,labelInput)
    })}).then((labelResult) => {
      return pool.query(`SELECT * FROM users WHERE id=${Number(task.assigned_to)}`)
      .then((userList) => {
      const emailParams = {
        context: "You have a new task",
        toEmail: userList.rows[0].email,
        userName: userList.rows[0].name,
        taskName: task.name,
        taskDesc: task.description,
        dueDate: task.due_date,
      }
      sendPostTaskEmail(emailParams);
      //console.log(emailParams);
      res.redirect("/task");
      })
  })
  .catch((error) => console.log(error.stack)); 
};

export const getAllTasks = (req,res) => {
  errorMessage = [];
  payload = {};
  let ejsData = {};
  let ejsLabel;
  let ejsComment;
  let getAllQuery = 'SELECT task_statuses.status,tasks.id,tasks.due_date,tasks.name AS task_name,tasks.description,tasks.assigned_to,users.avatar AS user_avatar FROM tasks INNER JOIN task_statuses ON tasks.task_status_id=task_statuses.id INNER JOIN users ON tasks.assigned_to=users.id ORDER BY task_statuses.id ASC, tasks.id DESC';
  pool.query(getAllQuery).then((result) => {
      for (let i = 0; i < result.rows.length; i++) {
        let status = result.rows[i].status;
        var objects = result.rows[i];

        if (status in ejsData) {
          ejsData[status].push(objects);
        }
        else {
          ejsData[status] = [objects];
        }
      }
      
      return pool.query(
      `SELECT tasks.id,labels.label FROM tasks INNER JOIN task_labels ON tasks.id = task_labels.task_id INNER JOIN labels ON labels.id = task_labels.label_id`
    );
  })
  .then((labelResult) => {
    if (labelResult.rows) {
      ejsLabel = labelResult.rows;
    }
    return pool.query(
      `SELECT COUNT(comments.id), tasks.id FROM comments
INNER JOIN tasks ON comments.task_id = tasks.id
GROUP BY tasks.id;`
    )
  })
  .then((commentCounter) => {
    if (commentCounter.rows) {
      ejsComment = commentCounter.rows;
    }
  res.render('board', {'ejsData':ejsData, 'active_user': req.cookies.avatar, 'ejsLabel':ejsLabel, 'ejsComment':ejsComment});
  })
  .catch((error) => console.log(error.stack));
};

export const getTaskEdit = (req,res) => {
  let ejsData = {};
  let ejsLabel = [];
  let ejsLabelOptions;
  let ejsStatusOptions;
  let ejsUser;
  let ejsComment;
  let getAllQuery = `SELECT task_statuses.id AS task_status_id, task_statuses.status,tasks.id,tasks.due_date,tasks.name,tasks.description,tasks.assigned_to,users.avatar FROM tasks INNER JOIN task_statuses ON tasks.task_status_id=task_statuses.id INNER JOIN users ON tasks.assigned_to=users.id WHERE tasks.id = ${req.params.id}`;
  pool.query(getAllQuery).then((result) => {
    ejsData = {
    id: req.params.id,
    task_status_id: "task_status_id" in payload ? payload.task_status_id : result.rows[0].task_status_id,
    due_date: "due_date" in payload ? payload.due_date : result.rows[0].due_date,
    name: "name" in payload ? payload.name : result.rows[0].name,
    description: "description" in payload ? payload.description : result.rows[0].description,
    assigned_to: "assigned_to" in payload ? payload.assigned_to : result.rows[0].assigned_to,
  };
  //console.log(ejsData);
      return pool.query(
      `SELECT labels.id,labels.label FROM tasks INNER JOIN task_labels ON tasks.id = task_labels.task_id INNER JOIN labels ON labels.id = task_labels.label_id WHERE tasks.id = ${req.params.id}`
    );
  })
  .then((labelResult) => {
    //console.log(payload.label_id);
    //convert to number
    if (labelResult.rows) {
      ("label_id" in payload)
      ? ejsLabel = payload.label_id
      :
      labelResult.rows.forEach((data) => { 
      ejsLabel.push(data.id.toString())
      })
    }
    payload = {};
    //console.log(ejsLabel);
    return pool.query('SELECT * FROM users')
  })
  .then((userList) => {
    if (userList.rows) {
      ejsUser = userList.rows;
    }
    return pool.query('SELECT * FROM task_statuses')
  })
  .then((statusOptions) => {
    if (statusOptions.rows) {
      ejsStatusOptions = statusOptions.rows;
    }
    return pool.query('SELECT * FROM labels')
  })
  .then((labelList) => {
    if (labelList.rows) {
      ejsLabelOptions = labelList.rows;
    }
    return pool.query(
      `SELECT * FROM tasks
INNER JOIN comments ON comments.task_id = tasks.id
WHERE tasks.id = ${req.params.id};`
    )
  })
  .then((commentCounter) => {
    if (commentCounter.rows) {
      ejsComment = commentCounter.rows;
      //console.log(ejsComment);
      ejsComment.forEach((data, index) => {
        ejsComment[index].created_at = dayjs(data.created_at).fromNow();
        //console.log(ejsComment[index].created_at);
      })
    }
  let error = errorMessage;
  errorMessage = [];
  //res.json({'ejsData':ejsData, 'active_user': req.cookies.avatar, 'ejsLabel':ejsLabel, 'ejsUser': ejsUser, 'ejsStatusOptions': ejsStatusOptions,'ejsLabelOptions': ejsLabelOptions, 'ejsComment':ejsComment, 'error': error});
  res.render('editTask', {'ejsData':ejsData, 'active_user': req.cookies.avatar, 'ejsLabel':ejsLabel, 'ejsUser': ejsUser, 'ejsStatusOptions': ejsStatusOptions,'ejsLabelOptions': ejsLabelOptions, 'ejsComment':ejsComment, 'error': error});
  })
  .catch((err) => console.log(err.stack));
};

export const editTask = (req,res) => {
  payload = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //store error message and session data
    errorMessage = errors.errors;
    res.redirect(`/task/${req.params.id}/edit`);
    return;
  }
  
  const task = req.body;
 
  const taskInput = [
    task.due_date,
    task.name,
    task.description,
    Number(task.assigned_to),
    task.task_status_id,
  ];
  const taskQuery = `UPDATE "tasks" SET "due_date"=$1, "name"=$2, "description"=$3, "assigned_to" =$4 ,"task_status_id"=$5 WHERE id=${req.params.id} RETURNING ID`;
  
  pool.query(`DELETE from task_labels WHERE task_id=${req.params.id}`)
  .then((deleteRes) => {
    return pool.query(taskQuery,taskInput)
  })
  .then((result) => {
    const taskId = result.rows[0].id;
    const labelArray = task.label_id;
    labelArray.forEach((labelId) => {
      const labelQuery = `INSERT INTO task_labels (task_id,label_id) VALUES ($1,$2)`
      const labelInput = [taskId,labelId];
      return pool.query(labelQuery,labelInput)
    })}).then((labelResult) => {
      return pool.query(`SELECT * FROM users WHERE id=${Number(task.assigned_to)}`)
      .then((userList) => {
      const emailParams = {
        context: "You have an updated task",
        toEmail: userList.rows[0].email,
        userName: userList.rows[0].name,
        taskName: task.name,
        taskDesc: task.description,
        dueDate: task.due_date,
      }
      sendPostTaskEmail(emailParams);
      //console.log(emailParams);
      res.redirect("/task");
      })
  })
  .catch((error) => console.log(error.stack)); 
};

export const deleteTask = (req,res) => {
  const taskId = req.params.id;
  pool.query(`DELETE from tasks WHERE id=${taskId}`)
  .then((result) => {
    res.redirect("/task");
  })
  .catch((error) => console.log(error.stack));
};

export const moveTask = (req,res) => {
  const taskId = req.params.taskid
  const statusId = req.params.statusid;
  pool.query(`UPDATE "tasks" SET "task_status_id"=${statusId} WHERE id=${taskId}`)
  .then((result) => {
    res.redirect("/task");
  })
  .catch((error) => console.log(error.stack));
};