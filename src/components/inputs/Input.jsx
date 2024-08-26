// src/components/Input.jsx

import React from 'react';
import './Input.css';

const Input = ({ type, id, value, onChange, className, required, placeholder }) => {
    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className={className}
            required={required}
            placeholder={placeholder}
        />
    );
};

export default Input;
