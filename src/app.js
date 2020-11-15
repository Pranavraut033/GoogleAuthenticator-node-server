import createError from "http-errors";
import express from "express";
import { join } from "path";
import logger from "morgan";
import { urlencoded, json } from "body-parser";
// import cors from "cors";
import compression from "compression";
// import helmet from "helmet";
import indexRouter from "./routes/index.js";

const app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
// app.use(helmet());
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
// app.use(cors({ credentials: true, origin: true }));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
