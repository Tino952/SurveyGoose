import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(
  port,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${port}`)
);

app.get("/", (req, res) => {
  res.send("API is running");
});
