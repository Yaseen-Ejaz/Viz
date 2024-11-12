import './App.css';
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import Logo from "./images/vizLogo.png";

function App() {
  return (
    <div className='flex items-center justify-center h-screen w-screen bg-purple-600'>
      
      <img src={Logo} className="w-20 h-20"/>
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input placeholder="Enter website" />
      </div>

      <Button variant="outline"><b>Start</b></Button>
      
    </div>
  );
}

export default App;
