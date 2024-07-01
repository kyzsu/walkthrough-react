import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';

import fetchPet from './fetchPet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import Modal from './Modal';
import AdoptedPetContext from './AdoptedPetContext';

const Details = () => {
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const params = useParams();
  const results = useQuery(['details', params.id], fetchPet);
  // useQuery(1 = payload/options merupakan array => [a = label,b = id], 2 = function)

  const [showModal, setShowModal] = useState(false);

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
        <button onClick={() => setShowModal(true)}>
          Apakah anda mau meng-adopsi {pet.name}?
        </button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Apakah kamu ingin meng-adopsi {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate('/');
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
