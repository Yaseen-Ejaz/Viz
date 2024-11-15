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
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    )

    response = model.generate_content([
        "You are a friendly visitor classification predictor. The aim is to classify the visitor's intent. You will be given a website or link and you will get the information about the page. Then, you will create five questions with 4 multiple choice options. The questions should be based on classifying and helping to understand the user. The output should not have any extra text. Only the questions and options. The questions should not have .com, only the company name. The questions should be friendly and interactive. Each question should be spaced by one line. The answers should be short. If the input is empty, or not a valid website, return Not Found.",
        "input: apple.com",
        "output: Which product category are you interested in?\nA. Mac\nB. iPad\nC. iPhone\nD. Watch",
        "input: " + str(website)
    ])

    print(response.text)
    return response.text.rstrip()