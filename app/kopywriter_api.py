from ast import keyword
from cmd import PROMPT
from http.client import HTTPException
import imp
from fastapi import FastAPI
from kopywriter import generate_copywrite_sentence, generate_keywords

app = FastAPI()
INPUT_MAX_LENGTH = 32

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
    return {"sentece": sentence, "keywords": keywords}

def input_length_validation(prompt: str):
    if len(prompt) >= INPUT_MAX_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input terlalu panjang. Harus dibawah {INPUT_MAX_LENGTH} karakter.",
        )