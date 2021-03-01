import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

import "../styles/style.css"
import TeamImg from "../images/lunacats_team.jpg"
import RobotImg from "../images/lunacats_robot.jpg"
import WheeledImg from "../images/wheeled_robot.png"
import QuadImg from "../images/quad_rotor.png"
import A from "../images/A_small_rotated.png"
import Process from "../images/process.png"
import B from "../images/Compare_B.png"
import E from "../images/Compare_E.png"
import GRAIL_A from "../images/Compare_GRAIL_A.png"
import GRAIL_B from "../images/Compare_GRAIL_B.png"

function ProjImage(props) {
  	return (
	    <div className="active fade">
          	<div className="numbertext">{props.slideIndex} / {props.slideLen}</div>
          		<img className="proj-images" src={props.slide} alt={props.slideAlt}></img>
          	<div className="text">{props.slideDesc}</div>
        </div>
  	);
}

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slideShow: [{
				slideIndex: 0, 
				slides: [{
					image: TeamImg,
					slideAlt: "Team Photo",
					slideDesc: "Lunacats team photo at Kennedy Space Center (2018)"
				},{
					image: RobotImg,
					slideAlt: "Robot Photo",
					slideDesc: "Lunacats robot in testing pit (2017)"
				}]},
				{
				slideIndex: 0, 
				slides: [{
					image: QuadImg,
					slideAlt: "Quad-Rotor",
					slideDesc: "Quad-rotor with markers for camera tracking"
				},{
					image: WheeledImg,
					slideAlt: "Wheeled Robot",
					slideDesc: "Non-holonomic wheeled robot"
				}]},
				{
				slideIndex: 0, 
				slides: [{
					image: A,
					slideAlt: "A",
					slideDesc: "17 March 2013 crater event. Small and rotated image alignment and crater identification"
				},{
					image: Process,
					slideAlt: "Process",
					slideDesc: "Crater identification process with difference, threshold, and erosion steps"
				},{
					image: B,
					slideAlt: "B",
					slideDesc: "New crater 260 identified by algorithm"
				},{
					image: E,
					slideAlt: "E",
					slideDesc: "17 March 2013 crater event with photos at different times of day identified by algorithm"
				},{
					image: GRAIL_A,
					slideAlt: "GRAIL A",
					slideDesc: "GRAIL A landing site identified by algorithm"
				},{
					image: GRAIL_B,
					slideAlt: "GRAIL B",
					slideDesc: "GRAIL B landing site identified by algorithm"
				}]}	
			]
		};
	}

	showSlides(s, n) {
		var i = n;
		var slideshow_new = this.state.slideShow.slice();
		if (n >= this.state.slideShow[s].slides.length) {
			i = 0
		} else if (n < 0) {
			i = this.state.slideShow[s].slides.length-1
		} else {
			i = n
		}
		slideshow_new[s].slideIndex = i
		this.setState({
			slideShow: slideshow_new
		});
	}

	// Next/previous controls
	plusSlides(s, n) {
	  	this.showSlides(s, this.state.slideShow[s].slideIndex += n);
	}

	// Thumbnail image controls
	currentSlide(s, n) {
	  	this.showSlides(s, this.state.slideShow[s].slideIndex = n);
	}

	render() {
	    return (
	    	<div>
	    		<Helmet>
		  			<title>Projects</title>
		  		</Helmet>
		  		<header></header>
		  		<div className="sidenav">
					<Link to="../">Home</Link>
					<Link to="../research">Research</Link>
					<Link to="../projects">Projects</Link>
					<Link to="../experience">Experience</Link>
				</div>
		  		<div className="main">
				    <h1>Some of my Projects</h1>
		    
			        <div>
			          	<h3>UNH Lunacats</h3>
			          	<br></br>
			          	<div className="slideshow-container">
			          		<ProjImage
					            slide={this.state.slideShow[0].slides[this.state.slideShow[0].slideIndex].image}
					            slideIndex={this.state.slideShow[0].slideIndex+1}
					            slideLen={this.state.slideShow[0].slides.length}
					            slideAlt={this.state.slideShow[0].slides[this.state.slideShow[0].slideIndex].slideAlt}
					            slideDesc={this.state.slideShow[0].slides[this.state.slideShow[0].slideIndex].slideDesc}
					        />

				            <a className="prev" onClick={() => this.plusSlides(0,-1)}>&#10094;</a>
				            <a className="next" onClick={() => this.plusSlides(0,1)}>&#10095;</a>
			          	</div>

			          	<div className="proj-img-selecter">
				            <span className="dot" onClick={() => this.currentSlide(0,0)}></span>
				            <span className="dot" onClick={() => this.currentSlide(0,1)}></span>
			          	</div>
			          	<p>
			          		I was the mechaincal team lead and then graduate advisor of the UNH Lunacats from 2017 to 2020.
			          		The team designs and builds a robot to compete in the 
				            NASA Robotic Mining Competition (RMC) at the Kennedy Space Center in Cape 
				            Canaveral, Florida. The competition drives progress for new and unique rover 
				            designs to accomplish complex tasks. The goal of the competition is to 
				            efficiently mine and deposit as much icy regolith as possible. More points 
				            are scored for more regolith mined in the time limit, less energy used, more 
				            autonomy used, better dust protection, and a lighter robot.
				        </p><br></br>
				        <p>
				            My initial work on the robot was redesigning and building the mining and depositing apparatus as 
				            well as doing scientific outreach in the community around UNH to get more 
				            people interested in STEM fields. I later worked on autonomous navigation algorithms as 
				            well as simultaneous localization and mapping (SLAM). 
				        </p><br></br>
				        <p>
				        	This was a fun project and the team worked 
				            together very well and built an excellent robot, winning the best systems engineering paper in 2019.
				            The competition evolves each year, driving innovation in the robot designs and encouraging thinking outside the box.
				            More information about the competition can be found &nbsp;
				            <Link to="https://www.nasa.gov/offices/education/centers/kennedy/technology/nasarmc.html">here</Link>.
			          	</p>

			          	<h3>Mechatronics Lab</h3>
			          	<br></br>
			          	<div className="slideshow-container">
			          		<ProjImage
					            slide={this.state.slideShow[1].slides[this.state.slideShow[1].slideIndex].image}
					            slideIndex={this.state.slideShow[1].slideIndex+1}
					            slideLen={this.state.slideShow[1].slides.length}
					            slideAlt={this.state.slideShow[1].slides[this.state.slideShow[1].slideIndex].slideAlt}
					            slideDesc={this.state.slideShow[1].slides[this.state.slideShow[1].slideIndex].slideDesc}
					        />

				            <a className="prev" onClick={() => this.plusSlides(1,-1)}>&#10094;</a>
				            <a className="next" onClick={() => this.plusSlides(1,1)}>&#10095;</a>
			          	</div>

			          	<div className="proj-img-selecter">
				            <span className="dot" onClick={() => this.currentSlide(1,0)}></span>
				            <span className="dot" onClick={() => this.currentSlide(1,1)}></span>
			          	</div>
			          	<p>
			          		I did research in the mechatronics lab focusing on mobile robot navigation. The work was mainly 
			          		with non-holonmic wheeled robots and quad-rotors. This work involved developing navigation algorithms,
			          		controllers, vision systems, wireless communication, and theoretical control systems analysis. 
			          		Particle swarm algorithms were also developed so the robots could coordinate for complex problems and
			          		still avoid collision.
				        </p>

				        <h3>NASA Image Co-Registration Challenge</h3>
			          	<br></br>
			          	<div className="slideshow-container">
			          		<ProjImage
					            slide={this.state.slideShow[2].slides[this.state.slideShow[2].slideIndex].image}
					            slideIndex={this.state.slideShow[2].slideIndex+1}
					            slideLen={this.state.slideShow[2].slides.length}
					            slideAlt={this.state.slideShow[2].slides[this.state.slideShow[2].slideIndex].slideAlt}
					            slideDesc={this.state.slideShow[2].slides[this.state.slideShow[2].slideIndex].slideDesc}
					        />

				            <a className="prev" onClick={() => this.plusSlides(2,-1)}>&#10094;</a>
				            <a className="next" onClick={() => this.plusSlides(2,1)}>&#10095;</a>
			          	</div>

			          	<div className="proj-img-selecter">
				            <span className="dot" onClick={() => this.currentSlide(2,0)}></span>
				            <span className="dot" onClick={() => this.currentSlide(2,1)}></span>
				            <span className="dot" onClick={() => this.currentSlide(2,2)}></span>
				            <span className="dot" onClick={() => this.currentSlide(2,3)}></span>
				            <span className="dot" onClick={() => this.currentSlide(2,4)}></span>
				            <span className="dot" onClick={() => this.currentSlide(2,5)}></span>
			          	</div>
			          	<p>
			          		This was a NASA challenge on Topcoder for identifying new craters from images of the moon. By comparing
			          		old images to new images from different NASA missions, computer vision is used to align
			          		the images and find new features. This challenge is difficult due to different picture angles and translations, 
			          		different camera resolutions, and pictures taken at different times of day resulting in different shadows.

			          		My approach involved aligning the images using the SIFT algorithm, Lowe's Ratio test, and a hompgraphy matrix
			          		found by the RANSAC algorithm to warp the perspective of one image to align with the other and only leave 
			          		the overlap of the two images. After this the differences of the images were found, thresholded, and contoured 
			          		to identify new features. Pruning, erosion, and inverting along the gray scale were used to filter noise and solve 
			          		issues of photos taken at different times of day. Overall the algorithm was very effective and resulted in 
			          		3rd place in the competition.
				        </p>
			        </div>
		  		</div>
      		</div>
	    );
	}
}

// ========================================
export default Projects