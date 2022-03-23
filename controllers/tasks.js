import "dotenv/config";
import {pool} from "../utility/connect";
import { validationResult } from "express-validator";
const salt = process.env.SECRET_KEY;
let errorMessage = [];
let payload ={};

export const getTaskPost = (req,res) => {
  let ejsData = {
    active_user: req.cookies.avatar,
    error: errorMessage,
    due_date : "due_date" in payload ? payload.due_date : "",
    name: "name" in payload ? payload.name : "",
    description: "description" in payload ? payload.description : "",
    assigned_to: "assigned_to" in payload ? payload.assigned_to : "",
    label_id: "label_id" in payload ? payload.label_id : [],
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
    res.redirect("/task/add");
    return;
  }
  
  const task = req.body;
 
  const taskInput = [
    task.due_date,
    task.name,
    task.description,
    Number(task.assigned_to),
    1,
  ];
  const taskQuery = 'INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ($1, $2, $3, $4, $5) RETURNING id';

  pool.query(taskQuery,taskInput).then((result) => {
    const taskId = result.rows[0].id;
    const labelArray = task.label_id;
    labelArray.forEach((labelId) => {
      const labelQuery = 'INSERT INTO task_labels (task_id,label_id) VALUES ($1,$2)'
      const labelInput = [taskId,labelId];
      return pool.query(labelQuery,labelInput)
    })}).then((finalResult) => {
      res.redirect("/task");
  })
  .catch((error) => console.log(error.stack)); 
};

export const getAllTasks = (req,res) => {
  let ejsData = {};
  let ejsLabel;
  let ejsComment;
  let getAllQuery = 'SELECT task_statuses.status,tasks.id,tasks.due_date,tasks.name AS task_name,tasks.description,tasks.assigned_to,users.avatar AS user_avatar FROM tasks INNER JOIN task_statuses ON tasks.task_status_id=task_statuses.id INNER JOIN users ON tasks.assigned_to=users.id ORDER BY task_statuses.id';
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
      };
      
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
  res.send('NOT IMPLEMENTED: render single task edit form');
};

export const editTask = (req,res) => {
  res.send('NOT IMPLEMENTED: update single task');
};

export const deleteTask = (req,res) => {
  res.send('NOT IMPLEMENTED: delete single task');
};