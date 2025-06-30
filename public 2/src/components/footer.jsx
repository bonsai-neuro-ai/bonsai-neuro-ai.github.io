import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <p>&copy; {currentYear} Bonsai Lab. All rights reserved.</p>
    </footer>
  );
};

export default Footer;