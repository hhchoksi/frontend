import React, { useState } from 'react'
import './App.css'
import FormMaker from './components/FormMaker';
import FormPreview from './components/Preview';

function App() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    elements: []
  });

  const [mode, setMode] = useState('edit');

  const handleFormDataChange = (newFormdata) => {
    setFormData(newFormdata);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="App">
      <h1>Forms</h1>
      {mode === 'edit' && (
        <FormMaker
          formData={formData}
          onDataChange={handleFormDataChange}
          onModeChange={handleModeChange}
        />
      )}
      {mode === 'preview' && (
        <FormPreview 
          formData={formData} 
          onModeChange={handleModeChange}/>
      )}
    </div>
  );
}

export default App
