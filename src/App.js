import './css/App.css';
import { Header, Page } from './hooks/container';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('Movies');

  return (
    <div className="App">
      <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className="content">
        <Page currentPage={currentPage} />
      </div>
    </div>
  );
}

export default App;
