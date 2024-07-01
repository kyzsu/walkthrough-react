import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Details from './Details';
import SearchParams from './SearchParams';
import AdoptedPetContext from './AdoptedPetContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <AdoptedPetContext.Provider value={adoptedPet}>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/">Adopsi saya!</Link>
        </header>
        <Routes>
          <Route path="/" element={<SearchParams />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </QueryClientProvider>
    </AdoptedPetContext.Provider>
  );
};

export default App;
