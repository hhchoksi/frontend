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
        </div>
    );
}

export default FormMaker;