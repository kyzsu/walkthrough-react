import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';

import Modal from './Modal';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';

import { adopt } from './adoptedPetSlice';
import { useGetPetQuery } from './petApiService';

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { data: pet, isLoading } = useGetPetQuery(params.id);

  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">
          <CircleLoader size={40} color="#0000ff" />
        </h2>
      </div>
    );
  }

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
                    dispatch(adopt(pet));
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
