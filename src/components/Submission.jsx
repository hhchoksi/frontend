// src/components/FormSubmission.jsx
import React, { useState } from 'react';

function FormSubmission({ formData, onModeChange }) {
    const [submissionData, setSubmissionData] = useState({});

    const handleInputChange = (elementId, value) => {
        setSubmissionData({ ...submissionData, [elementId]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', submissionData);
        localStorage.setItem('formSubmission', JSON.stringify(submissionData));
        alert('Form submitted successfully!');
        onModeChange('edit');
    };

    const renderElement = (element) => {
        switch (element.type) {
            case 'shortAnswer':
                return (
                    <input
                        type="text"
                        value={submissionData[element.id] || ''}
                        onChange={(e) => handleInputChange(element.id, e.target.value)}
                        required={element.required}
                    />
                );
            case 'paragraph':
                return (
                    <textarea
                        value={submissionData[element.id] || ''}
                        onChange={(e) => handleInputChange(element.id, e.target.value)}
                        required={element.required}
                    ></textarea>
                );
            case 'multipleChoice':
                return (
                    <div>
                        {element.options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name={element.id}
                                    value={option}
                                    checked={submissionData[element.id] === option}
                                    onChange={(e) => handleInputChange(element.id, e.target.value)}
                                    required={element.required}
                                />
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
                                <input
                                    type="checkbox"
                                    name={element.id}
                                    value={option}
                                    checked={(submissionData[element.id] || []).includes(option)}
                                    onChange={(e) => {
                                        const currentValues = submissionData[element.id] || [];
                                        const newValues = e.target.checked
                                            ? [...currentValues, option]
                                            : currentValues.filter(value => value !== option);
                                        handleInputChange(element.id, newValues);
                                    }}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'dropdown':
                return (
                    <select
                        value={submissionData[element.id] || ''}
                        onChange={(e) => handleInputChange(element.id, e.target.value)}
                        required={element.required}
                    >
                        <option value="">Select an option</option>
                        {element.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-submission">
            <h2>{formData.title}</h2>
            <p>{formData.description}</p>
            {formData.elements.map((element) => (
                <div key={element.id} className="submission-element">
                    <p>{element.question} {element.required && <span className="required">*</span>}</p>
                    {renderElement(element)}
                </div>
            ))}
            <button type="submit">Submit</button>
            <button type="button" onClick={() => onModeChange('preview')}>Back to Preview</button>
        </form>
    );
}

export default FormSubmission;