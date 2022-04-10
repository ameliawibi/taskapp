import path from 'path';
import "dotenv/config";
import { validationResult } from "express-validator";
import {getHashString, getHashedCookie} from "../utility/hash";
import {pool} from "../utility/connect";

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
const salt = process.env.SECRET_KEY;
let errorMessage = [];

export const getSignup = (req, res) => {
  if( req.isUserLoggedIn === true ){
    res.redirect('/');
    return;
  }
    const ejsData = {
    error: errorMessage,
  };
  errorMessage = [];
  res.render('signup', ejsData);
};

export const postSignup = (req, res) => {
  if( req.isUserLoggedIn === true ){
      res.redirect('/');
      return;
    }
  const errors = validationResult(req);
  if (!errors.isEmpty() || !req.files || Object.keys(req.files).length === 0) {
    //store error message and session data
    errorMessage = errors.errors;
    console.log(errorMessage);
    console.log(req.files);
    res.redirect("/auth/signup");
    return;
  }

  const hashedPassword = getHashString(req.body.password);
  const { avatar } = req.files;
  const uploadPath = `${__dirname}/uploads/${avatar.name}`;

  avatar.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });

  const values = [avatar.name, req.body.name, req.body.email, hashedPassword];

  pool.query(
    `INSERT INTO users (avatar,name,email,password) VALUES ($1, $2, $3, $4)`,
    values,
    (error, _queryResult) => {
      if (error) {
        console.log("Error executing query", error.stack);
        return res.status(503).send("Service is unavailable");
      }
      res.redirect("/auth/login");
    }
  );
};

export const getLogin = (req, res) => {
  if( req.isUserLoggedIn === true ){
    res.redirect('/');
    return;
  }
    const ejsData = {
    error: errorMessage,
  };
  errorMessage = [];
  res.render("login", ejsData);
};

export const postLogin = (req, res) => {
  if( req.isUserLoggedIn === true ){
    res.redirect('/');
    return;
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //store error message and session data
    errorMessage = errors.errors;
    res.redirect("/auth/login");
    return;
  }
  const values = [req.body.email.toLowerCase()];
  pool.query(
    "SELECT * from users WHERE email=$1",
    values,
    (error, result) => {
      if (error) {
        console.log("Error executing query", error.stack);
        res.status(503).send("Service is unavailable");
        return;
      }

      if (result.rows.length === 0) {
        // we didnt find a user with that email.
        // the error for password and user are the same. don't tell the user which error they got for security reasons, otherwise people can guess if a person is a user of a given service.
        //store error message and session data
        errorMessage = "User does not exists";
        res.redirect("/auth/login");
        return;
      }

      const user = result.rows[0];
      const hashedPassword = getHashString(req.body.password);
      if (user.password === hashedPassword) {
        res.cookie("userID", `${user.id}`);
        res.cookie("avatar", user.avatar);
        const hashedCookieString = getHashedCookie(user.id, salt);
        res.cookie("loggedInHash", hashedCookieString);

        res.redirect("/");
      } else {
        // password didn't match
        // the error for password and user are the same. don't tell the user which error they got for security reasons, otherwise people can guess if a person is a user of a given service.
        //store error message and session data
        errorMessage = "User does not exists";
        res.redirect("/auth/login");
      }
    }
  );
};

export const getLogout = (_req, res) => {
  res.clearCookie("loggedInHash");
  res.clearCookie("userID");
  res.clearCookie("avatar");
  res.redirect("/auth/login");
};
