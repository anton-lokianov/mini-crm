import { body } from "express-validator";

export const updateAuthUserDTO = () => {
  return [
    body("userName").isString().trim().notEmpty(),
    body("email").isEmail().trim().notEmpty(),
    body("firstName").isString().trim().notEmpty(),
    body("lastName").isString().trim().notEmpty(),
    body("phone").isString().trim().notEmpty(),
    body("company").isString().trim().notEmpty(),
  ];
};

export const loginDTO = () => {
  return [
    body("userName").isString().trim().notEmpty(),
    body("password").isString().trim().notEmpty(),
  ];
};
