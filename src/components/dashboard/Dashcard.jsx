// src/components/Login.jsx
import React from 'react';
// import Header from '../../components/headers/Header'; // Adjust the path as necessary
import './Dashcard.css'

const DashCard = ({ name, color }) => {
  return (
      <div className="dashcard">
          <h2 className="dashcard-name" style={{ color: color }}>
              {name}
          </h2>
          <p className="dashcard-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        vehicula erat at magna lacinia, ac fermentum urna ullamcorper. Nulla
        facilisi. Integer tempor massa vel nulla sodales feugiat.
      </p>
     
        
      </div>
  );
};

export default DashCard;
