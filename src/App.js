import React from 'react';
import Calculator from './components/Calculator';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Basic Calculator</h1>
        <Calculator />
      </header>
    </div>
  );
};

export default App;
