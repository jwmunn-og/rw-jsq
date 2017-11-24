// (1) --------------------------------------------------------------------------------------------
// keys() is a utility that returns an array of the property names owned by an object, that is,
// properties for which an object's .hasOwnProperty() method returns true for a given name. In ES5,
// this is the function Object.keys(). For example:

keys({a: 1, b: 2, c: 3});

// will return the array ['a', 'b', 'c'], where the elements may appear in an arbitrary order.
//
// [3 points] Write keys() without using Object.keys() from ES5.
//-------------------------------------------------------------------------------------------------
function keys (object) {
    const keysArray = [];
    for (var key in object) {
        keysArray.push(key);
    }
    return console.log(keysArray);
}


// (2) --------------------------------------------------------------------------------------------
// each() is a utility that accepts an array and a function. For each value in the array, it calls
// the function with the value, the iteration variable and a reference to the original array.
// For example:

each(['a', 'b', 'c'], function(value, i, array) {
    console.log(value, i);
});

// will log to the console:
//
// a 0
// b 1
// c 2
//
// [3 points] Write each() using a for loop.
//-------------------------------------------------------------------------------------------------
function each(array, callback) {
    for (var i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}


// (3) --------------------------------------------------------------------------------------------
// reduce() is a utility that operates on each value in an array to produce a single, accumulated
// output value. It passes four values to its iteration function, the accumulator value, a value
// from the array, the iteration variable and a reference to the original array. On the first
// iteration, the third argument to reduce() will be passed as the accumulator value. On subsequent
// iterations, the return value from the previous iteration function call will be passed as the
// accumulator, and so on. Finally, the result of the last iteration function call will
// be returned.
//
// As an example, a noisy sum() function that adds the numbers in an array can be written
// with reduce():

var sum = function(numbers) {
        return (
            reduce(
                numbers,
                function(sum, number, i, array) {
                    console.log(sum, number, i);
                    return sum + number;
                },
                0));
    };

// The call:
console.log('Begin Reduce');
sum([7, 12, 8]);

// will return 27 and log to the console:
//
// 0 7 0
// 7 12 1
// 19 8 2
//
// [3 points] Write reduce().
// [+1 point] Use each() in your implementation.
//-------------------------------------------------------------------------------------------------

// Without using each()
function reduce(array, callback, accumulator) {
    var calc = accumulator;
    for (var i = 0; i < array.length; i++) {
        calc = callback(calc, array[i], i, array);
    }
    console.log(calc);
    return calc;
}


// (4) --------------------------------------------------------------------------------------------
// filter() is a utility that accepts an array and a predicate function to call for each value in
// the array in order to produce a new copy of the array with certain values filtered out. Only
// values for which the predicate returns a truthy value should be copied into the new array. The
// predicate function should also be passed the iteration variable and a reference to the array,
// similar to the other iteration utilities. For example:
console.log('Begin Filter');
filter([7, 13, 8, 11, 12, 16], function(value, i, array) {
    console.log(value, i);
    return value % 2 === 0;
});

// will filter out odd numbers, returning the array [8, 12, 16] and logging to the console:
//
// 7 0
// 13 1
// 8 2
// 11 3
// 12 4
// 16 5
//
// [3 points] Write filter().
// [+1 point] Use reduce() in your implementation.
//-------------------------------------------------------------------------------------------------
// placeholder function to prevent output errors
function filter (array, callback) {
    var filteredArray = []
    for (var i = 0; i < array.length; i++) {
        callback(array[i], i, array) ? filteredArray.push(array[i]) : '';
    }
    console.log(filteredArray);
    return filteredArray;
}



// (5) --------------------------------------------------------------------------------------------
// extend() is a utility that copies owned properties from any number of source objects into a
// destination object. It processes arguments from left-to-right so that a conflicting property in
// the right-most argument takes precedence. For example:

extend(
    {a: 1, b: 2, c: 3},
    {a: 19},
    {b: 31, c: 42},
    {a: 7},
    {c: 12});

// will return {a: 7, b: 31, c: 12}. The first argument (the destination) will be changed to
// reflect these new values.
//
// Hint: to get all of the source objects after the first destination object argument, use
// Array.prototype.slice.call(arguments, 1).
//
// [5 points] Write extend().
// [+1 point] Use keys() in your implementation.
// [+2 points] Use nested calls to reduce() in your implementation.
//-------------------------------------------------------------------------------------------------
function extend(data) {
    return;
}