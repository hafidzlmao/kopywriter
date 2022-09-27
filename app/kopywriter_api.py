from ast import keyword
from cgitb import handler
from cmd import PROMPT
from http.client import HTTPException
from mangum import Mangum
from fastapi import FastAPI
from kopywriter import generate_copywrite_sentence, generate_keywords
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)
INPUT_MAX_LENGTH = 32

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate_copywrite_sentence")
async def generate_copywrite_sentence_api(prompt: str):
    input_length_validation(prompt)
    sentence = generate_copywrite_sentence(prompt)
    return {"sentence": sentence, "keywords": []}

@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    input_length_validation(prompt)
    keywords = generate_keywords(prompt)
    return {"sentence": None, "keywords": keywords}

@app.get("/generate_copywrite_dan_keywords")
async def generate_copywrite_dan_keywords_api(prompt: str):
    input_length_validation(prompt)
    sentence = generate_copywrite_sentence(prompt)
    keywords = generate_keywords(prompt)
    return {"sentence": sentence, "keywords": keywords}

def input_length_validation(prompt: str):
    if len(prompt) >= INPUT_MAX_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input terlalu panjang. Harus dibawah {INPUT_MAX_LENGTH} karakter.",
        )