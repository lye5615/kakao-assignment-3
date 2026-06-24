import os
import sys
from pathlib import Path

import pytest

os.environ["DATABASE_URL"] = "sqlite:////private/tmp/kakao_assignment3_pytest.db"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fastapi.testclient import TestClient

from main import SessionLocal, Todo, app

client = TestClient(app)


@pytest.fixture(autouse=True)
def clear_todos():
    database = SessionLocal()
    database.query(Todo).delete()
    database.commit()
    database.close()
    yield
    database = SessionLocal()
    database.query(Todo).delete()
    database.commit()
    database.close()


def create_todo(text: str) -> dict:
    response = client.post("/todos", json={"text": text})
    assert response.status_code == 201
    return response.json()


def test_todo_crud_flow():
    created_todo = create_todo("  과제 제출  ")
    todo_id = created_todo["id"]

    assert created_todo["text"] == "과제 제출"
    assert created_todo["is_completed"] is False
    assert client.get("/todos").json() == [created_todo]
    assert client.get(f"/todos/{todo_id}").json() == created_todo

    update_response = client.put(
        f"/todos/{todo_id}",
        json={"text": "과제 제출 완료", "is_completed": True},
    )

    assert update_response.status_code == 200
    assert update_response.json()["text"] == "과제 제출 완료"
    assert update_response.json()["is_completed"] is True
    assert client.delete(f"/todos/{todo_id}").status_code == 204
    assert client.get("/todos").json() == []


def test_validation_and_not_found_responses():
    assert client.post("/todos", json={"text": "   "}).status_code == 422
    assert client.post("/todos", json={"text": "a" * 501}).status_code == 422
    assert client.get("/todos/9999").status_code == 404
    assert client.put(
        "/todos/9999",
        json={"text": "없는 Todo", "is_completed": False},
    ).status_code == 404
    assert client.delete("/todos/9999").status_code == 404


def test_filter_and_search_can_be_combined():
    active_todo = create_todo("회의 준비")
    completed_todo = create_todo("회의 완료")
    create_todo("운동")
    client.put(
        f"/todos/{completed_todo['id']}",
        json={"text": completed_todo["text"], "is_completed": True},
    )

    search_result = client.get("/todos?search=회의").json()
    active_search_result = client.get(
        "/todos?filter=active&search=회의",
    ).json()
    completed_result = client.get("/todos?filter=completed").json()

    assert {todo["text"] for todo in search_result} == {"회의 준비", "회의 완료"}
    assert active_search_result == [active_todo]
    assert completed_result[0]["text"] == "회의 완료"
    assert client.get("/todos?search=없는검색어").json() == []
