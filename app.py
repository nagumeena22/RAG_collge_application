from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag import ask

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ request body model
class Question(BaseModel):
    question: str


@app.get("/")
def home():
    return {"msg": "PDF RAG API running"}


# ✅ POST API
@app.post("/ask")
def ask_api(q: Question):

    answer = ask(q.question)

    return {
        "question": q.question,
        "answer": answer
    }