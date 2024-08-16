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
            type: response,
            value: '',
            options: response === 'multipleChoice' || response === 'checkboxes' || response === 'dropdown' ? [Option] : undefined,
        };
        onDataChange({ ...formData, elements: [...formData.elements, newElement] });
    }

    const updateElement = (id, updatedElement) => {
        const updatedElements = [...formData.elements];
        updatedElements[updatedElements.findIndex((event) => event.id === id)] = updatedElement;
        onDataChange({...formData, elements: updatedElements });
    };

    const deleteElement = (id) => {
        const updatedElements = formData.elements.filter((event) => event.id !== id);
        onDataChange({...formData, elements: updatedElements });
    }

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData('elementId', event.target.id);
        setDrag(formData.elements[index]);
    }

    const handleDragOver = (index) => {
        const draggedOverElement = formData.elements[index];

        if (drag = draggedOverElement) {
            return;
        }

        let elements = formData.elements.filter((event) => event !== drag);

        elements.splice(index, 0, draggedOverElement);

        onDataChange({...formData, elements });
    }

    const handleDragEnd = () => {
        setDrag(null);
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
            <div className="form-elements">
                {formData.elements.map((element, index) => (
                    <div
                        key={element.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={() => handleDragOver(index)}
                        onDragEnd={handleDragEnd}
                        className="draggable-element"
                    >
                        <Elements
                            element={element}
                            onUpdate={(updatedElement) => updateElement(element.id, updatedElement)}
                            onDelete={() => deleteElement(element.id)}
                        />
                    </div>
                ))}
            </div>
            <button onClick={() => onModeChange('preview')}>Preview Form</button>
        </div >
    );
}

export default FormMaker;