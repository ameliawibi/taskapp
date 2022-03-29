import {pool} from "../utility/connect";
import { validationResult } from "express-validator";
let errorMessage = [];

const postLabel = (req, res) => {
  const task_id = req.params.id;
  //console.log(task_id);
  const status_id = req.params.statusid;
  //console.log(status_id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage = errors.errors;
    res.redirect("/note");
    return;
  }

  const labelData = [req.body.label];
  const labelQuery = `INSERT INTO labels (label) VALUES ($1)`;
  pool.query(labelQuery, labelData)
  .then( (result) => {
    if (result) {
      if (task_id && status_id == 0) {
      res.redirect(`/task/${task_id}/edit`);
    }
    if (status_id && task_id == 0) {
      res.redirect(`/task/add/${status_id}`); 
    }
  }
  })
  .catch((error) => console.log(error.stack))
};

export default postLabel;
