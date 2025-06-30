import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout';
import Home from './Home';
import People from './People';
import Research from './research';
import Publications from './Publications';
import Contact from './Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="people" element={<People />} />
        <Route path="research" element={<Research />} />
        <Route path="publications" element={<Publications />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;