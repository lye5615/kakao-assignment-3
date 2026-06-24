import Link from "next/link";
import { getTodos } from "../actions";
import TodoFilterTabs from "./_components/TodoFilterTabs";
import TodoList from "./_components/TodoList";
import { buildTodosUrl, normalizeFilter } from "./query";

type TodoPageProps = {
  searchParams: Promise<{ filter?: string }>;
};

export default async function TodoPage({ searchParams }: TodoPageProps) {
  const { filter: filterParam } = await searchParams;
  const currentFilter = normalizeFilter(filterParam);
  const todos = await getTodos(currentFilter);
  const returnTo = buildTodosUrl(currentFilter);
  const newTodoHref = `/todos/new?returnTo=${encodeURIComponent(returnTo)}`;

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Productivity</p>
          <h1>Todo List</h1>
          <p className="page-description">해야 할 일을 간결하게 기록하고 완료하세요.</p>
        </div>
        <Link className="primary-button" href={newTodoHref}>
          Todo 추가
        </Link>
      </header>

      <section className="list-section" aria-labelledby="todo-list-title">
        <TodoFilterTabs currentFilter={currentFilter} />
        <div className="section-header">
          <h2 id="todo-list-title">할 일</h2>
          <span>{todos.length}개</span>
        </div>
        <TodoList todos={todos} returnTo={returnTo} />
      </section>
    </main>
  );
}
