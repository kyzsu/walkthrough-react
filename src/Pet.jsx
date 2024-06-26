const Pet = (props) => {
  let defaultImg = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if (props.images.length) {
    defaultImg = props.images[0];
  }

  return (
    <a href={`/details/${props.id}`} className="pet">
      <div className="image-container">
        <img src={defaultImg} alt={props.name} />
      </div>
      <div className="info">
        <h1>{props.name}</h1>
        <h2>{`${props.animal} ${props.breed} ${props.location}`}</h2>
      </div>
    </a>
  );
};

export default Pet;
