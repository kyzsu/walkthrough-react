import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';

import fetchPet from './fetchPet';
import Carousel from './Carousel';

const Details = () => {
  const params = useParams();
  const results = useQuery(['details', params.id], fetchPet);
  // useQuery(1 = payload/options merupakan array => [a = label,b = id], 2 = function)

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">
          <CircleLoader size={40} color="#0000ff" />
        </h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} ${pet.breed} ${pet.city}, ${pet.state}`}</h2>
        <button>Apakah anda mau meng-adopsi {pet.name}?</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default Details;
