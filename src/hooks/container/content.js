import { Shows, Movies } from '../pages';
import FilterButtons from './filterButtons';

export default function Content(props) {
  return (
    <div>
      <FilterButtons setPlatforms={props.setPlatforms} selectedPlatforms={props.selectedPlatforms} />
      <div>
        {props.currentPage === 'Shows' ? (
          <Shows selectedPlatforms={props.selectedPlatforms} />
        ) : (
          <Movies selectedPlatforms={props.selectedPlatforms} />
        )}
      </div>
    </div>
  );
}
