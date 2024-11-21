import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // For navigation to another page
import { Label } from "../components/Label";
import { RadioGroup } from "../components/RadioGroup";
import { useSelector } from 'react-redux';

function Questions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false); // For managing transition state
  const data = useSelector((state) => state.data); // Fetching data from Redux store
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search)
  const website = queryParameters.get("website")

  // Step 1: Parse the data string into questions and options
  const parseData = (dataString) => {
    const questionsArr = dataString.split("\n\n").map((questionBlock) => {
      const [question, ...options] = questionBlock.split("\n");
      return { question, options };
    });
    return questionsArr;
  };

  // Parsing the data string into questions and options
  const questions = parseData(data);

  // Step 2: Handle option click and transition to next question
  const handleOptionClick = (option) => {
    // Save the answer
    setAnswers([...answers, { question: questions[currentQuestionIndex].question, answer: option }]);

    // Trigger the transition animation
    setIsTransitioning(true);

    // After animation ends, move to the next question or navigate if all questions are answered
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // If all questions are answered, navigate to the next page
        window.location.href = "https://www."+website;
      }
      setIsTransitioning(false); // Reset the transition state
    }, 500); // Match this with the duration of the fade-out effect (in ms)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-purple-700">
      {/* Fade-out transition when transitioning to the next question */}
      <div className={`transition-opacity duration-500 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Display current question in a label, without any box-like styles */}
        <div className="mb-5 text-center">
          <Label className="text-white text-lg">{questions[currentQuestionIndex]?.question}</Label>
        </div>

        <div className="flex flex-col items-center justify-center w-full space-y-4 mt-8">
          {/* Options centered vertically and horizontally */}
          <RadioGroup className="flex flex-col items-center justify-center space-y-4">
            {questions[currentQuestionIndex]?.options.map((option, index) => {
              // Removing the first two characters (A, B, C, D) and the period
              const optionText = option.substring(2).trim();  // This will remove the letter and the period

              return (
                <div
                  key={index}
                  onClick={() => handleOptionClick(optionText)} // Use the modified optionText
                  className={`flex items-center justify-center w-60 h-16 p-4 rounded-md drop-shadow-md cursor-pointer transition-all duration-300 ease-in-out transform 
                    bg-white text-black hover:scale-105 
                    ${isTransitioning ? 'scale-108' : 'scale-100'}`}
                >
                  <Label className="text-center">{optionText}</Label> {/* Display the option without the first 2 characters */}
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

export default Questions;
