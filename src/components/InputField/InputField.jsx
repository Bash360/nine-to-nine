import React, { useState,useContext,useEffect} from 'react';
import './InputField.css';
export default function InputField({ id, name, className, placeholder, type, pattern, accept, value, onChange }) { 
  let []=useState();
  function handleChange() { 

  }
  return (
    <React.Fragment>
      <input accept={accept} value={value} onChange={onChange} required id={id} name={name} className={className} type={type} placeholder={placeholder} pattern={pattern}/>
        </React.Fragment>
  );
}