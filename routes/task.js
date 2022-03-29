import express from 'express';
import methodOverride from 'method-override';
import {
  postTask, getAllTasks, getTaskPost, getTaskEdit, editTask, deleteTask, moveTask,
} from '../controllers/tasks';
import { postComment } from '../controllers/comments';
import postLabel from '../controllers/labels';
import {restrictToLoggedIn} from "../utility/hash";
import {
  taskValidator,commentValidator,labelValidator
} from "../utility/validator";

const taskRouter = express.Router();
// Configure Express to parse request body data into request.body
taskRouter.use(express.urlencoded({ extended: false }));
// Override POST requests with query param ?_method=PUT/DELETE to be PUT/DELETE requests
taskRouter.use(methodOverride('_method'));

/// TASK ROUTES ///
taskRouter.post('/add/:statusid',restrictToLoggedIn, taskValidator, postTask);

taskRouter.get('/add/:statusid',restrictToLoggedIn, getTaskPost);


taskRouter.get('/', restrictToLoggedIn, getAllTasks);

taskRouter.get('/:id/edit', restrictToLoggedIn, getTaskEdit);

taskRouter.put('/:id/edit',taskValidator, restrictToLoggedIn,editTask);

taskRouter.delete('/:id/delete', restrictToLoggedIn,deleteTask);

taskRouter.put('/:taskid/move/:statusid',restrictToLoggedIn,moveTask);

/// COMMENT ROUTES ///
taskRouter.post('/:id/comment', restrictToLoggedIn,commentValidator,postComment);

/// LABEL ROUTES ///
taskRouter.post('/:id/label/:statusid', restrictToLoggedIn, labelValidator, postLabel);

export default taskRouter;
