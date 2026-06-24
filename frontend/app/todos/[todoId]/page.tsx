import Link from "next/link";
import { notFound } from "next/navigation";
import { getTodo } from "../../actions";
import TodoForm from "../_components/TodoForm";
import { normalizeReturnTo } from "../query";

type EditTodoPageProps = {
  params: Promise<{ todoId: string }>;
  searchParams: Promise<{ returnTo?: string }>;
};

export default async function EditTodoPage({
  params,
  searchParams,
}: EditTodoPageProps) {
  const { todoId } = await params;
  const { returnTo: returnToParam } = await searchParams;
  const returnTo = normalizeReturnTo(returnToParam);
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
        <Link href={returnTo}>Todo 목록</Link>
        <span>/</span>
        <span>Todo 수정</span>
      </nav>
      <header className="form-header">
        <p className="eyebrow">Edit</p>
        <h1>Todo 수정</h1>
        <p>할 일의 내용을 다듬어 저장하세요.</p>
      </header>
      <TodoForm returnTo={returnTo} todo={todo} submitLabel="저장" />
    </main>
  );
}
