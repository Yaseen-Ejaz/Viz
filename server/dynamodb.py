import boto3
import uuid
import os
from botocore.exceptions import ClientError
import random
def addQuestions(website, QuestionAnswer):
    # Initialize the DynamoDB table resource
    table = boto3.resource(
        'dynamodb',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        region_name=os.environ.get('AWS_REGION')  # corrected the env variable name
    ).Table(os.environ.get('DYNAMODB_TABLE'))

    try:
        questions = QuestionAnswer.strip().split('\n\n')  # Split questions by double newline
        for q in questions:
            lines = q.split('\n')  # Split each question block by lines
            question_text = lines[0]  # First line is the question
            options = {f'option{i+1}': lines[i+1][3:] for i in range(len(lines) - 1)}  # Extract options
            
            table.put_item(
                Item={
                    'id': str(uuid.uuid4()),
                    'website': website,
                    'question': question_text,
                    'options': options
                }
            )
        print("All questions added successfully!")
    except ClientError as e:
        print("Error occurred:", e.response['Error']['Message'])
    except Exception as e:
        print("An unexpected error occurred:", str(e))


def getQuestionAnswers(website):
    table = boto3.resource(
        'dynamodb',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        region_name=os.environ.get('AWS_REGION')
    ).Table(os.environ.get('DYNAMODB_TABLE'))

    try:
        response = table.scan()
        items = response.get('Items', [])
        
        if website:
            filtered_items = [item for item in items if item['website'] == website]
        else:
            filtered_items = items

        if not filtered_items:
            filtered_items = items

        selected_objects = random.sample(filtered_items, min(3, len(filtered_items)))
        
        return selected_objects
    except ClientError as e:
        print("Error occurred:", e.response['Error']['Message'])
        return []
    except Exception as e:
        print("An unexpected error occurred:", str(e))
        return []
    