import '../App.css';
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Progress } from "../components/Progress";
import Logo from "../assets/images/vizLogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setData } from '../store'; // Import the action

function Main() {
  const [website, setWebsite] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setWebsite(e.target.value);
    
    // Regular expression to match valid domain endings
    const regex = /\.(com|co|co.uk|org|edu|net|app|gov)$/i;
    
    // Check if the website ends with one of the valid extensions
    setIsValid(regex.test(e.target.value));
    
    setErrorMessage("");
  };
  
  const handleButtonClick = () => {
    // Regular expression to check for multiple valid domain endings
    const regex = /\.(com|co|co.uk|org|edu|net|app|gov)$/i;
    
    if (website && regex.test(website)) {
      setButtonClick(true);
      setLoading(true);
      setProgressValue(20);
    } else {
      setIsValid(false);
      setErrorMessage("Please enter a valid website with a supported extension.");
    }
  };
  
  useEffect(() => {
    if (buttonClick && isValid) {
      const fetchData = async () => {
        try {
          setProgressValue(20);
  
          const response = await fetch('http://localhost:5000/main', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "url": website
            })
          });
          setProgressValue(50);

  
          // If response is an error (status 400)
          if (!response.ok || response.status === 400) {
            const errorData = await response.json();
            setErrorMessage(errorData.message); // Display the error message returned from the server
            setLoading(false);
            setProgressValue(0);
            return; // Exit the function on error
          }
  
          const data = await response.json();
          console.log(data.message);
  
          setProgressValue(100);
          dispatch(setData(data.message)); // Store data in Redux

          setTimeout(() => {
            setLoading(false);
            navigate("/questions?website=" + website, { replace: true });  // Navigate to the Questions page
          }, 500);
  
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
          setProgressValue(0);
        }
      };
      fetchData();
    }
  }, [buttonClick, isValid, website, navigate]);
  

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-purple-700'>
      <img src={Logo} className="w-20 h-20" alt="Logo" />
      {!loading ? (
        <div className='flex items-center justify-center opacity-100 transition-opacity duration-500'>
          <div className="grid w-full max-w-sm items-center gap-2 mr-4">
            <Input
              value={website}
              onChange={handleInputChange}
              placeholder="Enter website"
            />
          </div>
          <Button variant="outline" onClick={handleButtonClick}>
            <b>Start</b>
          </Button>
        </div>
      ) : (
        <Progress value={progressValue} className="w-full max-w-sm mt-4" />
      )}
      {errorMessage && (<div className="text-red-600 text-sm">{errorMessage}</div>)}
    </div>
  );
}

export default Main;
