import model from "../src/models";
import { validationResult } from "express-validator";
let errorMessage = [];

export default async function postLabel (req, res) {
  try{
  const task_id = req.params.id;
  
  const status_id = req.params.statusid;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage = errors.errors;
    res.redirect("/note");
    return;
  }
  await model.Label.create({
        label: req.body.label,
      });
    
  if (task_id && status_id == 0) {
  res.redirect(`/task/${task_id}/edit`);
  }
  if (status_id && task_id == 0) {
    res.redirect(`/task/add/${status_id}`); 
  }
  }
  catch (e) {
        console.log(e);
        return res.status(500).send({
          message:
            "Could not perform operation at this time, kindly try again later.",
        });
      }
  }
