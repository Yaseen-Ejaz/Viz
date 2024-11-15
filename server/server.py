from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini import getQnA
app = Flask(__name__)
CORS(app)  # Enable CORS

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

        return jsonify({'message': QuestionAnswer}), 200

    except Exception as e:
        print("An error occurred:", str(e))
        return jsonify({'message': 'Server Error'}), 500


if __name__ == '__main__':
    app.run(debug=True)
