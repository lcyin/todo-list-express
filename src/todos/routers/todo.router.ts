import express from "express";
import { todoData } from "../todo.data";
import {
  addTodo,
  completeTodo,
  findOneTodo,
  findTodos,
} from "../services/todo.service";
export const todoRouter = express.Router();
export const todoRouterV2 = express.Router();

todoRouter.get("/todos", async (req, res) => {
  const result = await findTodos();
  res.json(result);
});

todoRouter.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  if (typeof title !== "string" || typeof description !== "string") {
    res.status(400);
    res.json({ error: "title and description must be a type of string" });
    return;
  }
  const result = await addTodo({ title, description });
  console.log("🚀 ~ todoRouter.post ~ result:", result);
  res.json(result);
});

todoRouter.patch("/todos/:id/completed", async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  if (typeof numberId !== "number") {
    res.status(400);
    res.json({ error: "id must be type of number" });
    return;
  }
  const task = await findOneTodo(id);
  if (!task) {
    res.status(400);
    res.json({ error: `task with id ${numberId} not found` });
    return;
  }
  const result = await completeTodo(id);
  res.json(result);
});
