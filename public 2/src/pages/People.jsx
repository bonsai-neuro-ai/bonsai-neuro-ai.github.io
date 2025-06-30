import React from 'react';
import teamMembers from '../data/teamMembers.json'; 
import Card from '../components/card';  

const People = () => {
  return (
    <div className="page-content">
      <h1>Our People</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere aliquid eos deserunt, necessitatibus odit enim, distinctio incidunt voluptatem recusandae minima magnam magni explicabo dolores nostrum, natus quibusdam quas impedit in.</p>
      <div className="card-grid">
        {teamMembers.map((member) => (
          <Card
          key={member.id} 
          title={member.name}
          subtitle={member.role}
          imageUrl={member.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};


export default People;