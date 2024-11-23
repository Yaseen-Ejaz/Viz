import google.generativeai as genai
from dotenv import load_dotenv
import os

genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))

def classifier(answers):

    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash-8b",
        generation_config=generation_config,
    )

    response = model.generate_content([
    """You are a Visitor Classifier. Your task is to categorize users into three tiers—New Customer, 
    Occasional Customer, or Recurring Customer—based on their responses to given questions. 
    Additionally, assign a creative customer keyword by combining the user's interests with the company name or product. 
    Use descriptive buzz words like Tech Enthusiast, Foodie, Sporty, or similar, tailored to their responses.
    \n\nOutput Format: On the first line, provide the final customer keyword (e.g., Apple Tech Explorer).On the second line, 
    write a short description explaining the classification and customer keyword.\n\nRules: Use the question-and-answer 
    context to determine the customer tier. Combine interests and the company/product name creatively for the keyword. 
    Keep the output concise and avoid redundant details.\n\n\n
    Example Input:\nQuestion 1: What would you like to purchase? iPhone\nQuestion 2: How often do you use Apple products? 
    Often\nExample Output:\nApple Tech Guru\nA recurring customer who frequently uses Apple products and is deeply interested in tech.""",
    "input: What would you like to purchase? Mac\nHow often do you use Apple products? Rarely",
    "output: New Apple Aficionado",
    "input: What would you like to purchase? Mavic Drone\nHow often do you use DJI products? Often",
    "output: Recurring DJI Sky High",
    "input: What would you like to order? Chicken Nuggets\nHow often do you order KFC food? Occasionally",
    "output: Occasional KFC Foodie",
    "input: What would you like to order? Shoes\nHow often do you use Nike products? Always",
    "output: Sporty Nike Fan",
    "input: "+ str(answers),
    ])

    print(response.text)
    return response.text.rstrip()