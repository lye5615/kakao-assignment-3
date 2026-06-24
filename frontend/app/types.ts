export type Todo = {
  id: number;
  text: string;
  is_completed: boolean;
};

export type TodoFilter = "all" | "active" | "completed";
