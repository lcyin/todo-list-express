import express from "express";
import { todoData } from "../todo.data";
import { TodoModel } from "../models/todo.model";
export const todoRouter = express.Router();
export const todoRouterV2 = express.Router();

todoRouter.get("/todos", (req, res) => {
  res.json(todoData);
});

todoRouter.post("/todos", (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;
  if (typeof title !== "string" || typeof description !== "string") {
    res.status(400);
    res.json({ error: "title and description must be a type of string" });
    return;
  }
  todoData.push({
    id: todoData.length + 1,
    title,
    description,
    completed: false,
  });
  res.json(todoData);
});

todoRouter.patch("/todos/:id/completed", (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  if (typeof numberId !== "number") {
    res.status(400);
    res.json({ error: "id must be type of number" });
    return;
  }
  let task = todoData.find((task) => task.id === numberId);
  if (!task) {
    res.status(400);
    res.json({ error: `task with id ${numberId} not found` });
    return;
  }
  task.completed = true;
  res.json(todoData);
});
