import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // For navigation to another page
import { Label } from "../components/Label";
import { RadioGroup } from "../components/RadioGroup";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setData } from '../store'; // Import the action

function Questions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false); //transitions
  const data = useSelector((state) => state.data);  //redux data
  const queryParameters = new URLSearchParams(window.location.search);
  const website = queryParameters.get("website");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const parseData = (dataString) => {
    const questionsArr = dataString.split("\n\n").map((questionBlock) => {
      const [question, ...options] = questionBlock.split("\n");
      return { question, options };
    });
    return questionsArr;
  };

  const questions = parseData(data);

  const handleOptionClick = async (option) => {
    const updatedAnswers = [...answers, { 
      question: questions[currentQuestionIndex].question, 
      answer: option 
    }];
    setAnswers(updatedAnswers);

    setIsTransitioning(true);

    setTimeout(async () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // If all questions are answered, send data to Flask backend
        try {
          const response = await fetch('http://localhost:5000/result', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              website, // Website URL from query parameters
              answers: updatedAnswers, // Final answers array
            }),
          });

          if (response.ok) {
            const resultData = await response.json();
            console.log('Response from Flask:', resultData.message);
            dispatch(setData(resultData.message));

            navigate('/result?website=' + website, { replace: true });
          } else {
            console.error('Failed to send data to Flask:', response.status);
          }
        } catch (error) {
          console.error('Error sending data to Flask:', error);
        }
      }
      setIsTransitioning(false);
    }, 500); 
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-purple-700">
      
      <div className={`transition-opacity duration-500 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-5 text-center">
          <Label className="text-white text-lg">{currentQuestionIndex + 1}. {questions[currentQuestionIndex]?.question}</Label>
        </div>
        
        <div className="flex flex-col items-center justify-center w-full space-y-4 mt-8">
          <RadioGroup className="flex flex-col items-center justify-center space-y-4">
            {questions[currentQuestionIndex]?.options.map((option, index) => {
              const optionText = option.substring(2).trim();  // This will remove the letter and the period

              return (
                <div
                  key={index}
                  onClick={() => handleOptionClick(optionText)}
                  className={`flex items-center justify-center w-60 h-16 p-4 rounded-md drop-shadow-md cursor-pointer transition-all duration-300 ease-in-out transform 
                    bg-white text-black hover:scale-105 
                    ${isTransitioning ? 'scale-108' : 'scale-100'}`}
                >
                  <Label className="text-center">{optionText}</Label>
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
