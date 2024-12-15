import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask_cors import CORS
from dynamodb import getQuestionAnswers

genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))

def getQnA(website):
    randomQuestionAnswer = getQuestionAnswers(website)
    website_names = [item['website'] for item in randomQuestionAnswer]
    questions_and_answers = [
    {
        'question': item['question'],
        'options': item['options']
    }
    for item in randomQuestionAnswer]

    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    )

    response = model.generate_content([
        """
        You are a friendly visitor classification predictor. The aim is to classify the visitor's intent.
        You will be given a website or link and you will get the information about the page.
        Then, you will create five questions with 4 multiple choice options, the fifth and last question should be about how often do you use the product?
        The questions should be based on classifying and helping to understand the user.
        The output should not have any extra text. Only the questions and options.
        The questions should not have .com, only the company name. The questions should be friendly and interactive.
        Do not add any extra spacing. Give the response only in string format. All questions should be unique
        Each question should be spaced by one line. The answers should be short. If the input is empty, or not a valid website, return Not Found.""",
        "input: apple.com",
        "output: Which product category are you interested in?\nA. Mac\nB. iPad\nC. iPhone\nD. Watch",
        "input:" + str(website_names[0]),
        "output:" + str(questions_and_answers[0]['question']) + "\n" + str(questions_and_answers[0]['options']),
        "input:" + str(website_names[1]),
        "output:" + str(questions_and_answers[1]['question']) + "\n" + str(questions_and_answers[1]['options']),
        "input:" + str(website_names[2]),
        "output:" + str(questions_and_answers[2]['question']) + "\n" + str(questions_and_answers[2]['options']),
        "input: " + str(website)
    ])
    
    print(response.text)
    return response.text.rstrip()