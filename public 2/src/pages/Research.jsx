import React from 'react';
import researchAreas from '../data/researchAreas.json'; 
import Card from '../components/card';

const Research = () => {
  return (
    <div className="page-content">
      <h1>Our Research</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aperiam minus dolores earum veniam, voluptates libero vel dolorem expedita, perferendis cumque magnam dignissimos nemo molestiae. Doloribus itaque debitis laboriosam! Sunt!</p>
      <div className="card-grid">
        {researchAreas.map((area, index) => (
          <Card key={index} title={area.title}>
            {area.description}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Research;