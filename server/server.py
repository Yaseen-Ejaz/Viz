from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini import getQnA
app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/test' , methods=['POST'])
def test():
    website = request.json.get('url')
    QuestionAnswer = getQnA(website)
    print (QuestionAnswer)
    return jsonify({'message': 'Hello, World!'}), 200


if __name__ == '__main__':
    app.run(debug=True)
