import React from 'react';
import InputField from '../InputField/InputField.jsx';
import Button from '../Button/index.jsx';


export default function Signup() {
  return (
    <div className="containerforlogin" style={{height:"800px"}}>
      
      <form className="containerLogin">
        <h3>Sign Up</h3>
       
			<label htmlFor="firstname">First Name</label>
			<InputField id="firstname" className="inputField" placeholder="Enter first name" type="text" />
			<label htmlFor="lastname">Last Name</label>
      <InputField id="lastname" className="inputField" placeholder="Enter last name" type="text" />
      <label htmlFor="email">Email</label>
        <InputField id="email" className="inputField" placeholder="Enter mail" type="email" />
        <div><p>Gender</p></div>
        <div style={{ display: "flex",alignContent:"center", width:"45%", marginBottom: "5px",}}>
          <label style={{margin:'5px'}} htmlFor="male">Male</label>
          <InputField id="male" name="gender" type="radio" required />
          <label style={{ margin: '5px' }}  htmlFor="female">Female</label>
          <InputField id="female" name="gender" type="radio" required />
        </div>
        <label htmlFor="phone">Phone</label>
        <InputField id="phone" className="inputField" placeholder="Enter phone number eg 08182988304" type="tel" pattern="\d{11}" />
        
        <label htmlFor="image">image</label>
        <InputField accept="image/*" className="inputField"  type="file" />
        <label htmlFor="password">Password</label>
        <InputField id="password" className="inputField" placeholder="Enter password" type="password" />
        <Button hoverTitle="sign up" buttonLabel="sign " buttonClass="outline-success" buttonWidth="100px" />
        
      </form>
      </div>
	);
}
