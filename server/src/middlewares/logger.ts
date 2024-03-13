import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  const logDetails = () => {
    const { method, url, body, query, params, headers } = req;
    const { statusCode } = res;
    const responseTime = Date.now() - start;

    console.log(
      `method: ${method},
      url: ${url},
      statusCode: ${statusCode},
      responseTime: ${responseTime}ms,
      requestData: ${JSON.stringify(
        {
          body,
          query,
          params,
          headers,
        },
        null,
        2
      )}`
    );
  };

  res.on("finish", logDetails);
  next();
};
