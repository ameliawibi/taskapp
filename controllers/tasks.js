import "dotenv/config";
import {getHashedCookie} from "../utility/hash";
import {pool} from "../utility/connect";
const salt = process.env.SECRET_KEY;

export const getTaskPost = (req,res) => {
  res.send('NOT IMPLEMENTED: render add new task form');
};

export const postTask = (req,res) => {
  res.send('NOT IMPLEMENTED: add new task');
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