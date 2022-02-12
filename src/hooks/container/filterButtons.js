import { CONFIG } from '../../config';

export default function FilterButtons(props) {
  const updateSelectedPlatforms = (clicked) => {
    props.setPlatforms(
      props.selectedPlatforms.includes(clicked) ? props.selectedPlatforms.filter((elem) => elem != clicked) : [...props.selectedPlatforms, clicked]
    );
  };

  return (
    <div>
      <div>
        <p className="filter__text text">Select your platforms</p>
      </div>
      <div className="filter__buttons">
        {CONFIG.platforms.map((elem) => (
          <span
            key={elem}
            className={`filter__button ${props.selectedPlatforms.includes(elem) ? 'button__isActive' : ''}`}
            onClick={() => updateSelectedPlatforms(elem)}>
            {elem}
          </span>
        ))}
      </div>
    </div>
  );
}
