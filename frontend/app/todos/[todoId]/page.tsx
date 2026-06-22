import Link from "next/link";
import { notFound } from "next/navigation";
import { getTodo } from "../../actions";
import TodoForm from "../_components/TodoForm";

type EditTodoPageProps = {
  params: Promise<{ todoId: string }>;
};

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { todoId } = await params;
  const parsedTodoId = Number(todoId);

  if (!Number.isInteger(parsedTodoId) || parsedTodoId < 1) {
    notFound();
  }

  const todo = await getTodo(parsedTodoId);

  if (!todo) {
    notFound();
  }

  return (
    <main className="app-shell narrow">
      <nav className="breadcrumb" aria-label="현재 위치">
        <Link href="/todos">Todo 목록</Link>
        <span>/</span>
        <span>Todo 수정</span>
      </nav>
      <header className="form-header">
        <p className="eyebrow">Edit</p>
        <h1>Todo 수정</h1>
        <p>할 일의 내용을 다듬어 저장하세요.</p>
      </header>
      <TodoForm todo={todo} submitLabel="저장" />
    </main>
  );
}
