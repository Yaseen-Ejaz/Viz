import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Questions from './pages/questions';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </div>
  );
}

export default App;
