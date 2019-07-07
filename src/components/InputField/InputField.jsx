import React from 'react';
import './InputField.css';
export default function InputField({ id, name, className, placeholder, type, pattern, accept, change,minlength}) { 
  return (
    <React.Fragment>
      <input accept={accept} onChange={change} required id={id} name={name} minLength={minlength}   className={className} type={type} placeholder={placeholder} pattern={pattern} />
        </React.Fragment>
  );
}