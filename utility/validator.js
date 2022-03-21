import {check} from "express-validator";

export const commentValidator = [
  check("comment").not().isEmpty().withMessage("This field is required"),
];

export const loginValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("This field is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  check("password").not().isEmpty().withMessage("This field is required"),
];

export const signUpValidator = [
  check("name").not()
    .isEmpty()
    .withMessage("This field is required"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("This field is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  check("password").not().isEmpty().withMessage("This field is required"),
];

