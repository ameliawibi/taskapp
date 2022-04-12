import express from "express";
import {restrictToLoggedIn} from "../utility/hash";

const chatRouter = express.Router();

chatRouter.get("/", restrictToLoggedIn, (req, res) => {
  const ejsData = {
    active_user :req.cookies.avatar
  }
  res.render("chat", ejsData);
});


export default chatRouter;