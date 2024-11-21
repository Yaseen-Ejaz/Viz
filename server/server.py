from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini import getQnA
app = Flask(__name__)
CORS(app)  # Enable CORS
import os
import boto3
from botocore.exceptions import ClientError

@app.route('/main' , methods=['POST'])
def test():
    dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
    region_name='ca-central-1'
    )

    table = dynamodb.Table('Questions')

    try:
        response = table.put_item(
            Item={
                'id': 3,  # Partition key
                'sortId': 4,  # Sort key
            }
        )
        print("PutItem succeeded:", response)
    except ClientError as e:
        print("Error occurred:", e.response['Error']['Message'])
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
