import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Displayuser from './components/Displayuser';


function App() {
 
  return (
    
    <>
    <BrowserRouter>
      <Routes>
    
      <Route path="/" element={<Displayuser />} />
        </Routes>
        </BrowserRouter>
        </>
  )
}

export default App