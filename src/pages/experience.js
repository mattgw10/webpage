
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import "../styles/style.css"
import React from "react"
import { Link } from "gatsby"

import { MdWork } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

export default function Work() {
	return (
		<div>
			<div className="sidenav">
				<Link to="../">Home</Link>
				<Link to="../research">Research</Link>
				<Link to="../projects">Projects</Link>
				<Link to="../experience">Experience</Link>
			</div>
			<div className="main">
				<h1>Experience</h1>
				<h4>
					This page goes over my basic work and school experience. More detailed information can be found in
					&nbsp;<Link to="../projects">Projects</Link> or <Link to="../research">Research</Link>.
				</h4>
				<br></br>
				<VerticalTimeline>
					<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    date="2021 - Present"
					    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    icon={<MdWork />}
				  	>
					    <h3 >Software Engineer -  Behavior and Motion Planning</h3>
					    <h4 style={{color: '#fff'}}>Virgin Hyperloop</h4>
					    <p>
					      Software Development, Autonomous Transit
					    </p>
					    <p>
					      	I develop command and control software for autonomous pods in a hyperloop. The software includes 
					      	motion planning and behavior control for pods at high speeds and high traffic, including merging and convoy formation.
					    </p><br></br>
						<p>
							In this role I program mainly using C++, Matlab, and Python and use tools such as JIRA and Confluence.
						</p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    date="2018 - 2021"
					    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    icon={<MdWork />}
				  	>
					    <h3 >Production Engineer</h3>
					    <h4 style={{color: '#fff'}}>Beswick Engineering</h4>
					    <p>
					      Automation, Software Development
					    </p>
					    <p>
					      	I developed ERP software and test stand automation for quality control processes.
					      	This included automated packing and shipping software which interacts with FedEx, UPS, Google,
					      	and Cybersource APIs along with internal software and databases for seemless resource tracking
					      	and increased efficiency. I also automated testing of miniature pneumatic products and laser marking 
					      	for increased safety and quality, as well as deep learning for test validation.
					    </p><br></br>
						<p>
							These projects among others in this role gave me experience in C++, Python, VB, SQL, LabView,
							HTML, XML, TCP/IP, RESTful APIs, Tensorflow, Sci-Kit Learn,  Matlab, Solidworks, Microsoft Office, and hardware.
						</p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
					    date="2018 - 2020"
					    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
					    icon={<FaGraduationCap />}
				  	>
					    <h3 style={{background: 'rgb(180, 30, 120)'}}>Master's of Science, Mechanical Engineering</h3>
					    <h4 style={{color: '#fff'}}>University of New Hampshire</h4>
					    <p>
					    	GPA - 3.83/4.00
					    </p>
					    <p>
					    	Control Systems, Robotics, Artificial Intelligence, Motion Planning
					    </p>
					    <p>
					    	My classwork focused on robotics, in areas such as control systems and motion planning (the specific
					    	classes can be found on the <Link to="../">home page</Link>). My research in the mechatronics lab and 
					    	artificial intelligence group was both theoretically intensive and implementation intensive.
					    </p>
					    <p><Link to="../research">More information about my research</Link>.</p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    date="2012-2020"
					    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    icon={<MdWork />}
				  	>
					    <h3 >68W - Healthcare Specialist (Medic)</h3>
					    <h4 style={{color: '#fff'}}>NH Army National Guard</h4>
					    <p>
					    	Medical Care for C Co. 3/172 INF - Mountain Infantry Unit
					    </p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
					    date="2014 - 2018"
					    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
					    icon={<FaGraduationCap />}
				  	>
					    <h3 style={{background: 'rgb(180, 30, 120)'}}>Bachelor's of Science, Mechanical Engineering</h3>
					    <h4 style={{color: '#fff'}}>University of New Hampshire</h4>
					    <p>
					    	GPA - 3.23/4.00
					    </p>
					    <p>
					    	Mathematics, Physics, Mechanics, Dynamics, Thermal Systems, Gen Ed.
					    </p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    date="2017"
					    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    icon={<MdWork />}
				  	>
					    <h3 >Engineering Intern</h3>
					    <h4 style={{color: '#fff'}}>General Electric - Aviation</h4>
					    <p>
					    	Automation, Business Operations
					    </p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    date="2016"
					    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    icon={<MdWork />}
				  	>
					    <h3 >Engineering Intern</h3>
					    <h4 style={{color: '#fff'}}>Contract Support Group</h4>
					    <p>
					    	Quality Control, Work Process Documentaion
					    </p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    date="2015"
					    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    icon={<MdWork />}
				  	>
					    <h3 >Technician</h3>
					    <h4 style={{color: '#fff'}}>LRC Fire Safety</h4>
					    <p>
					    	Quality Inspection, Assembly
					    </p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    date="2014"
					    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    icon={<MdWork />}
				  	>
					    <h3 >Flow Team</h3>
					    <h4 style={{color: '#fff'}}>Target</h4>
					    <p>
					    	Unload trucks and stock shelves
					    </p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
					    date="2009 - 2013"
					    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
					    icon={<FaGraduationCap />}
				  	>
					    <h3 style={{background: 'rgb(180, 30, 120)'}}>High School Diploma</h3>
					    <h4 style={{color: '#fff'}}>Manchester Central</h4>
					    <p>
					    	Gen Ed.
					    </p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    date="2010-2013"
					    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					    icon={<MdWork />}
				  	>
					    <h3 >Waiter/Cook</h3>
					    <h4 style={{color: '#fff'}}>Tinker's Seafood</h4>
					    <p>
					    	Prepare orders and serve customers
					    </p>
				  	</VerticalTimelineElement>
				  	<VerticalTimelineElement
					    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
					    icon={<AiFillStar />}
				  	/>
				</VerticalTimeline>
			</div>
		</div>
	);
}