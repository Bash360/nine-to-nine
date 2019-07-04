import React from 'react';
import './InputField.css';
export default function InputField(props) { 
  return (
    <React.Fragment>
      <input name={props.name} className={props.className} type={props.type} placeholder={props.placeholder} />
        </React.Fragment>
  );
}