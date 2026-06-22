import Link from "next/link";
import { getTodos } from "../actions";
import TodoList from "./_components/TodoList";

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Productivity</p>
          <h1>Todo List</h1>
          <p className="page-description">해야 할 일을 간결하게 기록하고 완료하세요.</p>
        </div>
        <Link className="primary-button" href="/todos/new">
          Todo 추가
        </Link>
      </header>

      <section className="list-section" aria-labelledby="todo-list-title">
        <div className="section-header">
          <h2 id="todo-list-title">할 일</h2>
          <span>{todos.length}개</span>
        </div>
        <TodoList todos={todos} />
      </section>
    </main>
  );
}
