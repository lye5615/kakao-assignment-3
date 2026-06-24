import type { TodoFilter } from "../types";

export function normalizeFilter(value?: string): TodoFilter {
  if (value === "active" || value === "completed") {
    return value;
  }

  return "all";
}

export function normalizeSearch(value?: string): string {
  return value?.trim().slice(0, 100) ?? "";
}

export function buildTodosUrl(
  filter: TodoFilter,
  search = "",
): string {
  const query = new URLSearchParams();

  if (filter !== "all") {
    query.set("filter", filter);
  }

  if (search) {
    query.set("search", search);
  }

  const queryString = query.toString();
  return `/todos${queryString ? `?${queryString}` : ""}`;
}

export function normalizeReturnTo(value?: string): string {
  return value?.startsWith("/todos") ? value : "/todos";
}
