import { Shows, Movies } from '../pages';
import FilterButtons from './filterButtons';
import { CONFIG } from '../../config';

export default function Content(props) {
  // activeButtons are buttons that should be green, selectedPlatforms are platforms which content should be displayed.
  // Those are almost always the same, except for in the first load of the page
  let activeButtons = props.selectedPlatforms.length == 0 ? CONFIG.platforms : props.selectedPlatforms;
  return (
    <div>
      <FilterButtons setPlatforms={props.setPlatforms} selectedPlatforms={props.selectedPlatforms} />
      {props.currentPage === 'Shows' ? <Shows activeButtons={activeButtons} /> : <Movies activeButtons={activeButtons} />}
    </div>
  );
}
