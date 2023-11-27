import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => (
  <footer className="bg-dark text-light fixed-bottom"> {/* Added fixed-bottom class */}
    <div className="container text-center">
      <p className="mb-0 py-3">© 2023 Your Company Name</p>
    </div>
  </footer>
);

export default Footer;
