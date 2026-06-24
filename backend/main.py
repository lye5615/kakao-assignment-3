import os
from collections.abc import Generator
from typing import Literal

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Query, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, field_validator
from sqlalchemy import Boolean, String, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

load_dotenv(".env.local")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todos.db")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    text: Mapped[str] = mapped_column(String(500))
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)


class TodoTextSchema(BaseModel):
    text: str

    @field_validator("text")
    @classmethod
    def validate_text(cls, value: str) -> str:
        trimmed_text = value.strip()

        if not trimmed_text:
            raise ValueError("Todo 내용을 입력해주세요.")

        if len(trimmed_text) > 500:
            raise ValueError("Todo 내용은 500자 이하로 입력해주세요.")

        return trimmed_text


class TodoCreate(TodoTextSchema):
    pass


class TodoUpdate(TodoTextSchema):
    is_completed: bool


class TodoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    text: str
    is_completed: bool


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db() -> Generator[Session, None, None]:
    database = SessionLocal()

    try:
        yield database
    finally:
        database.close()


def get_todo_or_404(todo_id: int, database: Session) -> Todo:
    todo = database.get(Todo, todo_id)

    if todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo를 찾을 수 없습니다.")

    return todo


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Hello World"}


@app.get("/todos", response_model=list[TodoResponse])
def get_todos(
    status_filter: Literal["all", "active", "completed"] = Query(
        "all",
        alias="filter",
    ),
    database: Session = Depends(get_db),
) -> list[Todo]:
    statement = select(Todo).order_by(Todo.id.desc())

    if status_filter == "active":
        statement = statement.where(Todo.is_completed.is_(False))
    elif status_filter == "completed":
        statement = statement.where(Todo.is_completed.is_(True))

    return list(database.scalars(statement).all())


@app.get("/todos/{todo_id}", response_model=TodoResponse)
def get_todo(todo_id: int, database: Session = Depends(get_db)) -> Todo:
    return get_todo_or_404(todo_id, database)


@app.post("/todos", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
def create_todo(todo_data: TodoCreate, database: Session = Depends(get_db)) -> Todo:
    todo = Todo(text=todo_data.text, is_completed=False)
    database.add(todo)
    database.commit()
    database.refresh(todo)
    return todo


@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(
    todo_id: int,
    todo_data: TodoUpdate,
    database: Session = Depends(get_db),
) -> Todo:
    todo = get_todo_or_404(todo_id, database)
    todo.text = todo_data.text
    todo.is_completed = todo_data.is_completed
    database.commit()
    database.refresh(todo)
    return todo


@app.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int, database: Session = Depends(get_db)) -> Response:
    todo = get_todo_or_404(todo_id, database)
    database.delete(todo)
    database.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
