import model from "../src/models";
import { validationResult } from "express-validator";
let errorMessage = [];

export default async function postComment (req, res) {
  try{
  const task_id = req.params.id;
  const user_id = req.cookies.userID;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage = errors.errors;
    res.redirect(`/task/${task_id}/edit`);
    return;
  }

  await model.Comment.create({
        comment: req.body.comment,
        task_id: Number(task_id),
        user_id: Number(user_id),
      });
  return res.redirect(`/task/${task_id}/edit`);
  } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
}