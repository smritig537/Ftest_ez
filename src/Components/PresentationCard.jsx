import React from 'react';
import './presentationCard.css';

const PresentationCard = ({ heading, items }) => {
  return (
    <div className="presentation-card">
      <h2 className="card-heading">{heading}</h2>
       <div className="card-line"></div>
      <div className="card-grid">
        {items.map((item, index) => (
          <div key={index} className="card-item">
            <div className="card-icon"></div>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresentationCard;
