import path from 'path';
import "dotenv/config";
import { validationResult } from "express-validator";
import {getHashString, getHashedCookie} from "../utility/hash";
import model from "../src/models";

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
const salt = process.env.SECRET_KEY;
let errorMessage = [];

export async function getSignup (req, res) {
  if( req.isUserLoggedIn === true ){
    res.redirect('/');
    return;
  }
    const ejsData = {
    error: errorMessage,
  };
  errorMessage = [];
  res.render('signup', ejsData);
}

export async function postSignup (req,res) {
  try{
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

  await model.User.create({
        avatar: avatar.name,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

  return res.redirect("/auth/login");
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
}

export async function getLogin (req, res) {
  if( req.isUserLoggedIn === true ){
    res.redirect('/');
    return;
  }
    const ejsData = {
    error: errorMessage,
  };
  errorMessage = [];
  res.render("login", ejsData);
}

export async function postLogin (req, res) {
  try {
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

  const userLoggedIn = await model.User.findOne({ where: { email: values } });

  if (userLoggedIn === null) {
    // we didnt find a user with that email.
        // the error for password and user are the same. don't tell the user which error they got for security reasons, otherwise people can guess if a person is a user of a given service.
        //store error message and session data
        errorMessage = "User does not exists";
        res.redirect("/auth/login");
        return;
  }

  const hashedPassword = getHashString(req.body.password);
  if (userLoggedIn.password === hashedPassword) {
    res.cookie("userID", `${userLoggedIn.id}`);
    res.cookie("avatar", userLoggedIn.avatar);
    const hashedCookieString = getHashedCookie(userLoggedIn.id, salt);
    res.cookie("loggedInHash", hashedCookieString);

    res.redirect("/");
  } else {
    // password didn't match
    // the error for password and user are the same. don't tell the user which error they got for security reasons, otherwise people can guess if a person is a user of a given service.
    //store error message and session data
    errorMessage = "User does not exists";
    res.redirect("/auth/login");
  }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message:
        "Could not perform operation at this time, kindly try again later.",
    });
  }
}

export async function getLogout (_req, res) {
  res.clearCookie("loggedInHash");
  res.clearCookie("userID");
  res.clearCookie("avatar");
  res.redirect("/auth/login");
}
