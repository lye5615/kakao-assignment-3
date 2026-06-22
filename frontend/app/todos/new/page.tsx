import Link from "next/link";
import TodoForm from "../_components/TodoForm";

export default function NewTodoPage() {
  return (
    <main className="app-shell narrow">
      <nav className="breadcrumb" aria-label="현재 위치">
        <Link href="/todos">Todo 목록</Link>
        <span>/</span>
        <span>새 Todo</span>
      </nav>
      <header className="form-header">
        <p className="eyebrow">Create</p>
        <h1>새 Todo</h1>
        <p>지금 해야 할 일을 한 문장으로 기록하세요.</p>
      </header>
      <TodoForm submitLabel="추가" />
    </main>
  );
}
