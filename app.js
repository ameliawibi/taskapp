import express from "express";
import cookieParser from 'cookie-parser';
import { taskRouter } from "./routes/task.js";
import { authRouter } from "./routes/userAuth.js";
import {router} from "./routes/index.js";
import fileUpload from "express-fileupload";

let app = express();

// Set the view engine to ejs
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(fileUpload());
// serve static files
app.use(express.static("uploads"));
app.use(express.static("public"));

app.use("/", router);
app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.listen(3004);