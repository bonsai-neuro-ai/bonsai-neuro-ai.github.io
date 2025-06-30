import React, { useState } from 'react';
import publicationsData from '../data/publications.json';

const PublicationItem = ({ pub }) => {
  const [showBibtex, setShowBibtex] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pub.bibtex);
  };

  return (
    <div className="publication-item">
      <h3 className="publication-title">
        <a href={pub.link} target="_blank" rel="noopener noreferrer">{pub.title}</a>
      </h3>
      <p className="publication-authors">{pub.authors}</p>
      <p className="publication-journal"><em>{pub.journal}</em></p>
      <div className="publication-actions">
        <button onClick={() => setShowBibtex(!showBibtex)}>
          {showBibtex ? 'Hide' : 'Show'} BibTeX
        </button>
      </div>
      {showBibtex && (
        <div className="bibtex-container">
          <pre className="bibtex-display">
            <code>{pub.bibtex}</code>
          </pre>
          <button className="copy-bibtex-btn" onClick={handleCopy}>Copy</button>
        </div>
      )}
    </div>
  );
};

const Publications = () => {
  return (
    <div className="page-content">
      <h1>Our Publications</h1>
      <div className="publications-list">
        {publicationsData.map(pub => (
          <PublicationItem key={pub.id} pub={pub} />
        ))}
      </div>
    </div>
  );
};

export default Publications;