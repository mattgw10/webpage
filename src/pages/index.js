import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

import "../styles/style.css"
import ResumeFile from "../assets/resume.pdf"

export default function Home() {
  return (
  	<>
  		<Helmet>
  			<title>home</title>
	    	<link rel="stylesheet" href="style.css" />
  		</Helmet>
  		<header></header>
  		<main>
		<div className="sidenav">
			<Link to="../..">Home</Link>
			<Link to="research">Research</Link>
			<Link to="projects">Projects</Link>
			<Link to="experience">Experience</Link>
		</div>

		<div className="main">
			<h1>Hi, I'm Matt Westbrook</h1>
			<div className="contact">
				<h4>
					I'm a software engineer who started out as a mechanical engineer until I discovered robotics
					and artificial intelligence! I just finished my Master's degree and my career interests are in robotics, control systems, artificial intelligence,
					motion planning, and machine learning.
				</h4>
				<br></br>
				<h4>Here's my contact info:</h4>
		        <p>My preferred method is email</p>
		        <p>My email: <Link to="mailto:mgw10@wildcats.unh.edu">mgw10@wildcats.unh.edu</Link></p>
		        <p>My phone: <Link to="tel:+1 (603) 860-7601">+1 (603) 860-7601</Link></p>
		        <p>My github: <Link to="https://github.com/mattgw10">github</Link></p>
		        <p>My LinkedIn: <Link to="https://www.linkedin.com/in/mattgw10/">LinkedIn</Link></p>
	        	<br></br>
	        	<br></br>
	        </div>
		
		    <div className="skills-back">
			    <h2>Computer/Tech Skills</h2>
			    <table className="skills">
			    	<tr>
					    <td>C/C++</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Python</td>
					    <td className="gold-star">★★★★★</td>
					    <td>VB</td>
					    <td className="gold-star">★★★★★</td>
					</tr>
					<tr>
					    <td>Matlab/Simulink</td>
					    <td className="gold-star">★★★★★</td>
					    <td>SQL</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Javascript</td>
					    <td className="gold-star">★★★★</td>
					</tr>
					<tr>
					    <td>HTML</td>
					    <td className="gold-star">★★★★★</td>
					    <td>CSS</td>
					    <td className="gold-star">★★★★</td>
					    <td>XML</td>
					    <td className="gold-star">★★★★★</td>
					</tr>
					<tr>
					    <td>TCP/IP</td>
					    <td className="gold-star">★★★</td>
					    <td>RESTful APIs</td>
					    <td className="gold-star">★★★★</td>
					    <td>Security</td>
					    <td className="gold-star">★★★</td>
					</tr>
					<tr>
					    <td>LabView</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Solidworks</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Blender</td>
					    <td className="gold-star">★★★</td>
					</tr>
					<tr>
					    <td>ROS</td>
					    <td className="gold-star">★★★★</td>
					    <td>Gazebo</td>
					    <td className="gold-star">★★★</td>
					    <td>Computer Vision</td>
					    <td className="gold-star">★★★</td>
					</tr>
					<tr>
					    <td>Raspberry Pi</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Arduino</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Micro-Controllers</td>
					    <td className="gold-star">★★★★★</td>
					</tr>
					<tr>
					    <td>Unreal Engine</td>
					    <td className="gold-star">★★★★</td>
					    <td>LaTex</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Microsoft Office</td>
					    <td className="gold-star">★★★★★</td>
					</tr>
					<tr>
					    <td>LaTex</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Solidworks</td>
					    <td className="gold-star">★★★★</td>
					    <td>Javascript</td>
					    <td className="gold-star">★★</td>
					</tr>
					<tr>
						<td>Windows</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Linux</td>
					    <td className="gold-star">★★★★★</td>
					    <td>Computer Hardware</td>
					    <td className="gold-star">★★★</td>
					</tr>
					<tr>
						<td>Tensorflow</td>
					    <td className="gold-star">★★★</td>
					    <td>Sci-Kit Learn</td>
					    <td className="gold-star">★★★</td>
					    <td></td>
					    <td></td>
					</tr>
				</table>
			</div>

			<div className="classes-back">
				<h4>Classes</h4>
				<table className="classes">
					<tr>
					    <th>Mechanical</th>
					    <th>Electrical</th>
					    <th>Computer Science</th>
					    <th>Other</th>
					</tr>
					<tr>
						<td>Machine Design</td>
					    <td>Intro to Electrical Engineering</td>
					    <td>Engineering Computing</td>
					    <td>Physics I/II</td>
					</tr>
					<tr>
						<td>Statics</td>
					    <td>Digital Systems</td>
					    <td>Scientific Programming</td>
					    <td>Calculus I/II</td>
					</tr>
					<tr>
						<td>Dynamics</td>
					    <td>System Modelling and Control</td>
					    <td>Algorithms</td>
					    <td>Multi-Dimensional Calculus</td>
					</tr>
					<tr>
						<td>Fluid Dynamics</td>
					    <td>Robust And Optimal Control</td>
					    <td>Mobile Robotics</td>
					    <td>Differential Equations</td>
					</tr>
					<tr>
						<td>Boundary Layers</td>
					    <td>Advanced Control Systems I/II</td>
					    <td>Artificial Intelligence</td>
					    <td>Chemistry I/II</td>
					</tr>
					<tr>
						<td>Thermodynamics</td>
					    <td>Electro-Mechanical Analysis</td>
					    <td>Planning For Robots</td>
					    <td>Micro Economics</td>
					</tr>
					<tr>
						<td>Heat Transfer</td>
					    <td>Satellite System Dynamics and Control</td>
					    <td></td>
					    <td>Biology</td>
					</tr>
					<tr>
						<td>Design/Modelling</td>
					    <td>Experimental Measurement and Data Analysis</td>
					    <td></td>
					    <td>History of Early America</td>
					</tr>
					<tr>
						<td>Material Science</td>
					    <td>Experimental Measurement and Modelling</td>
					    <td></td>
					    <td>Art History</td>
					</tr>
					<tr>
						<td>Mechanics of Materials</td>
					    <td>Nonlinear Controls</td>
					    <td></td>
					    <td>Anthropology</td>
					</tr>
					<tr>
						<td>Thermal Systems</td>
					    <td></td>
					    <td></td>
					    <td>Propaganda and Persuasion</td>
					</tr>
					<tr>
						<td>Environmental Engineering</td>
					    <td></td>
					    <td></td>
					    <td></td>
					</tr>
				</table>
			</div>

			<p className="foot-main">
				Here's my &nbsp;<Link to={ResumeFile}>printable resumé</Link>.
		    </p>
		</div>
  		</main>
  	</>
  	);
}
