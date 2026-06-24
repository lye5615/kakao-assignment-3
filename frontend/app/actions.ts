"use server";

import type { Todo, TodoFilter } from "./types";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const errorBody = (await response.json()) as { detail?: string };
    return errorBody.detail ?? "요청을 처리하지 못했습니다.";
  } catch {
    return "요청을 처리하지 못했습니다.";
  }
}

export async function getTodos(
  filter: TodoFilter = "all",
  search = "",
): Promise<Todo[]> {
  const query = new URLSearchParams();

  if (filter !== "all") {
    query.set("filter", filter);
  }

  if (search) {
    query.set("search", search);
  }

  const queryString = query.toString();
  const requestUrl = `${BACKEND_URL}/todos${queryString ? `?${queryString}` : ""}`;
  const response = await fetch(requestUrl, {
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
