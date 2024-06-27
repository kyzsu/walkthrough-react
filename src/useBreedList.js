import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';

import fetchBreedList from './fetchBreedList';

// const localCache = {};

// OLD - WITHOUT React-Query
// function useBreedList(animal) {
//   const [breedList, setBreedList] = useState([]);
//   const [status, setStatus] = useState('unloaded');

//   useEffect(() => {
//     if (!animal) {
//       setBreedList([]);
//     } else if (localCache[animal]) {
//       setBreedList(localCache[animal]);
//     } else {
//       requestBreedList();
//     }

//     async function requestBreedList() {
//       const res = await fetch(
//         `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
//       );

//       const json = await res.json();
//       localCache[animal] = json.breeds || [];
//       setBreedList(localCache[animal]);
//       setStatus('loaded');
//     }
//   }, [animal]);

//   return [breedList, status];
// }

// NEW - WITH REACT-QUERY
function useBreedList(animal) {
  const results = useQuery(['breeds', animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status];
}

export default useBreedList;
