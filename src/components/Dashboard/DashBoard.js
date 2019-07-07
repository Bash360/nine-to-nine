import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
export default function DashBoard(){
  const handleClick=()=>{
   localStorage.removeItem("email");
  }
  return(
    <React.Fragment>
    <h1>DashBoard</h1>
    <input type="button" value="delete" onClick={handleClick} />
    {localStorage.getItem("email")===null?<Redirect to="/login"/>:""}
    </React.Fragment>
    
    );
}