import React from 'react';
import NavLink from '../Link/NavLink';
export default function Niners() {

  let name = "bash";
  let serviceOffered = "cleaner";
  return (
  

    <div className="card">
      <img src="https://picsum.photos/200/300?random=1" alt="" />
      <h1>{name}</h1>
      <h5 className="title">{serviceOffered}</h5>
      <li  className="primary outline-primary ">
        <NavLink  title="home" where="/" text="Contact" />
      </li>
    </div>
  
  )
}