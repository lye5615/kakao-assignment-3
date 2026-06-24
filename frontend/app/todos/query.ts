import type { TodoFilter } from "../types";

export function normalizeFilter(value?: string): TodoFilter {
  if (value === "active" || value === "completed") {
    return value;
  }

  return "all";
}

export function buildTodosUrl(filter: TodoFilter): string {
  return filter === "all" ? "/todos" : `/todos?filter=${filter}`;
}

export function normalizeReturnTo(value?: string): string {
  return value?.startsWith("/todos") ? value : "/todos";
}
