import {check} from "express-validator";

export const commentValidator = [
  check("comment").not().isEmpty().withMessage("This field is required"),
];

export const labelValidator = [
  check("label").not().isEmpty().withMessage("This field is required"),
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

export const taskValidator = [
    check("due_date")
    .not()
    .isEmpty()
    .withMessage("This field is required")
    .bail()
    .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/)
    .withMessage("Please type in MM/DD/YYYY format")
    .bail()
    .isAfter(new Date().toDateString())
    .withMessage("Date cannot be in the past"),
  check("name").not().isEmpty().withMessage("This field is required"),
  check("description").not().isEmpty().withMessage("This field is required"),
  check("assigned_to")
    .not()
    .isEmpty()
    .withMessage("This field is required"),
  check("label_id")
    .not()
    .isEmpty()
    .withMessage("This field is required")
    .bail()
    .isArray({ min: 2, max: 10 })
    .withMessage("At least 2 is required"),
];