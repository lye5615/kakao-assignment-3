"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Todo } from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export default function TodoActions({
  todo,
  returnTo,
}: {
  todo: Todo;
  returnTo: string;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  const requestWithRefresh = async (request: () => Promise<unknown>) => {
    setIsPending(true);
    setMessage("");

    try {
      await request();
      router.refresh();
    } catch {
      setMessage("요청에 실패했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  const handleToggle = () =>
    requestWithRefresh(() =>
      axios.put(`${API_URL}/todos/${todo.id}`, {
        text: todo.text,
        is_completed: !todo.is_completed,
      }),
    );

  const handleDelete = () => {
    if (!window.confirm("이 Todo를 삭제할까요?")) {
      return;
    }

    void requestWithRefresh(() =>
      axios.delete(`${API_URL}/todos/${todo.id}`),
    );
  };

  return (
    <div>
      <div className="todo-actions">
        <Link
          className="secondary-button compact"
          href={`/todos/${todo.id}?returnTo=${encodeURIComponent(returnTo)}`}
        >
          수정
        </Link>
        <button
          className={
            todo.is_completed
              ? "primary-button compact"
              : "secondary-button compact"
          }
          type="button"
          disabled={isPending}
          onClick={handleToggle}
        >
          {todo.is_completed ? "완료 취소" : "완료"}
        </button>
        <button
          className="secondary-button compact"
          type="button"
          disabled={isPending}
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
      {message && <p className="action-message">{message}</p>}
    </div>
  );
}
