import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm.jsx';
import Niners from '../components/Niners/Niners';
export default function Home(props) {
  return (
    <React.Fragment>
      <LoginForm />
      <Niners/>
    </React.Fragment>
  );
 }