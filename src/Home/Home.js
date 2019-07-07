import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm.jsx';
import Niners from '../components/Niners/Niners';
import Signup from '../components/Signup/Signup.jsx';
export default function Home(props) {
  return (
    <React.Fragment>
     <Signup/>
      <Niners/>
    </React.Fragment>
  );
 }