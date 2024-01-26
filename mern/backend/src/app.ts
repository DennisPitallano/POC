import "dotenv/config";
import express from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const morganMiddleware = morgan("dev");

const app = express();

app.use(morganMiddleware);

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
  next(new createHttpError.NotFound("Endpoint Not found"));
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
  ) => {
    console.log(err);
    let errorMessage = "An unknown error occurred!";
    let statusCode = 500;
    if (isHttpError(err)) {
      statusCode = err.statusCode;
      errorMessage = err.message;
    }
    res.status(statusCode).json({ error: errorMessage });
  }
);

export default app;
