import express from "express";
import { todoRouter } from "./todos/routers/todo.router";
import "dotenv/config";
const app = express();
const port = process.env.PORT;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", todoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
