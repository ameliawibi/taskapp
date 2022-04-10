import express from "express";

const chatRouter = express.Router();

chatRouter.get("/", (req, res) => {
  const ejsData = {
    active_user :req.cookies.avatar
  }
  res.render("chat", ejsData);
});


export default chatRouter;