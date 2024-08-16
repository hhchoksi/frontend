import React from 'react';

function Elements({ element, onUpdate, onDelete }) {
    const handleQuestionChange = (event) => {
        const updatedElement = { ...element, question: event.target.value };
        onUpdate(updatedElement);
    }

    const handleRequiredChange = (event) => {
        const updatedElement = { ...element, required: event.target.checked };
        onUpdate(updatedElement);
    }

    const handleOptionChange = (index, value) => {
        const updatedElement = {...element };
        updatedElement.options[index] = value;
        onUpdate(updatedElement);
    }

    const removeOption = (index) => {
        const updatedElement = {...element };
        updatedElement.options.splice(index, 1);
        onUpdate(updatedElement);
    }

    const addOption = () => {
        const updatedElement = {...element };
        updatedElement.options.push('');
        onUpdate(updatedElement);
    }

    return (
        <div className='main'>
            <input
                type="text"
                value={element.question}
                onChange={handleQuestionChange}
                placeholder="Question"
            />
            <label>
                <input
                    type="checkbox"
                    checked={element.required}
                    onChange={handleRequiredChange}
                />
                Required
            </label>
            {(element.type === 'multipleChoice' || element.type === 'checkboxes' || element.type === 'dropdown') && (
                <div className="option">
                    {element.options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <button onClick={() => removeOption(index)}>Remove</button>
                        </div>
                    ))}
                    <button onClick={addOption}>Add Option</button>
                </div>
            )}
            <button onClick={onDelete}>Delete Question</button>
        </div >
    );
}

export default Elements;