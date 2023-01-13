from copy import copy
from operator import le
import os
from typing import List
from xml.sax.xmlreader import InputSource
import openai
import argparse
import re

INPUT_MAX_LENGTH = 32

def main():

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", '-i', type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User Input: {user_input} ")
    if validasi_input(user_input):
        generate_copywrite_sentence(user_input)
        generate_keywords(user_input)
    else:
        raise ValueError(f"Input terlalu panjang. Harus dibawah {INPUT_MAX_LENGTH}, Karakter yang disubmit sebanyak {user_input}")

def validasi_input(prompt: str) -> bool: 
    return len(prompt) <= INPUT_MAX_LENGTH

def generate_copywrite_sentence(prompt: str) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")
    nice_prompt = f"Formulate copywriting that can be used for both online and offline promotion of {prompt}: "
    print(nice_prompt)
    response = openai.Completion.create(model="text-davinci-003", prompt=nice_prompt, temperature=0.75, max_tokens=32)

    #Ekstrak teks yang dioutputkan
    teks_copywrite:str = response["choices"][0]["text"]

    #Hilangkan whitespace
    teks_copywrite = teks_copywrite.strip()

    #Tambah ... jika kalimat tidak selesai
    end_char = teks_copywrite[-1]
    if end_char not in (".","!","?"):
        teks_copywrite += "..."

    print(f"Kalimat Copywrite: {teks_copywrite}")
    return teks_copywrite

def generate_keywords(prompt: str) -> List[str]:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")
    nice_prompt = f"generate similar and related branding keywords for {prompt}: "
    print(nice_prompt)

    response = openai.Completion.create(model="text-davinci-003", prompt=nice_prompt, temperature=0.75, max_tokens=32)

    #Ekstrak teks yang dioutputkan
    teks_keywords:str = response["choices"][0]["text"]

    #Hilangkan whitespace
    teks_keywords = teks_keywords.strip()
    keywords_arr = re.split(",|\n|;|-", teks_keywords)
    keywords_arr = [k.strip().lower() for k in keywords_arr]
    keywords_arr = [k.strip() for k in keywords_arr if len(k) > 0 ] 
    print(f"Keywords: {keywords_arr}")
    return keywords_arr

if __name__=="__main__":
    main()