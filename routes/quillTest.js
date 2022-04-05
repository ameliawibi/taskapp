import express from 'express';

const quillRouter = express.Router();

// Configure Express to parse request body data into request.body
quillRouter.use(express.urlencoded({ extended: false }));

quillRouter.get('/', (req, res) => {
  let ejsData = {about:""}
    res.render("quill", ejsData);
});

quillRouter.post('/', (req,res) => {
  let ejsData = req.body;
  console.log(ejsData);
  res.render("quill", ejsData)
})

export default quillRouter;