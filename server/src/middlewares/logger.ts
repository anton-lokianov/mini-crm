import { Request, Response, NextFunction } from "express";
import winston from "winston";

const { colorize, timestamp, printf, combine } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
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
