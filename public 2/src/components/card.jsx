import React from 'react';

const Card = ({ title, subtitle, imageUrl, children }) => {
  return (
    <div className="card">
      {imageUrl && (
        <div
          className="card-image-container"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      )}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        <div className="card-text">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;