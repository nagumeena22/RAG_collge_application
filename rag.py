from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from transformers import pipeline


# ---------------- LOAD PDF ----------------

loader = PyPDFLoader("data/KEC_COLLEGE.pdf")
docs = loader.load()


# ---------------- SPLIT ----------------

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = splitter.split_documents(docs)


# ---------------- EMBEDDINGS ----------------

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# ---------------- VECTOR DB ----------------

db = FAISS.from_documents(
    chunks,
    embeddings
)


# ---------------- RETRIEVER ----------------

retriever = db.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 2}
)


# ---------------- MODEL ----------------

pipe = pipeline(
    "text-generation",
    model="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    max_new_tokens=40,
    do_sample=False
)


# ---------------- ASK FUNCTION ----------------

def ask(q):

    docs = retriever.invoke(q)

    context = " ".join([d.page_content for d in docs])

    prompt = f"""
Answer shortly.

Context:
{context}

Question: {q}
Answer:
"""

    result = pipe(
        prompt,
        max_new_tokens=40
    )[0]["generated_text"]

    answer = result.split("Answer:")[-1].strip()

    return answer