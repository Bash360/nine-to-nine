import React from 'react'
function InputField(props) { 
  return (
    <label id={props.id}><label>
    <input type={props.type} placeholder={props.placeholder}/>
  );
}