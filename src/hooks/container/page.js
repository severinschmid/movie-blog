import { Content } from '.';
import { About, Watchlist } from '../pages';

export default function Page(props) {
  const currentPage = props.currentPage;
  if (currentPage === 'Watchlist') return <Watchlist />;
  if (currentPage === 'About') return <About />;
  else return <Content currentPage={currentPage} setPlatforms={props.setPlatforms} selectedPlatforms={props.selectedPlatforms} />;
}
