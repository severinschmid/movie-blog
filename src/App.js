import './css/App.css';
import { Header, Page } from './hooks/container';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('Movies');
  const [selectedPlatforms, setPlatforms] = useState([]);

  return (
    <div className="App">
      <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className="content">
        <Page currentPage={currentPage} selectedPlatforms={selectedPlatforms} setPlatforms={setPlatforms} />
      </div>
    </div>
  );
}

export default App;
