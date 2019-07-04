import React from 'react';
import { Link } from "react-router-dom";
import "./NavLink.css"
export default function NavLink(props) { 
  return (
    <Link title={props.title} className="link" to={props.where} style={{width:props.size}}>{props.text}</Link>
  );
}