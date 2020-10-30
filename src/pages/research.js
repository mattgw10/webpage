import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import '../styles/rrt.css';
import { Link } from "gatsby"

import { Dijkstras } from '../components/dijkstras'
import { deepCopy, distance, coord_to_grid,
		collision_check, clip, colorScale, goal_check } from '../components/functions'
import PaperFile from "../assets/paper.pdf"
import ThesisFile from "../assets/thesis.pdf"
import ControllerImg from "../images/controller_diagram_w_shared.png"
import PlanningImg from "../images/rrt_bugtrap_path.png"

var L = 10;
var W = 10;
var grid_size = L*W;
var cell_width = 34;
var v_start = [3.5, 5];
var v_start_i = [3.5, 5];
var goal = [6.5, 6];
var goal_i = [6.5, 6];
var dx = 0.05;
var dt = 0.05; // integration time
var deltaT = .1; // control time step
var goal_radius = .3;
var blossom = 50;

var vehicle = false; // true for random point, false for dynamic car

// car control limits
var a_bounds = [-1, 1]; // Acceleration forward/backward
var w_bounds = [-.5, .5]; // Rotational velocity
var v_bounds = [1, 1]; // Can reverse
var T_bounds = [1, 10];

class InitialPosition extends React.Component {
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };

  handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };


  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
    this.props.handleStart();
  };

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
    if (this.props.isStart){
    	v_start = [v_start_i[0]+this.state.deltaPosition.x/cell_width, 
  			v_start_i[1]+this.state.deltaPosition.y/cell_width];
    } else {
    	goal = [goal_i[0]+this.state.deltaPosition.x/cell_width, 
  			goal_i[1]+this.state.deltaPosition.y/cell_width];
    }
    this.props.handleStop();
  };

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;
    return (
        <Draggable onDrag={this.handleDrag} {...dragHandlers}
        	defaultPosition={{x: (this.props.isStart ? v_start_i[0]: goal_i[0])
        				*cell_width-goal_radius*cell_width, 
	    		y: (-L+(this.props.isStart ? v_start_i[1]: goal_i[1]))
	    				*cell_width-goal_radius*cell_width}}
	    	bounds={{left: 0, 
	    		top: -L*cell_width, 
	    		right: W*cell_width-2*goal_radius*cell_width, 
	    		bottom: -2*goal_radius*cell_width}}
        >	
          	<svg className="draggable-points" width={2*goal_radius*cell_width} height={2*goal_radius*cell_width}>
	    		<circle
	    			cx={goal_radius*cell_width}
	    			cy={goal_radius*cell_width}
	    			r={goal_radius*cell_width}
	    			fill={this.props.color}
	    		/>
	  		</svg>
        </Draggable>
    );
  }
}

class Trajectory extends React.Component {
	// Draws lines of planning tree
  	render() {
  		var path_coords = ""

  		if (vehicle) {
	  		for (const [index, value] of this.props.parents.entries()) {
	  			path_coords = path_coords +
		        	"M " + this.props.vertices[value][0]*cell_width + " " + 
		        		this.props.vertices[value][1]*cell_width + " " +
		        	"L " + this.props.vertices[index][0]*cell_width + " " + 
	  					this.props.vertices[index][1]*cell_width + " " 
			}
		} else {
			for (const [index, value] of this.props.parents.entries()) {
				for (var i = 0; i < this.props.tree[index].points.length; i++) {
					if (this.props.tree[index].points[i+1]){
			  			path_coords = path_coords +
			  				"M " + this.props.tree[index].points[i][0]*cell_width + " " + 
				        		this.props.tree[index].points[i][1]*cell_width + " " +
				        	"L " + this.props.tree[index].points[i+1][0]*cell_width + " " + 
			  					this.props.tree[index].points[i+1][1]*cell_width + " "
		  			}
	  			}
	  		} 
		}

	    return (
	    	<path class="line" stroke="black" 
	        	d={path_coords}/>
	    );
  	}
}


function GridCell(props) {
	// Renders grid cell button which switches between blocked and unblocked
  	return (
	    <button 
	    	className="gridCell"
	    	style={{backgroundColor: "rgb(" + props.color + ")"}}
	    	onClick={props.onClick}>
	    </button>
  	);
}

class Grid extends React.Component {
	// Creates grid of specified length and width
	renderGridCell(i) {
		return (
			<GridCell
				color={this.props.color[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

  	render() {
  		const rows = Array(L).fill(null);
  		const columns = Array(W).fill(null);

  		const items = []

  		for (const [index, value] of rows.entries()) {
  			const subItems = []
  			for (const [subIndex, subValue] of columns.entries()) {
  				subItems.push(this.renderGridCell(index*W+subIndex))
  			}
			items.push(<div className="cell-row" 
				style={{minWidth:W*cell_width+"px"}}>{subItems}</div>)
		}
	    return (
	    	<div>
		    	{items}
	      	</div>
	    );
  	}
}



function random_car_control() {
	const control = {
		a: a_bounds[0]+Math.random() * (a_bounds[1]-a_bounds[0]),
	  	w: w_bounds[0]+Math.random() * (w_bounds[1]-w_bounds[0]),
	  	T: Math.round(T_bounds[0]+Math.random() * (T_bounds[1]-T_bounds[0]),0)
  	}
  	return control
}

function forward_simulate_car(c, s, cells) {
	// Forward simulate car dynamics with control c and initial state s
		// c = a (forward acceleration), w (steering velocity), T (no. time steps)
		// s = p=[x, y], v, theta, cost
	var s_new=deepCopy(s), s_last, phi;
	var c_step=1, c_time, collision_free=true, goal_found=false;

	s_new.control = c;
	s_new.points = [s.p];

	// For number of time steps unless collision
	while ((c_step <= c.T) && (collision_free)) {
		c_time = 0;
		// Integrate state for time step
		while ((c_time < deltaT) && (collision_free)) {
			s_last = deepCopy(s_new);

			s_new.v = clip(s_new.v+c.a*dt, v_bounds);
			s_new.theta += c.w*dt;

			phi = s_new.v*Math.tan(s_new.theta);

			s_new.p[0] += Math.cos(phi)*s_new.v*dt;
			s_new.p[1] += Math.sin(phi)*s_new.v*dt;

			s_new.points.push([s_new.p[0], s_new.p[1]])

			collision_free=collision_check(s_last.p, s_new.p, cells, W, dx);
			s_new.cost += distance(s_last.p, s_new.p)

			// Check bounds
			if (s_new.p[0] > W || s_new.p[0] < 0 || s_new.p[1] > L || s_new.p[1] < 0) {
				collision_free=false;
			}

			// Check if goal
			if (distance(s_new.p, goal) <= goal_radius) {
				goal_found=true;
			}

			c_time += dt;
		}
		c_step += 1;
	}

	return [s_new, collision_free, goal_found];
}

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: Array(grid_size).fill(false),
			grid_vals: Dijkstras(Array(grid_size).fill(false), L, W, 
				coord_to_grid(v_start, W), 
				coord_to_grid(goal, W)),
			RRT_vertices: [v_start],
			RRT_parents: [0],
			RRT_g: [0],
			RRT_failures: 0,
			RRT_solution_cost: null,
			RRT_tree: [{
				p: v_start,
				v: 0,
				theta: 0,
				cost: 0,
				control: {
					a: 0,
				  	w: 0,
				  	T: 0
			  	},
			  	points: []
			}],
			RIOT_vertices: [v_start],
			RIOT_parents: [0],
			RIOT_propagations: [blossom],
			RIOT_g: [0],
			RIOT_failures: 0,
			RIOT_greedy: true,
			RIOT_pruned: 0,
			RIOT_solution_cost: null,
			RIOT_tree: [{
				p: v_start,
				v: 0,
				theta: 0,
				cost: 0,
				control: {
					a: 0,
				  	w: 0,
				  	T: 0
			  	},
			  	points: []
			}]
		};
	}

	resetPlanning() {
		this.setState({
			RRT_parents: [0],
			RIOT_propagations: [blossom],
			RRT_g: [0],
			RRT_failures: 0,
			RRT_solution_cost: null,
			RIOT_parents: [0],
			RIOT_g: [0],
			RIOT_failures: 0,
			RIOT_greedy: true,
			RIOT_solution_cost: null
		});
	}

	setInitial() {
		this.setState({
			grid_vals: Dijkstras(this.state.cells, L, W, 
				coord_to_grid(v_start, W), 
				coord_to_grid(goal, W)),
			RRT_vertices: [v_start],
			RRT_tree: [{
				p: v_start,
				v: 0,
				theta: 0,
				cost: 0,
				control: {
					a: 0,
				  	w: 0,
				  	T: 0
			  	},
			  	points: []
			}],
			RIOT_vertices: [v_start],
			RIOT_tree: [{
				p: v_start,
				v: 0,
				theta: 0,
				cost: 0,
				control: {
					a: 0,
				  	w: 0,
				  	T: 0
			  	},
			  	points: []
			}]
		});
	}

	handleClick(i) {
		const cells = this.state.cells.slice();
		cells[i] = !this.state.cells[i];

		this.setState({
			cells: cells,
			grid_vals: Dijkstras(cells, L, W, 
				coord_to_grid(v_start, W), 
				coord_to_grid(goal, W)),
			RRT_vertices: [v_start],
			RRT_parents: [0],
			RRT_g: [0],
			RRT_failures: 0,
			RRT_solution_cost: null,
			RRT_tree: [{
				p: v_start,
				v: 0,
				theta: 0,
				cost: 0,
				control: {
					a: 0,
				  	w: 0,
				  	T: 0
			  	},
			  	points: []
			}],
			RIOT_vertices: [v_start],
			RIOT_parents: [0],
			RIOT_propagations: [blossom],
			RIOT_g: [0],
			RIOT_failures: 0,
			RIOT_greedy: true,
			RIOT_solution_cost: null,
			RIOT_pruned: 0,
			RIOT_tree: [{
				p: v_start,
				v: 0,
				theta: 0,
				cost: 0,
				control: {
					a: 0,
				  	w: 0,
				  	T: 0
			  	},
			  	points: []
			}]
		});
	}

	extendRIOTcar(num_extensions) {
		var tree = this.state.RIOT_tree.slice();
		const parents = this.state.RIOT_parents.slice();
		const propagations = this.state.RIOT_propagations.slice();
		const grid_vals = this.state.grid_vals;
		var sample, p, dist, dist_max;
		var solution_cost = this.state.RIOT_solution_cost;
		var failures = this.state.RIOT_failures;
		var greedy = this.state.RIOT_greedy;
		var pruned = this.state.RIOT_pruned;
		var s_new, s_ext, s_best, extended, region, best_region,
			collision_free, goal_found;

		// Make num_extensions attempts at growing
		for (var n = 1; n <= num_extensions; n++){
			if (greedy) {		// Greedily select newest vertex
				p = parents.length-1;
			} else {			// Sample randomly and select nearest
				sample = [Math.random() * (L), Math.random() * (W)];
				dist_max = L+W;

				for (var i = 0; i < parents.length; i++) {
					dist = distance(sample, tree[i].p)
		  			if (dist < dist_max){
		  				dist_max = dist;
		  				p = i;
		  			}
				}
			}

			// Extend from selected vertex
			s_ext = deepCopy(tree[p]);
			extended = false;
			greedy = false;
			for (var b = 1; b <= propagations[p]; b++){		// Blossom mutliple random controls
				[s_new, collision_free, goal_found] = forward_simulate_car(
					random_car_control(),  
					s_ext, 
					this.state.cells);
				if (collision_free){				// If collision free pick best
					region = coord_to_grid(s_new.p, W);
					if (!extended ||
						grid_vals[2][region] < grid_vals[2][best_region] ||
						(grid_vals[2][region] == grid_vals[2][best_region] &&
							grid_vals[1][region] < grid_vals[1][best_region]) ||
						(grid_vals[2][region] == grid_vals[2][best_region] &&
							grid_vals[1][region] == grid_vals[1][best_region] && 
								s_new.cost+distance(s_new.p, goal) < 
								s_best.cost+distance(s_best.p, goal))) {
						s_best = deepCopy(s_new);
						best_region = region;
						extended = true;
					}
				}
			}
			propagations[p] = 1;

			// If expansion was successful add to tree
			if (extended) {
				if (solution_cost && s_best.cost+distance(s_best.p, goal) >= solution_cost) {
					pruned += 1;
				} else {
					// Determine greedy selection
					if (grid_vals[1][coord_to_grid(s_best.p, W)] < 
							grid_vals[1][coord_to_grid(s_ext.p, W)] || 
						(grid_vals[1][coord_to_grid(s_best.p, W)] == 
							grid_vals[1][coord_to_grid(s_ext.p, W)] &&
						distance(s_best.p, goal) < distance(s_ext.p, goal))) {
						greedy = true;
					}
					tree.push(s_best);
					parents.push(p);
					propagations.push(blossom);
					if (goal_found && 
						(!solution_cost || s_best.cost < solution_cost)){
						solution_cost = s_best.cost;
					}
				}
			} else {
				failures += 1;
			}
		}
		this.setState({
			RIOT_tree: tree,
			RIOT_parents: parents,
			RIOT_propagations: propagations,
			RIOT_failures: failures,
			RIOT_greedy: greedy,
			RIOT_solution_cost: solution_cost,
			RIOT_pruned: pruned
		});
	}

	extendRRTcar(num_extensions) {
		var tree = this.state.RRT_tree.slice();
		const parents = this.state.RRT_parents.slice();
		var sample, p, dist, dist_max;
		var solution_cost = this.state.RRT_solution_cost;
		var failures = this.state.RRT_failures;
		var s_new, s_ext, s_best, extended, collision_free, goal_found;

		for (var n = 1; n <= num_extensions; n++){
			sample = [Math.random() * (L), Math.random() * (W)];
			dist_max = L+W;

			for (var i = 0; i < parents.length; i++) {
				dist = distance(sample, tree[i].p)
	  			if (dist < dist_max){
	  				dist_max = dist;
	  				p = i;
	  			}
			}
			
			// Extend from selected vertex
			s_ext = deepCopy(tree[p]);
			extended = false;
			for (var b = 1; b <= 1; b++){			// Blossom mutliple random controls (disabled)
				[s_new, collision_free, goal_found] = forward_simulate_car(
					random_car_control(),  
					s_ext, 
					this.state.cells);
				if (collision_free){				// If collision free pick closest to sample
					if (!extended ||
						distance(s_new.p, sample) < distance(s_best.p, sample)) {
						s_best = deepCopy(s_new);
						extended = true;
					}
				}
			}

			if (extended) {
				tree.push(s_best);
				parents.push(p)
				if (goal_found && 
					(!solution_cost || s_best.cost < solution_cost)){
					solution_cost = s_best.cost;
				}
			} else {
				failures += 1;
			}
		}
		this.setState({
			RRT_tree: tree,
			RRT_parents: parents,
			RRT_failures: failures,
			RRT_solution_cost: solution_cost
		});
	}

	extendRIOT(num_extensions) {
		const vertices = this.state.RIOT_vertices.slice();
		const parents = this.state.RIOT_parents.slice();
		const propagations = this.state.RIOT_propagations.slice();
		const grid_vals = this.state.grid_vals;
		const g = this.state.RIOT_g.slice();
		var sample, p, dist, dist_max;
		var failures = this.state.RIOT_failures;
		var greedy = this.state.RIOT_greedy;
		var pruned = this.state.RIOT_pruned;
		var solution_cost = this.state.RIOT_solution_cost;
		var s_best, extended, region, best_region,
			collision_free, goal_found;

		for (var n = 1; n <= num_extensions; n++){
			if (greedy ==  true) {		// Greedily select newest vertex
				p = parents.length-1;
			} else {
				sample = [Math.random() * (L), Math.random() * (W)];
				dist_max = L+W;

				for (var i = 0; i < vertices.length; i++) {
					dist = distance(sample, vertices[i])
		  			if (dist < dist_max){
		  				dist_max = dist;
		  				p = i;
		  			}
				}
			}

			greedy = false;
			extended = false;
			for (var b = 1; b <= propagations[p]; b++){
				sample = [Math.random() * (L), Math.random() * (W)];
				if (collision_check(vertices[p], sample, this.state.cells, W, dx)) {
					region = coord_to_grid(sample, W);
					if (!extended || 
						grid_vals[2][region] < grid_vals[2][best_region] ||
						(grid_vals[2][region] == grid_vals[2][best_region] &&
							grid_vals[1][region] < grid_vals[1][best_region]) ||
						(grid_vals[2][region] == grid_vals[2][best_region] &&
							grid_vals[1][region] == grid_vals[1][best_region] && 
								distance(sample, vertices[p]) + distance(sample, goal) < 
								distance(s_best, vertices[p]) + distance(s_best, goal))) {
						s_best = deepCopy(sample);
						best_region = deepCopy(region);
						extended = true;
					}
				}
			}
			propagations[p] = 1;

			if (extended) {
				if (solution_cost && g[p]+distance(s_best, vertices[p])
						+distance(s_best, goal) >= solution_cost) {
					pruned += 1;
				} else {
					// Determine greedy selection
					if (grid_vals[1][coord_to_grid(s_best, W)] < 
							grid_vals[1][coord_to_grid(vertices[p], W)] || 
						(grid_vals[1][coord_to_grid(s_best, W)] == 
							grid_vals[1][coord_to_grid(vertices[p], W)] &&
						distance(s_best, goal) < distance(vertices[p], goal))) {
						greedy = true;
					}
					vertices.push(s_best);
					parents.push(p);
					propagations.push(blossom);
					g.push(g[p]+distance(s_best, vertices[p]))
					if (goal_check(s_best, vertices[p], goal, goal_radius, dx) && 
						(!solution_cost || g[p]+distance(s_best, vertices[p]) < solution_cost)){
						solution_cost = g[p]+distance(s_best, vertices[p])
					}
				}
			} else {
				failures += 1;
			}
		}

		this.setState({
			RIOT_vertices: vertices,
			RIOT_parents: parents,
			RIOT_propagations: propagations,
			RIOT_g: g,
			RIOT_failures: failures,
			RIOT_greedy: greedy,
			RIOT_solution_cost: solution_cost,
			RIOT_pruned: pruned
		});
	}

	extendRRT(num_extensions) {
		const vertices = this.state.RRT_vertices.slice();
		const parents = this.state.RRT_parents.slice();
		const g = this.state.RRT_g.slice();
		var sample, p, dist, dist_max;
		var failures = this.state.RRT_failures;
		var solution_cost = this.state.RRT_solution_cost;

		for (var n = 1; n <= num_extensions; n++){
			sample = [Math.random() * (L), Math.random() * (W)];
			dist_max = L+W;

			for (var i = 0; i < vertices.length; i++) {
				dist = distance(sample, vertices[i])
	  			if (dist < dist_max){
	  				dist_max = dist;
	  				p = i;
	  			}
			}

			if (collision_check(vertices[p], sample, this.state.cells, W, dx)) {
				vertices.push(sample)
				parents.push(p)
				g.push(g[p]+dist_max)
				if (goal_check(sample, vertices[p], goal, goal_radius, dx) && 
					(!solution_cost || g[p]+dist_max < solution_cost)){
					solution_cost = g[p]+dist_max
				}
			} else {
				failures += 1;
			}
		}

		this.setState({
			RRT_vertices: vertices,
			RRT_parents: parents,
			RRT_g: g,
			RRT_failures: failures,
			RRT_solution_cost: solution_cost
		});
	}

	render() {
	    return (
	    	<div>
	    		<div className="sidenav">
					<Link to="../">Home</Link>
					<Link to="../research">Research</Link>
					<Link to="../projects">Projects</Link>
					<Link to="../experience">Experience</Link>
				</div>
	    		<div className="main">
		    		<h1>Research</h1>
		    		<h3>Anytime Kinodynamic Motion Planning Using Region-Guided Search</h3>
		    		<p>
		    			This is a demo of my kinodynamic any-time motion planning algorithm which I published in IROS 2020.
		    			The algorithm uses heuristic graph search methods to guide sampling-based motion planning which converges
		    			to optimal solutions without requiring a steering function. The algorithm (Region Informed Optimal Trees or RIOT)
		    			has been shown to be more efficient than other state-of-the-art kinodynamic motion planners through 
		    			a variety of experiments.
		    			The full paper is &nbsp;<Link to={PaperFile}>here</Link>. The code for the algorithm can be found at
		    			&nbsp;<Link to="https://github.com/mattgw10/RIOT">my github</Link> in C++.
		    		</p><br></br>
		    		<p>
		    			This is an interactive demo of RIOT for a dynamic model of a car with no steering function. 
		    			The red circle represents the start location and the green circle represents the goal location, 
		    			both can be dragged anywhere within the top grid which sets the problem. The grid cells can also be 
		    			clicked in the top grid to switch them between blocked (obstacles) and unblocked.
		    		</p><br></br>
		    		<p>
		    			The bottom grids show a comparison between RIOT and RRT. Clicking "extend" or "extend x 50" makes
		    			one or fifty expansion attempts respectivley for an algorithm. The color gradient of the RIOT grid shows
		    			the abstraction guidance with green being expected low cost areas.
		    		</p><br></br>
		    		
		    		
		    		<div className="master-grid"
		    			style={{paddingLeft:.55*W*cell_width+"px"}}
		    		>
				        <Grid
				            onClick={i => this.handleClick(i)}
				            color={colorScale(this.state.grid_vals[2], 
		            				this.state.cells, 
		            				false)
					        }
				        />
				        <InitialPosition
				        	isStart={true}
				        	color="red"
				        	handleStart={() => this.resetPlanning()}
				        	handleStop={() => this.setInitial()}
				        />
				        <InitialPosition
				        	isStart={false}
				        	color="green"
				        	handleStart={() => this.resetPlanning()}
				        	handleStop={() => this.setInitial()}
				        />
			      	</div>
			      	<div style={{minHeight:cell_width+"px"}}></div>
			    	<div class="search">
			    		<div className="RRT">
					      	<div className="search-grid">
						        <Grid
					            	onClick={() => {return false}}
					            	color={colorScale(this.state.grid_vals[2], 
			            				this.state.cells, 
			            				false)
					            	}
						        />
					      	</div>
					      	<svg class="search-lines" height={L*cell_width} width={W*cell_width}>
				        		<Trajectory
				        			vertices={this.state.RRT_vertices}
				        			tree={this.state.RRT_tree}
				        			parents={this.state.RRT_parents}
				        		/>
				        		<circle 
				        			cx={v_start[0]*cell_width}
				        			cy={v_start[1]*cell_width}
				        			r={goal_radius*cell_width}
				        			fill="red"
				        		/>
				        		<circle 
				        			cx={goal[0]*cell_width}
				        			cy={goal[1]*cell_width}
				        			r={goal_radius*cell_width}
				        			fill="green"
				        		/>
				      		</svg>
				      		<div className="search-info">
				      			<button onClick={() => (vehicle ? this.extendRRT(1): 
				      					this.extendRRTcar(1))}>Extend RRT</button>
				      			<button onClick={() => (vehicle ? this.extendRRT(50): 
				      					this.extendRRTcar(50))}>Extend RRT x50</button>
				      			<p>Start = [{v_start[0].toFixed(4)}, {v_start[1].toFixed(4)}]</p>
				      			<p>Goal = [{goal[0].toFixed(4)}, {goal[1].toFixed(4)}]</p>
				      			<p>Vertices: {this.state.RRT_parents.length}</p>
				      			<p>Failures: {this.state.RRT_failures}</p>
				      			<p>{this.state.RRT_solution_cost ? 
				      				"Solution Cost: " + this.state.RRT_solution_cost : ""}
				      			</p>
				      		</div>
			      		</div>
			      		<div style={{minWidth:cell_width+"px"}}></div>
			      		<div className="RIOT">
					      	<div className="search-grid">
						        <Grid
					            	onClick={() => {return false}}
					            	color={colorScale(this.state.grid_vals[2], 
				            				this.state.cells, 
				            				true)
					            	}
						        />
					      	</div>
					      	<svg class="search-lines" height={L*cell_width} width={W*cell_width}>
				        		<Trajectory
				        			vertices={this.state.RIOT_vertices}
				        			tree={this.state.RIOT_tree}
				        			parents={this.state.RIOT_parents}
				        		/>
				        		<circle 
				        			cx={v_start[0]*cell_width}
				        			cy={v_start[1]*cell_width}
				        			r={goal_radius*cell_width}
				        			fill="red"
				        		/>
				        		<circle 
				        			cx={goal[0]*cell_width}
				        			cy={goal[1]*cell_width}
				        			r={goal_radius*cell_width}
				        			fill="green"
				        		/>
				      		</svg>
				      		<div className="search-info">
				      			<button onClick={() => (vehicle ? this.extendRIOT(1): 
				      					this.extendRIOTcar(1))}>Extend RIOT</button>
				      			<button onClick={() => (vehicle ? this.extendRIOT(50): 
				      					this.extendRIOTcar(50))}>Extend RIOT x50</button>
				      			<p>Start = [{v_start[0].toFixed(4)}, {v_start[1].toFixed(4)}]</p>
				      			<p>Goal = [{goal[0].toFixed(4)}, {goal[1].toFixed(4)}]</p>
				      			<p>Vertices: {this.state.RIOT_parents.length}</p>
				      			<p>Failures: {this.state.RIOT_failures}</p>
				      			<p>Pruned: {this.state.RIOT_pruned}</p>
				      			<p>{this.state.RIOT_solution_cost ? 
				      				"Solution Cost: " + this.state.RIOT_solution_cost : ""}
				      			</p>
				      		</div>
			      		</div>
		      		</div>
		      		<div className="research">
			      		<br></br>
			      		<br></br>
			      		<p>
			      			Here are some more video examples of the RIOT algorithm implemented in Unreal Engine 4:
			      		</p>
			      		<p><Link to="https://www.youtube.com/watch?v=QO-SgRDhqgQ">Dynamic cube in house</Link></p>
			      		<p><Link to="https://www.youtube.com/watch?v=OmqJECw3iE4">5-link dynamic manipulator uncurling</Link></p>
			      		<p><Link to="https://www.youtube.com/watch?v=X8vfnAae7-4">2-link dynamic manipulator pushing ball</Link></p>
			      		<p><Link to="https://www.youtube.com/watch?v=4jI5YraRkMg">5-link dynamic manipulator wrapped around wall</Link></p>
	      			</div>
	      			<br></br>
		      		<br></br>

	      			<h3>Shared Control for Mobile Robot Obstacle Avoidance</h3>
	      			<p>
	      				My thesis work was developing shared control methods to guarantee obstacle avoidance
	      				in complex systems with disturbance and saturation. The method is shown to be adaptable and and work
	      				in implementation. The full paper is &nbsp;<Link to={ThesisFile}>here</Link>.
	      			</p>
	      			<div className="research">
		      			<br></br>
		      			<p>
		      				This is the basic controller diagram for the switched shared control used in this research.
		      			</p>
		      			<img src={ControllerImg} alt="Image of shared controller"></img>
		      			<p>
		      				This is an example simulation of the shared control where RRT is used to plan an initial path
		      				and the shared control avoids dynamic obstacles along the way.
		      			</p>
		      			<img src={PlanningImg} alt="Image of shared control simulation"></img>
	      			</div>
	      		</div>
      		</div>
	    );
	 }
}


// ========================================
export default Search