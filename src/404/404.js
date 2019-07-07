import React from 'react';
import './404.css';
import NavLink from '../components/Link/NavLink';
import errorImage from './404.gif';
export default function FourOFour() {
  const handleClick=()=>{
    window.history.back();
  } 
  return (
    <div className="error">
      <h1>Page Not Found!!! </h1>
      <div style={{width:"20%",margin:"auto" , textAlign: "center", padding: "5px"}} >
						<input style={{borderRadius: "5px",fontSize:"1.4rem",cursor:"pointer"}} onClick={handleClick} className="suscess outline-success " type="button" value="go back" />
					</div>
      <img className="gif-block" src={errorImage} alt="error page" />
      
      
    </div>
  );
}