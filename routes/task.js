import express from 'express';
import methodOverride from 'method-override';
import {
  postTask, getAllTasks, getTaskPost, getTaskEdit, editTask, deleteTask,
} from '../controllers/tasks';
import { postComment } from '../controllers/comments';
import postLabel from '../controllers/labels';

const taskRouter = express.Router();
// Configure Express to parse request body data into request.body
taskRouter.use(express.urlencoded({ extended: false }));
// Override POST requests with query param ?_method=PUT/DELETE to be PUT/DELETE requests
taskRouter.use(methodOverride('_method'));

/// TASK ROUTES ///
taskRouter.get('/add', getTaskPost);

taskRouter.post('/add', postTask);

taskRouter.get('/', getAllTasks);

taskRouter.get('/:id/edit', getTaskEdit);

taskRouter.put('/:id/edit', editTask);

taskRouter.delete('/:id/delete', deleteTask);

/// COMMENT ROUTES ///
taskRouter.post('/:id/comment', postComment);

/// LABEL ROUTES ///
taskRouter.post('/label', postLabel);

export default taskRouter;
