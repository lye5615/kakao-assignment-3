"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Todo } from "./types";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const errorBody = (await response.json()) as { detail?: string };
    return errorBody.detail ?? "요청을 처리하지 못했습니다.";
  } catch {
    return "요청을 처리하지 못했습니다.";
  }
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BACKEND_URL}/todos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<Todo[]>;
}

export async function getTodo(todoId: number): Promise<Todo | null> {
  const response = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<Todo>;
}

export async function createTodo(formData: FormData): Promise<void> {
  const text = String(formData.get("text") ?? "").trim();
  const response = await fetch(`${BACKEND_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  revalidatePath("/todos");
  redirect("/todos");
}

export async function updateTodo(
  todoId: number,
  isCompleted: boolean,
  formData: FormData,
): Promise<void> {
  const text = String(formData.get("text") ?? "").trim();
  const response = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, is_completed: isCompleted }),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  revalidatePath("/todos");
  redirect("/todos");
}

export async function toggleTodo(todo: Todo): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/todos/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: todo.text,
      is_completed: !todo.is_completed,
    }),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  revalidatePath("/todos");
}

export async function deleteTodo(todoId: number): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  revalidatePath("/todos");
}
