export function deepCopy(a) {
	return JSON.parse(JSON.stringify(a));
}

export function distance(a, b) {
	// Returns euclidean distance between point a and b
	return Math.pow(Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2),.5)
}

export function coord_to_grid(p, W) {
	// Return grid cell corresponding to coordinate
	const x = Math.floor(p[0]);
	const y = Math.floor(p[1]);

	return y*W+x;
}

export function goal_check(a, b, goal, goal_radius, dx) {
	// Collision check path from a to b with step dx
		// Return true on collision free
	const angle = Math.atan2(b[1]-a[1],b[0]-a[0]);
	const dist = distance(a, b);
	var checked_dist = 0;
	var p;

	while (checked_dist <= dist){
		p = [a[0]+Math.cos(angle)*checked_dist, a[1]+Math.sin(angle)*checked_dist]
		if (distance(p, goal) <= goal_radius) {
			return true;
		}
		checked_dist += dx;
	}
	return false;
}


export function collision_check(a, b, cells, W, dx) {
	// Collision check path from a to b with step dx
		// Return true on collision free
	const angle = Math.atan2(b[1]-a[1],b[0]-a[0]);
	const dist = distance(a, b);
	var checked_dist = 0;
	var p;

	while (checked_dist <= dist){
		p = [a[0]+Math.cos(angle)*checked_dist, a[1]+Math.sin(angle)*checked_dist]
		if (cells[coord_to_grid(p, W)]) {
			return false;
		}
		checked_dist += dx;
	}
	return true;
}

export function clip (value, bounds) {
	if (value < bounds[0]) {
		return bounds[0];
	} else if (value > bounds[1]) {
		return bounds[1];
	} else {
		return value;
	}
}

export function colorScale(value_array, ignore_array, enable_color) {
	// maps value array to color bar
		// green is low values -> red at high value
		// ignore array is black values
		// negative value array is white
	const max_val = Math.max(...value_array);
	var min_val = max_val;

	for (var i = 0; i < value_array.length; i++) {
		if (value_array[i] < min_val  && value_array[i] >= 0) {
			min_val = value_array[i];
		}
	}

	const color_vals = [];

	for (var i = 0; i < value_array.length; i++) {
		if (ignore_array[i]) {
			color_vals.push("0,0,0");
		} else if (value_array[i] >= 0 && enable_color) {
			color_vals.push(
				255*(value_array[i]-min_val)/(max_val-min_val) + "," +
				255*(max_val-value_array[i])/(max_val-min_val) + ",0");
		} else {
			color_vals.push("255,255,255");
		}
	}

	return color_vals;
}

