// src/components/Button.jsx

import React from 'react';
import './Buttons.css';

const Button = ({ type, className, onClick, children,style }) => {
    return (
        <button type={type} style={style} className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
