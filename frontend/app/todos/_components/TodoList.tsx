import type { Todo } from "../../types";
import TodoActions from "./TodoActions";

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
            <TodoActions todo={todo} />
          </li>
        );
      })}
    </ul>
  );
}
