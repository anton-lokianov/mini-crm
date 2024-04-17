import { Request, Response, NextFunction } from "express";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const { method, url, body, query, params, headers } = req;
    const { statusCode } = res;
    const responseTime = Date.now() - start;

    logger.info(
      `method: ${method}, url: ${url}, statusCode: ${statusCode}, responseTime: ${responseTime}ms, requestData: ${JSON.stringify(
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
  });

  next();
};
