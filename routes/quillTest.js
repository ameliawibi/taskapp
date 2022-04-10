import express from 'express';

const quillRouter = express.Router();

// Configure Express to parse request body data into request.body
quillRouter.use(express.urlencoded({ extended: false }));

quillRouter.get('/', (_req, res) => {
  let ejsData = {about:""}
    res.render("quill", ejsData);
});

quillRouter.post('/', (req,res) => {
  let ejsData = req.body;
  ejsData.about = JSON.parse(req.body.about);
  res.render("quill", ejsData)
})

export default quillRouter;