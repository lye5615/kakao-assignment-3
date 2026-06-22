from fastapi import FastAPI

app = FastAPI(title="Todo API")


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Hello World"}
