
/**
 * Linq-based expressions
 */
function Linq(arr) {
	if( ! (arr instanceof Array)) {
		throw Error("Argument of Linq must be an array!");
	}
	
	this.arr = arr;
}

/**
 * Executes Where statement
 */
Linq.prototype.where = function(func) {
	if(typeof func != 'function') {
		throw Error("Argument of Where must be a function!");
	}
	
	for(var i = this.arr.length - 1; i >= 0; i--) {
		if(func(this.arr[i]) == false) {
			this.arr.splice(i, 1);
		}
	}
	
	return this;
};

/**
 * Checks whether all elements match a condition
 */
Linq.prototype.all = function(func) {
	if(typeof func != 'function') {
		throw Error("Argument of All must be a function!");
	}
	
	for(var i = 0; i < this.arr.length; i++) {
		if(func(this.arr[i]) == false) {
			return false;
		}
	}
	
	return true;
}

/**
 * Checks whether any elements match a condition
 */
Linq.prototype.any = function(func) {
	if(typeof func != 'function') {
		throw Error("Argument of Any must be a function!");
	}
	
	for(var i = 0; i < this.arr.length; i++) {
		if(func(this.arr[i]) == true) {
			return true;
		}
	}
	
	return false;
}

/**
 * Returns the element with max value
 */
Linq.prototype.max = function(func) {
	if(func != null && typeof func != 'function') {
		throw Error("Argument of Max must be a function!");
	}
	
	var max = null;
	
	for(var i = 0; i < this.arr.length; i++) {
		if(func == null) {
			if(this.arr[i] > max) {
				max = this.arr[i];
			}
		} else {
			var tmp = func(this.arr[i]);
			if(tmp > max) {
				max = tmp;
			}
		}
	}
	
	return max;
}

/**
 * Returns the element with min value
 */
Linq.prototype.min = function(func) {
	if(func != null && typeof func != 'function') {
		throw Error("Argument of Min must be a function!");
	}
	
	var min = null;
	
	for(var i = 0; i < this.arr.length; i++) {
		if(func == null) {
			if(this.arr[i] < min) {
				min = this.arr[i];
			}
		} else {
			var tmp = func(this.arr[i]);
			if(tmp < min) {
				min = tmp;
			}
		}
	}
	
	return min;
}

/**
 * Sums given values
 */
Linq.prototype.sum = function(func) {
	if(typeof func != 'function') {
		throw Error("Argument of Sum must be a function!");
	}
	
	var sum = 0;
	for(var i = 0; i < this.arr.length; i++) {
		sum += func(this.arr[i]);
	}
	
	return sum;
}

// TODO: add distinct func

// TODO: add order by asc/desc func
Linq.prototype.orderByAsc = function(func) {
	if(func != null && typeof func != 'function') {
		throw Error("Argument of OrderByAsc must be a function!");
	}
	
	this.arr.sort(func);
	
	return this;
}

Linq.prototype.orderByDesc = function(func) {
	if(func != null && typeof func != 'function') {
		throw Error("Argument of OrderByDesc must be a function!");
	}
	
	if(func == null) {
		func = function() { return 1 };
	}

	this.arr.sort(func);
	
	return this;
}

// TODO: add group by func

/**
 * Returns the results
 * 
 * If you want the same elements added on the original array, call this function with no params as 
 * it will alloc new array for the values passed on `func`.
 */
Linq.prototype.select = function(func) {
	if(func != null && typeof func != 'function') {
		throw Error("Argument of Select must be a function!");
	}
	
	// select all
	if(func == null) {
		return this.arr;
	}
	
	// only select some fields
	var results = [];
	for(var i = 0; i < this.arr.length; i++) {
		results.push(func(this.arr[i]));
	}
	
	return results;
}

// Tests
var arr = [1, 2, 3, 4, 5];

var x = new Linq(arr).where(function(item) { return item > 2 }).select();
console.log(x);

var people = [ {name:'Maria', age:10}, {name:'Joao', age: 12}, {name:'Pedro', age:30} ];
var a = new Linq(people).where(function(user) { return user.age >= 12 });

// people with age >= 12
var filteredPeople = a.select();
console.log(filteredPeople);

// array of their names
var peopleNames = a.select(function(user) { return user.name });
console.log(peopleNames);

// sort asc
var sort = new Linq(arr).orderByAsc().select();
console.log(sort);

// sort desc
var sort = new Linq(arr).orderByDesc().select();
console.log(sort);

// sort asc
var sort = new Linq(people).orderByAsc(function(a, b) { return -1 }).select();
console.log(sort);

// sort desc
var sort = new Linq(people).orderByDesc(function(a, b) { return a.age > b.age }).select();
console.log(sort);
