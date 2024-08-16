import React, { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    elements: []
  });
  const [mode, setMode] = useState('edit'); 

  return (
    <div className="App">

    </div>
  );
}

export default App
