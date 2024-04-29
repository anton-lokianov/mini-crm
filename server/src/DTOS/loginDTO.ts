import { body } from "express-validator";

export const loginDTO = () => {
  return [
    body("userName").isString().trim().notEmpty(),
    body("password").isString().trim().notEmpty(),
  ];
};
