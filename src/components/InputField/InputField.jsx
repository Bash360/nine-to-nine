import React from 'react';
import './InputField.css';
export default function InputField({ id, name, className, placeholder, type, pattern, accept, change}) { 
  return (
    <React.Fragment>
      <input accept={accept} onChange={change} required id={id} name={name}   className={className} type={type} placeholder={placeholder} pattern={pattern} />
        </React.Fragment>
  );
}