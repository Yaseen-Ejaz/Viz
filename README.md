# Viz - Visitor Classification

Viz is an interactive visitor classification tool designed to group users based on their answers to a short survey. By leveraging advanced technologies like Google Gemini and AWS, Viz efficiently generates dynamic questions and stores user responses, providing insightful classification results.

## Features
- **Dynamic Survey Generation:** Automatically creates a survey with five questions and four options each, tailored to user input.
- **Visitor Classification:** Groups users based on survey responses, enabling actionable insights.
- **Scalable Storage:** Utilizes DynamoDB for efficient NoSQL data storage.
- **Modern Frontend:** Built with React.js and styled using Tailwind CSS for a responsive, clean design.
- **State Management:** Integrated Redux for efficient and predictable state management.
- **Backend Services:** Powered by Flask for a robust backend API.
- **Cloud Integration:** Deployed and scaled using AWS services.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Redux
- **Backend:** Flask (Python)
- **Database:** DynamoDB
- **Cloud Services:** AWS
- **AI Integration:** Google Gemini

## Installation

Follow these steps to run the project locally:

### Prerequisites

Ensure you have the following installed:
Node.js (v14 or above)
npm (Node Package Manager)
Python (v3.8 or above)
AWS CLI (configured for your account)


### Clone the Repository
```
git clone https://github.com/your-username/viz-visitor-classification.git
cd viz
```

## Install Frontend Dependencies
```
npm install
```
## Install Backend Dependencies
```
cd server
pip install -r requirements.txt
```

## Configure Environment Variables
Create a .env file in the backend directory with the following keys:
```
AWS_ACCESS_KEY_ID=your_aws_access_key  
AWS_SECRET_ACCESS_KEY=your_aws_secret_key  
AWS_REGION=your_aws_region  
DYNAMODB_TABLE=your_table_name  
GEMINI_API_KEY=your_google_gemini_key
```

## Run the Application
Start the Backend Server
```
cd backend
flask run
```

Start the Frontend Server
```
npm start
```

Access the Application
http://localhost:3000
