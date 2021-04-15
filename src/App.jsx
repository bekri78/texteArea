import React from 'react';
import TextToSpeech from './views/TextToSpeech';
import SimpleAccordion from './components/Questions/questions.jsx';
import HideAppBar from './components/Navbar/navbar';

import './App.css';
function App() {
  return (
    <div>
      <HideAppBar />
      <SimpleAccordion />
      <TextToSpeech />
    </div>
  );
}

export default App;
