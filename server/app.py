from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini import getQnA
from classifier import classifier
from dynamodb import addQuestions
app = Flask(__name__)
CORS(app)  # Enable CORS
from botocore.exceptions import ClientError

@app.route('/main' , methods=['POST'])
def test():
    website = request.json.get('url')
    try:
        # Call the getQnA function and print the output for debugging
        QuestionAnswer = getQnA(website)
        print("Debug - QuestionAnswer returned:", QuestionAnswer)  # Use repr to see exact output

        # Ensure exact matching by using str() and stripping whitespace if necessary
        if str(QuestionAnswer).strip() == 'Not Found':
            return jsonify({'message': 'Error'}), 400
        
        addQuestions(website,QuestionAnswer)
        return jsonify({'message': QuestionAnswer}), 200

    except Exception as e:
        print("An error occurred:", str(e))
        return jsonify({'message': 'Server Error'}), 500

@app.route('/result' , methods=['POST'])
def result():

    try:
        # Retrieve the JSON data from the request
        data = request.get_json()

        # Extract the fields
        website = data.get('website')
        answers = data.get('answers')      # List of answers (question and selected option)

        print(f"Website: {website}")
        print(f"Answers: {answers}")

        answers_string = '\n'.join([f"{answer['question']}\n{answer['answer']}" for answer in answers])
        classificationAnswer = classifier(answers_string)
        print("Classification:", classificationAnswer)

        try:
            return jsonify({'message': classificationAnswer}), 200
        except:
            return jsonify({'message': 'Error'}), 400


    except Exception as e:
        print(f"Error processing data: {e}")
        return jsonify({
            "status": "error",
            "message": str(e),
        }), 400

if __name__ == '__main__':
    app.run(debug=True)
