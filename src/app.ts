import dotenv from "dotenv";
import express from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import { DB, PORT } from "./config";
import { errorHandler } from "./middleware/errorHanlder";
import documentRoute from "./routes/documentRoutes";

// Organize import

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1/", documentRoute);

app.use(() => {
  throw createHttpError(404, "Route not found");
});

app.use(errorHandler);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Listening On PORT ${PORT}`);
    });
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database");
  });
