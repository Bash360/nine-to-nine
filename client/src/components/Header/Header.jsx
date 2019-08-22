import React, { useState} from 'react';
import './Header.css';
import Link from '../Link/NavLink.jsx';
import InputField from '../InputField/InputField.jsx';
import axios from 'axios';
import logo from './logo.jpg';
import Button from '../Button';

/**
 * @description the main header of nine to nine app on every page
 * @author "mark bashir"
 * @date 2019-07-10
 * @export
 * @returns header component which contains the nav bar and a search field with a button
 */
export default function Header() {
 const [search, setSearch] = useState("");

	const handleChange = function(event) {
		setSearch(event.target.value);
	};
	const handle=function(query){
		try{
axios.get(`localhost:3000/services?jobtitle=${query}`);
		}catch(err){console.error(err);}

	};
	function handleSubmit(evt) { 
		evt.preventDefault();
	}
	return (
		<header className="containerHeader">
			<img src={logo} className="icon" alt="logo" />
			<form onSubmit={handleSubmit} className="search">
				<InputField
					id="search"
					placeholder="search for services offered"
					name="search"
					change={handleChange}
					className="inputField"
					value={search}
				/>
				<Button hoverTitle="Search" buttonLabel="search" buttonClass="outline-success" buttonWidth="100px" />
			</form>
			<nav>
				<ul>
					<li className="primary outline-primary ">
						<Link title="home"  where="/" text="Home" />
					</li>
					<li className="primary outline-primary ">
						<Link title="login" where="/login" text="Sign in" />
					</li>

					<li className="primary outline-primary ">
						<Link title="sign up" where="/signup" text="Sign up" />
					</li>
					<li className="primary outline-primary ">
						<Link title="services" where="/services" text="Services" />
					</li>
					
				</ul>
			</nav>
		</header>
	);
}
