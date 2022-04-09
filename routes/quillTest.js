import express from 'express';

const quillRouter = express.Router();

// Configure Express to parse request body data into request.body
quillRouter.use(express.urlencoded({ extended: false }));

quillRouter.get('/', (req, res) => {
  let ejsData = {about:""}
    res.render("quill", ejsData);
});

quillRouter.post('/', (req,res) => {
  //console.log(req.body);
  let ejsData = req.body;
  ejsData.about = JSON.parse(req.body.about);
  //console.log(ejsData);
  //console.log(JSON.stringify(ejsData.about));
  res.render("quill", ejsData)
})

export default quillRouter;