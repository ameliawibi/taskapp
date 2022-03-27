import {pool} from "../utility/connect";
import { validationResult } from "express-validator";
let errorMessage = [];

export const postComment = (req, res) => {
  const task_id = req.params.id;
  const user_id = req.cookies.userID;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage = errors.errors;
    res.redirect(`/task/${task_id}/edit`);
    return;
  }

  const commentData = [req.body.comment, Number(task_id), Number(user_id)];
  const commentQuery = `INSERT INTO comments (comment,task_id,user_id) VALUES($1,$2,$3)`;

  pool.query(commentQuery, commentData)
  .then( (result) => {
    if (result) {
      // this is the output
      res.redirect(`/task/${task_id}/edit`);
    }
  })
  .catch((error) => console.log(error.stack))
};