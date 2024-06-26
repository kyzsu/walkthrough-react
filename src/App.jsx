import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import SearchParams from './SearchParams';
import Details from './Details';

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Adopsi saya!</Link>
      </header>
      <Routes>
        <Route path="/" element={<SearchParams />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
