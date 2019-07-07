import React from 'react';
import "./App.css";
import {Route,Switch} from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Signup from './components/Signup/Signup.jsx';
import Home from './Home/Home';
import Footer from './components/Footer/Footer';
import LoginForm from './components/LoginForm/LoginForm';
import FourOFour from './404/404';
import Services from './components/Services/Services.js';
import DashBoard from './components/Dashboard/DashBoard.js';
function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
      <Route path="/" strict exact component={Home} />
      <Route path="/home" strict exact component={Home} />
      <Route path={"/services/:service"} strict exact render={(routeprops)=><Services service={routeprops.match.params.service}/>} />
      <Route path="/services" exact strict component={Services}/>
      <Route path="/login" strict  exact component={LoginForm} />
       <Route path="/dashboard" strict  exact component={DashBoard} />
      <Route path="/signup" strict exact component={Signup} />
      <Route strict   exact component={FourOFour} />
      </Switch>
      
      
      <Footer/>  
    </div>
  );
}

export default App;
