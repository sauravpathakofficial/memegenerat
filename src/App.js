import './App.css';
import Meme from "./Meme";
import Result from './Result';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    
  
  return (
    <div className="App">
        <h1>Meme Generator </h1>
        <Routes>
            <Route exact path="/" element={<Meme  />} />
            <Route exact path="/generated" element={<Result />} />   
      </Routes>
    </div>
  );
}

export default App;
