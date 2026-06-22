"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import type { Todo } from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

type TodoFormProps = {
  todo?: Todo;
  submitLabel: string;
};

function getRequestErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }
  }

  return "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.";
}

export default function TodoForm({ todo, submitLabel }: TodoFormProps) {
  const router = useRouter();
  const [text, setText] = useState(todo?.text ?? "");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      setMessage("Todo 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      if (todo) {
        await axios.put(`${API_URL}/todos/${todo.id}`, {
          text: trimmedText,
          is_completed: todo.is_completed,
        });
      } else {
        await axios.post(`${API_URL}/todos`, { text: trimmedText });
      }

      router.push("/todos");
      router.refresh();
    } catch (error) {
      setMessage(getRequestErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-text">Todo 내용</label>
      <textarea
        id="todo-text"
        name="text"
        value={text}
        maxLength={500}
        placeholder="할 일을 입력하세요"
        required
        autoFocus
        onChange={(event) => setText(event.target.value)}
      />
      {message && <p className="form-message">{message}</p>}
      <div className="form-actions">
        <button
          className="primary-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "처리 중..." : submitLabel}
        </button>
        <Link className="secondary-button" href="/todos">
          취소
        </Link>
      </div>
    </form>
  );
}
