import React from 'react';
import { NavLink } from "react-router-dom";
import "./NavLink.css"
export default function Link(props) { 
  return (
    <NavLink activeStyle={{color:"green"}} title={props.title} className="link" to={props.where} style={{width:props.size}}>{props.text}</NavLink>
  );
}