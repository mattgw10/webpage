function add_edges(cells, index, L, W, edge_list) {
	// Edges are bi-directional 
		// list[i]=[dest, cost]
	if (!cells[index]) {
		const x = index%W;
		const y = Math.floor(index/W);

		if (x < W-1 && !cells[index+1]) { // Add edge right
			edge_list[index].push([index+1, 1]);
			edge_list[index+1].push([index, 1]);
		}
		if (y < L-1 && !cells[index+W]) { // Add edge down
			edge_list[index].push([index+W, 1]);
			edge_list[index+W].push([index, 1]);
		}
		if (x < W-1 && y < L-1 && !cells[index+W+1]) { // Add edge diagonal down right
			edge_list[index].push([index+W+1, 1.4142]);
			edge_list[index+W+1].push([index, 1.4142]);
		}
		if (x > 0 && y < L-1 && !cells[index+W-1]) { // Add edge diagonal down left
			edge_list[index].push([index+W-1, 1.4142]);
			edge_list[index+W-1].push([index, 1.4142]);
		}
	}

	return edge_list;
}

function create_graph(cells, L, W) {
	// Create 8-way connected graph from
		// blocked cells and size
	var edge_list = [];

	for (var i=0; i<cells.length; i++) {
		edge_list.push([]);
	}

	for (var i=0; i<cells.length; i++) {
		add_edges(cells, i, L, W, edge_list);
	}

	return edge_list;
}

function extract_min(cost_array, completed) {
	var min_cost, min_index=-1;

	for (var i = 0; i < cost_array.length; i++) {
		if ((cost_array[i] < min_cost || min_index == -1) 
				&& (!completed[i]) && (cost_array[i] >= 0)) {
			min_cost = cost_array[i];
			min_index = i;
		}
	}

	return min_index;
}

export function Dijkstras(cells, L, W, start, goal) {
	// Computes least cost paths from start to goal through
		// each grid cell (8-way connected)
	const size = L*W;
  	var grid_g = Array(size).fill(-1);
  	var grid_h = Array(size).fill(-1);
  	var grid_f = Array(size).fill(-1);

  	grid_g[start] = 0;
  	grid_h[goal] = 0;

  	const edge_list = create_graph(cells, L, W);

  	var completed = Array(size).fill(false);
  	var u, v, c;

  	u = extract_min(grid_g, completed);
  	while (u >= 0) {
  		completed[u] = true;
  		for (const [index, value] of edge_list[u].entries()) {
  			v = value[0];
  			c = value[1];
			if (grid_g[v] ==  -1 ||  grid_g[v] > grid_g[u]+c) {
				grid_g[v] = grid_g[u]+c;
			}
		}

  		u = extract_min(grid_g, completed);
  	}

  	completed = Array(size).fill(false);
  	u = extract_min(grid_h, completed);
  	while (u >= 0) {
  		completed[u] = true;
  		for (const [index, value] of edge_list[u].entries()) {
  			v = value[0];
  			c = value[1];
			if (grid_h[v] ==  -1 ||  grid_h[v] > grid_h[u]+c) {
				grid_h[v] = grid_h[u]+c;
			}
		}

  		u = extract_min(grid_h, completed);
  	}
  	
  	for (var i = 0; i < size; i++) {
		if (grid_g[i] >= 0 && grid_h[i] >= 0) {
			grid_f[i] = grid_g[i]+grid_h[i];
		}
	}

  	return [grid_g, grid_h, grid_f];
 }