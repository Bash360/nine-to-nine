import React from 'react';
import './404.css';
import NavLink from '../components/Link/NavLink';
import errorImage from './404.gif';
export default function FourOFour() { 
  return (
    <div className="error">
      <h1>Page Not Found!!! </h1>
      <div style={{width:"20%",margin:"auto" ,borderRadius: "5px", textAlign: "center", padding: "5px"}} className="primary outline-primary ">
						<NavLink title="home"  where="/" text="go back home" />
					</div>
      <img className="gif-block" src={errorImage} alt="error page" />
      
      
    </div>
  );
}