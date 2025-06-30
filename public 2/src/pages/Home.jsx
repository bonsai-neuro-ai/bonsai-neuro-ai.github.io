import React from 'react';
import Timeline from '../components/timeline';
import timelineData from '../data/timeline.json'; 
import ScholarIcon from '../components/icons/Scholaricon';
import GithubIcon from '../components/icons/Githubicon';
import LinkedinIcon from '../components/icons/Linkedinicon';

const Home = () => {
  return (
    <div>
      <div className="welcome-section">
        <h1>Welcome to the Lab</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      
      <div className="page-content">
        <div className="about-me-section">
          <img 
            src= "/images/avatar.png"
            alt="Headshot of the Principal Investigator" 
            className="about-me-image"
          />
          <div className="about-me-content">
            <h3>Dr. Lorem Ipsum</h3>
            <p className="pi-title">Principal Investigator</p>
            <p>I am an assistant professor in the Department of Computer Science at RIT, with additional appointments in the Cognitive Science PhD Program and the Center for Vision Science.</p>

            <Timeline events={timelineData.timeline} />

            <div className="social-links">
              <a href="#" className="social-link" aria-label="Google Scholar Profile" target="_blank" rel="noopener noreferrer">
                <ScholarIcon />
              </a>
              <a href="#" className="social-link" aria-label="GitHub Profile" target="_blank" rel="noopener noreferrer">
                <GithubIcon />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;