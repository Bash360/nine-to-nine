import React from 'react';
import "./App.css";
import {Route} from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Signup from './components/Signup/Signup.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';

function App() {
  return (
    <div className="container">
      <Header />
      <LoginForm />
      <Route path="/signup" exact component={Signup} />
      <Route path="/" exact />
        
    </div>
  );
}

export default App;
