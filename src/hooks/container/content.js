import { Shows, Movies } from '../pages';
import FilterButtons from './filterButtons';
import { useState } from 'react';
import { CONFIG } from '../../config';

export default function Content(props) {
  const [selectedPlatforms, setPlatforms] = useState(CONFIG.platforms);

  const currentPage = props.currentPage;
  return (
    <div>
      <FilterButtons setPlatforms={setPlatforms} selectedPlatforms={selectedPlatforms} />
      <div>{currentPage === 'Shows' ? <Shows selectedPlatforms={selectedPlatforms} /> : <Movies selectedPlatforms={selectedPlatforms} />}</div>
    </div>
  );
}
