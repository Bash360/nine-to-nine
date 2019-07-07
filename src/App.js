import React from 'react';
import "./App.css";
import {Route,Switch} from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Signup from './components/Signup/Signup.jsx';
import Home from './Home/Home';
import Footer from './components/Footer/Footer';
import LoginForm from './components/LoginForm/LoginForm';
import FourOFour from './404/404';
function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={LoginForm} />
      <Route path="/signup" exact component={Signup} />
      <Route   exact component={FourOFour} />
      </Switch>
      
      
      <Footer/>  
    </div>
  );
}

export default App;
