import React from 'react';
import "./App.css";
import Header from './components/Header/Header.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';

function App() {
  return (
    <div className="container">
      <Header />
      <LoginForm/>
        
    </div>
  );
}

export default App;
