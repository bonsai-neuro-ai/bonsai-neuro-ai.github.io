import React from 'react';
import { useInView } from 'react-intersection-observer';

const StoneMarker = ({ isDecorative = false }) => {
  const size = isDecorative ? 'small' : 'large';
  
  return (
    <div className={`stone-marker ${size}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="40" ry="30" />
      </svg>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const isEvent = item.type === 'event';
  
  return (
    <div
      ref={ref}
      className={`timeline-item ${item.side} ${isEvent && inView ? `animate-fade-up delay-${index % 5 + 1}` : ''}`}
    >
      <div className="timeline-content-wrapper">
        {isEvent && (
          <div className="timeline-content">
            <div className="timeline-year">{item.data.year}</div>
            <div className="timeline-title">{item.data.title}</div>
            <div className="timeline-institution">{item.data.institution}</div>
            <p className="timeline-description">{item.data.description}</p>
          </div>
        )}
      </div>
      
      <div className="timeline-marker">
        <StoneMarker isDecorative={!isEvent} />
      </div>
    </div>
  );
};

const generatePathData = () => {
  let path = `M 10 0`;
  const points = 40;
  
  for (let i = 0; i < points; i++) {
    const progress = i / points;
    const y = progress * 100;
    
    const amplitude = 8;
    const xVariation = Math.sin(progress * Math.PI * 3) * amplitude;
    
    if (i > 0) {
      const prevY = ((i-1) / points) * 100;
      const midY = (prevY + y) / 2;
      path += ` Q ${10 + xVariation} ${midY} 10 ${y}`;
    }
  }
  
  return path;
};

const Timeline = ({ events }) => {
  if (!Array.isArray(events) || events.length === 0) {
    return null;
  }
  
  const pathData = generatePathData();
  
  const decorativePositions = [
    { top: '15%', offset: '5px' },
    { top: '35%', offset: '-6px' },
    { top: '55%', offset: '8px' },
    { top: '75%', offset: '-5px' },
    { top: '90%', offset: '6px' }
  ];

  return (
    <div className="timeline-container">
      <div className="timeline-path-container">
        <svg className="timeline-path" viewBox="0 0 20 100" preserveAspectRatio="none">
          <path d={pathData} vectorEffect="non-scaling-stroke" />
        </svg>
        
        {decorativePositions.map((position, i) => (
          <div 
            key={`stone-${i}`} 
            className="timeline-marker decorative-marker"
            style={{ 
              top: position.top,
              marginLeft: position.offset
            }}
          >
            <StoneMarker isDecorative={true} />
          </div>
        ))}
      </div>
      
      <div className="timeline-entries">
        {events.filter(item => item.type === 'event').map((item, index) => (
          <TimelineItem 
            key={index} 
            item={item} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;