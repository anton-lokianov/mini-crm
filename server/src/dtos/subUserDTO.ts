import { body } from "express-validator";

export const subUserDTO = () => {
  return [
    body("userName").isString().trim().notEmpty(),
    body("password").isString().trim().notEmpty().isLength({ min: 6 }),
    body("email").isEmail().trim().notEmpty(),
    body("firstName").isString().trim().notEmpty(),
    body("lastName").isString().trim().notEmpty(),
    body("role")
      .isString()
      .trim()
      .notEmpty()
      .isIn(["operator", "manager", "service"]),
    body("phone").isString().trim().notEmpty(),
    body("company").isString().trim().notEmpty(),
  ];
};
