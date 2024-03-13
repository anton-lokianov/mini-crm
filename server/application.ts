import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";

import { errorMiddleware } from "./src/middlewares/errorHandler";
import { logger } from "./src/middlewares/logger";
import authRouter from "./src/routes/auth";
import adminRouter from "./src/routes/admin";

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initialRoutes();
    this.initializeErrorHandling();
    this.connectToDatabase();
    this.listen();
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    this.app.use(logger);
  }

  private initialRoutes(): void {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/admin",[], adminRouter);
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private connectToDatabase(): void {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) {
      console.error("Missing MONGO_URL!!!");
      process.exit(1);
    }

    mongoose
      .connect(MONGO_URL)
      .then(() => console.log("Connected to MongoDB"))
      .catch((error) => {
        console.log(`Cannot connect to database: ${error.message}`);
        process.exit(1);
      });
  }

  private listen(): void {
    const PORT = process.env.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  }
}

new App();
