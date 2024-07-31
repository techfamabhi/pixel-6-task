import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Display from './components/Display';


function App() {
 
  return (
    
    <>
    <BrowserRouter>
      <Routes>
    
      <Route path="/" element={<Display />} />
        </Routes>
        </BrowserRouter>
        </>
  )
}

export default App