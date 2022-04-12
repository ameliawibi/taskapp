import express from 'express';
import {restrictToLoggedIn} from "../utility/hash";

const quillRouter = express.Router();

// Configure Express to parse request body data into request.body
quillRouter.use(express.urlencoded({ extended: false }));

quillRouter.get('/',restrictToLoggedIn, (_req, res) => {
  let ejsData = {about:""}
    res.render("quill", ejsData);
});

quillRouter.post('/',restrictToLoggedIn, (req,res) => {
  let ejsData = req.body;
  ejsData.about = JSON.parse(req.body.about);
  res.render("quill", ejsData)
})

export default quillRouter;