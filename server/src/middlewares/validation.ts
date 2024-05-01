import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";

type DTOFunction = () => ValidationChain[];

export const validation = (dtoFunction: DTOFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = dtoFunction();
    for (let validationRule of dto) {
      await validationRule.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation failed, check your data.",
        errors: errors.array(),
      });
    }
    next();
  };
};
