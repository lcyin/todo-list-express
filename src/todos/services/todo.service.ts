import { TodoModel } from "../models/todo.model";
import { getClient } from "../../db";
import { CreateTodoInterface } from "../interfaces/create-todo.interface";

export async function findTodos() {
  try {
    const client = await getClient();

    return (
      await client.query<TodoModel>(
        "SELECT id, title, description, completed, created_at FROM todos;"
      )
    ).rows.map((r) => r);
  } catch (error) {
    console.error(error);
  }
}

export async function findOneTodo(id: string) {
  try {
    const client = await getClient();

    return (
      await client.query<TodoModel>(
        "SELECT id, title, description, completed, created_at FROM todos WHERE id = $1;",
        [id]
      )
    ).rows.map((r) => r);
  } catch (error) {
    console.error(error);
  }
}

export async function addTodo({ title, description }: CreateTodoInterface) {
  try {
    const client = await getClient();
    return (
      await client.query<{ id: string }>(
        "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING id;",
        [title, description]
      )
    ).rows.map((r) => r);
  } catch (error) {
    console.error(error);
  }
}

export async function completeTodo(id: string) {
  try {
    const client = await getClient();
    return (
      await client.query<{ id: string }>(
        "UPDATE todos SET completed = true WHERE id = $1 RETURNING id;",
        [id]
      )
    ).rows.map((r) => r);
  } catch (error) {
    console.error(error);
  }
}
