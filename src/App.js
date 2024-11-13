import './App.css';
import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import Logo from "./assets/images/vizLogo.png";

function App() {
  const [website, setWebsite] = useState("");
  const [buttonClick, setButtonClick] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e) => {
    setWebsite(e.target.value);
  };

  // Function to handle button click
  const handleButtonClick = () => {
    setButtonClick(true);
  };

  useEffect(() => {
    // Making the fetch call in an async function
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/test');
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Server error: ${text}`);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the async function to fetch data
  }, [buttonClick]);

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-purple-600'>
      
      <img src={Logo} className="w-20 h-20" alt="Logo" />

      <div className='flex items-center justify-center'>

        <div className="grid w-full max-w-sm items-center gap-1.5 mr-4">
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

    </div>
  );
}

export default App;
