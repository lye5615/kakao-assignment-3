import Link from "next/link";

type TodoFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultText?: string;
  submitLabel: string;
};

export default function TodoForm({
  action,
  defaultText = "",
  submitLabel,
}: TodoFormProps) {
  return (
    <form action={action} className="todo-form">
      <label htmlFor="todo-text">Todo 내용</label>
      <textarea
        id="todo-text"
        name="text"
        defaultValue={defaultText}
        maxLength={500}
        placeholder="할 일을 입력하세요"
        required
        autoFocus
      />
      <div className="form-actions">
        <button className="primary-button" type="submit">
          {submitLabel}
        </button>
        <Link className="secondary-button" href="/todos">
          취소
        </Link>
      </div>
    </form>
  );
}
