import React, { useState } from 'react';
import Elements from './Elements';

function FormMaker({ formData, onDataChange, onModeChange }) {
    const [drag, setDrag] = useState(null);

    const handleTitleChange = (event) => {
        onDataChange({ ...formData, title: event.target.value });
    };

    const handleDescriptionChange = (event) => {
        onDataChange({ ...formData, description: event.target.value });
    };

    const addElement = (response) => {
        const newElement = {
            id: Date.now().toString(),
            type: response.type,
            value: '',
            options: response === 'multipleChoice' || response === 'checkboxes' || response === 'dropdown' ? [Option] : undefined,
        };
        onDataChange({...formData, elements: [...formData.elements, newElement] });
    }

    return (
        <div className="form-builder">
            <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Form Title"
                className="form-title"
            />
            <textarea
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Form Description"
                className="form-description"
            />
            <div className="element-types">
                <button onClick={() => addElement('shortAnswer')}>Add Short Answer</button>
                <button onClick={() => addElement('paragraph')}>Add Paragraph</button>
                <button onClick={() => addElement('multipleChoice')}>Add Multiple Choice</button>
                <button onClick={() => addElement('checkboxes')}>Add Checkboxes</button>
                <button onClick={() => addElement('dropdown')}>Add Dropdown</button>
                <button onClick={() => addElement('date')}>Add Date</button>
                <button onClick={() => addElement('fileUpload')}>Add File Upload</button>
            </div>
        </div >
    );
}

export default FormMaker;