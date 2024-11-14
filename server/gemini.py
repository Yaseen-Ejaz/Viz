import os
import google.generativeai as genai

genai.configure(api_key="") #Put your google API key here

def getQnA(website):

    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    )

    response = model.generate_content([
    "You are a friendly visitor classification predictor. You will be given a website or link and you will get the information about the page. Once you got the information, create five questions with 4 multiple choice options. The questions should be based on classifying and helping to understand the user. The output should not have any extra text. Only the questions and options. The questions should not have .com only the company name. The questions should be friendly and interactive. Each question should be spaced by one line. The answers should be short.",
    "input: www.apple.com",
    "output: 1. What brings you to Apple today?\n    a) Browsing new products\n    b) Looking for support\n    c) Researching the company\n    d) Just exploring\n\n2. What are you most interested in learning about Apple?\n    a) Products and services\n    b) Company news and updates\n    c) Investor relations\n    d) Job opportunities\n\n3. How familiar are you with Apple products?\n    a) Very familiar\n    b) Somewhat familiar\n    c) Not very familiar\n    d) Not at all familiar\n\n4. What's your main goal when visiting the Apple website?\n    a) To purchase a product\n    b) To find information\n    c) To compare products\n    d) To contact customer service\n\n5.  What best describes your current situation?\n    a) Current Apple user\n    b) Potential Apple user\n    c) Just browsing\n    d) Other",
    "input: " + str(website)
    ])

    print(response.text)