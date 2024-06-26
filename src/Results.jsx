import React from 'react';

import Pet from './Pet';

const Results = ({ pets }) => {
  return (
    <div>
      {!pets.length ? (
        <h1>Tidak ada hewan peliharaan yang ditemukan</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              name={pet.name}
              breed={pet.breed}
              key={pet.id}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
