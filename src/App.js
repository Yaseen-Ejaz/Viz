import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Questions from './pages/questions';
import Result from './pages/result';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
