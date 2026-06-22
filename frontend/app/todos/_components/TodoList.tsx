import Link from "next/link";
import { deleteTodo, toggleTodo } from "../../actions";
import type { Todo } from "../../types";

type TodoListProps = {
  todos: Todo[];
};

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <strong>등록된 Todo가 없습니다.</strong>
        <p>새로운 할 일을 추가해 오늘의 흐름을 만들어보세요.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        const toggleAction = toggleTodo.bind(null, todo);
        const deleteAction = deleteTodo.bind(null, todo.id);

        return (
          <li className="todo-item" key={todo.id}>
            <div className="todo-content">
              <span className={todo.is_completed ? "status completed" : "status"}>
                {todo.is_completed ? "완료" : "진행 중"}
              </span>
              <p className={todo.is_completed ? "todo-text completed" : "todo-text"}>
                {todo.text}
              </p>
            </div>
            <div className="todo-actions">
              <Link className="secondary-button compact" href={`/todos/${todo.id}`}>
                수정
              </Link>
              <form action={toggleAction}>
                <button
                  className={todo.is_completed ? "primary-button compact" : "secondary-button compact"}
                  type="submit"
                >
                  {todo.is_completed ? "완료 취소" : "완료"}
                </button>
              </form>
              <form action={deleteAction}>
                <button className="secondary-button compact" type="submit">
                  삭제
                </button>
              </form>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
