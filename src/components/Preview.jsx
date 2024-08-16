// src/components/FormPreview.jsx
import React from 'react';

function FormPreview({ formData, onModeChange }) {
  const renderElement = (element) => {
    switch (element.type) {
      case 'shortAnswer':
        return <input type="text" placeholder="Short answer text" />;
      case 'paragraph':
        return <textarea placeholder="Long answer text"></textarea>;
      case 'multipleChoice':
        return (
          <div>
            {element.options.map((option, index) => (
              <label key={index}>
                <input type="radio" name={element.id} value={option} />
                {option}
              </label>
            ))}
          </div>
        );
      case 'checkboxes':
        return (
          <div>
            {element.options.map((option, index) => (
              <label key={index}>
                <input type="checkbox" name={element.id} value={option} />
                {option}
              </label>
            ))}
          </div>
        );
      case 'dropdown':
        return (
          <select>
            {element.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return <input type="date" />;
      case 'fileUpload':
        return <input type="file" />;
      default:
        return null;
    }
  };

  return (
    <div className="form-preview">
      <h2>{formData.title}</h2>
      <p>{formData.description}</p>
      {formData.elements.map((element) => (
        <div key={element.id} className="preview-element">
          <p>{element.question} {element.required && <span className="required">*</span>}</p>
          {renderElement(element)}
        </div>
      ))}
      <button onClick={() => onModeChange('edit')}>Back to Edit</button>
      <button onClick={() => onModeChange('submit')}>Submit Form</button>
    </div>
  );
}

export default FormPreview;