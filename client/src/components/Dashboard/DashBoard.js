import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import "./DashBoard.css";
export default function DashBoard(){
  const [email,setEmail]=useState(localStorage.getItem("email"));
  const handleClick=()=>{
   localStorage.removeItem("email");
   setEmail(localStorage.getItem("email"));
  }
  return email!==null?(
    <React.Fragment>
   <header id="dashboardHeader">
   <input type="button" value="remove" onClick={handleClick} />
		<div className="dashboardlogo">Xero<span>Source</span></div>
	</header>
	<div className="nav-btn">Menu</div>
	<div className="dashboardContainer">
		
		<div className="sidebar">
			<nav>
				<a href="#">Xero<span>Source</span></a>
				<ul>
					<li className="active"><a href="#">Dashboard</a></li>
					<li><a href="#">Create Service</a></li>
					<li><a href="#">Services rendered</a></li>
					<li><a href="#">Edit Profile</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</nav>
		</div>

		<div className="main-content">
			<h1>Dashboard</h1>
			<p>Here you can stuff!</p>
			<div className="panel-wrapper">
				<div className="panel-head">
					News
				</div>
				<div className="panel-body">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam fugiat culpa quia possimus molestiae id sapiente ad eveniet, aliquid, eum sint fuga eius, ratione suscipit ut minus voluptates dicta nesciunt.
				</div>
			</div>
			<div className="panel-wrapper">
				<div className="panel-head">
					News
				</div>
				<div className="panel-body">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam fugiat culpa quia possimus molestiae id sapiente ad eveniet, aliquid, eum sint fuga eius, ratione suscipit ut minus voluptates dicta nesciunt.
				</div>
			</div>
			<div className="panel-wrapper">
				<div className="panel-head">
					News
				</div>
				<div className="panel-body">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam fugiat culpa quia possimus molestiae id sapiente ad eveniet, aliquid, eum sint fuga eius, ratione suscipit ut minus voluptates dicta nesciunt. Totam fugiat culpa quia possimus molestiae id sapiente ad eveniet, aliquid, eum sint fuga eius, ratione suscipit ut minus voluptates dicta nesciunt.
				</div>
			</div>
		</div>
	</div>
    </React.Fragment> 
    ): <Redirect to="/login"/>;
}