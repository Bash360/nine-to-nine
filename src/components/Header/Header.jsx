import React from 'react';
import './Header.css';
import NavLink from '../Link/NavLink.jsx';
import InputField from '../InputField/InputField.jsx';
import logo from './logo.jpg';
import Button from '../Button';

export default function Header() {
	return (
		<header className="containerHeader">
			<img src={logo} className="icon" alt="logo" />
			<form className="search">
				<InputField
					id="search"
					placeholder="search for services offered"
					name="search"
					className="inputField"
				/>
				<Button hoverTitle="Search" buttonLabel="search" buttonClass="outline-success" buttonWidth="100px" />
			</form>
			<nav>
				<ul>
					<li className="primary outline-primary ">
						<NavLink title="home" to="/" where="/home" text="Home" />
					</li>
					<li className="primary outline-primary ">
						<NavLink title="services" where="/services" text="Services" />
					</li>
					<li className="primary outline-primary">
						<NavLink title="profile" to="/" where="/profile" text="profile" />
					</li>
				</ul>
			</nav>
		</header>
	);
}
