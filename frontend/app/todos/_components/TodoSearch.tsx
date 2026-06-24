"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { TodoFilter } from "../../types";
import { buildTodosUrl } from "../query";

type TodoSearchProps = {
  currentFilter: TodoFilter;
  initialSearch: string;
};

export default function TodoSearch({
  currentFilter,
  initialSearch,
}: TodoSearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const trimmedSearch = search.trim();

    if (trimmedSearch === initialSearch) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.replace(buildTodosUrl(currentFilter, trimmedSearch));
    }, 300);

    return () => window.clearTimeout(timer);
  }, [currentFilter, initialSearch, router, search]);

  return (
    <label className="search-field">
      <span>Todo 검색</span>
      <input
        type="search"
        value={search}
        maxLength={100}
        placeholder="키워드로 검색하세요"
        onChange={(event) => setSearch(event.target.value)}
      />
    </label>
  );
}
