import Link from "next/link";
import type { TodoFilter } from "../../types";
import { buildTodosUrl } from "../query";

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

export default function TodoFilterTabs({
  currentFilter,
}: {
  currentFilter: TodoFilter;
}) {
  return (
    <nav className="filter-tabs" aria-label="Todo 상태 필터">
      {FILTERS.map((filter) => (
        <Link
          key={filter.value}
          className={filter.value === currentFilter ? "active" : ""}
          href={buildTodosUrl(filter.value)}
          aria-current={filter.value === currentFilter ? "page" : undefined}
        >
          {filter.label}
        </Link>
      ))}
    </nav>
  );
}
