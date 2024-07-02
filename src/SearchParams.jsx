import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import Results from './Results';
import fetchSearch from './fetchSearch';
import useBreedList from './useBreedList';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  const [animal, setAnimal] = useState('');
  const [reqParams, setReqParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });
  const [breeds] = useBreedList(animal);
  const results = useQuery(['search', reqParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get('animal') ?? '',
            location: formData.get('location') ?? '',
            breed: formData.get('breed') ?? '',
          };
          setReqParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        {/* uncontrolled form */}
        <label htmlFor="location">
          <input
            id="location"
            placeholder="Location"
            type="text"
            name="location"
            // value={location}
            // onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        {/* controlled form */}
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            // value={animal}
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        {/* uncontrolled form */}
        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
