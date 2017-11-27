// (1) --------------------------------------------------------------------------------------------
// Lexical closures are a core feature of modern, functional programming languages like JavaScript
// (and Scheme, Common Lisp, Clojure, ML, OCaml, Haskell, etc.). JavaScript is arguably a
// functional programming language first, with prototypal, object-oriented features bolted on to
// help programmers from other languages bridge the conceptual gap.
//
// The first exercise in understanding closures usually involves writing a function that returns a
// function that closes around a variable created in the outer function, such as a counter. More
// generally, we can use this simple pattern to capture an argument to the outer function and do
// something useful.
//
// Consider a function isString() that returns whether a value is a String instance or
// string primitive:

var isString = function(value) {
  return Object.prototype.toString.call(value) === "[object String]";
};

// typeTest() is a utility that generates type-testing predicate functions like isString():

var isString = typeTest("String"),
  isRegExp = typeTest("RegExp");
// ...

// [3 points] Write typeTest().
//-------------------------------------------------------------------------------------------------
function typeTest(typeToCheck) {
  function compareValue(value) {
    return Object.prototype.toString.call(value) === "[object " + typeToCheck + "]";;
  }
  return compareValue;
}

// (2) --------------------------------------------------------------------------------------------
// complement() is a utility that accepts a predicate function (a function that returns true or
// false) and returns a new function that invokes the predicate function, returning its boolean
// opposite. The returned function should accept any number of arguments and should preserve the
// this context from its invocation.
//
// [3 points] Write complement().
// [+1 point] Use apply() from binding.js in your implementation.
//-------------------------------------------------------------------------------------------------
function complement (predicateFn) {
    return function () {
        return !predicateFn.apply(this, arguments);
    };
}


// (3) --------------------------------------------------------------------------------------------
// A closure can easily capture a constant value for later retrieval, e.g.:

var constant = function(value) {
  return function() {
    return value;
  };
};

// To push this concept further, imagine a similar function single() that returns a function,
// which in turn accepts another function. When the returned function is invoked, it will pass the
// function that you pass it the constant value:

var retrieve = single(25);

console.log(retrieve);
retrieve(function(value) {
  return value;
});


// Here, the call to retrieve() will return 25.
//
// [3 points] Write single().
//-------------------------------------------------------------------------------------------------
function single(value) {
    return (function() { return value; });
}

// (4) --------------------------------------------------------------------------------------------
// pair() is a function that is similar to single(), except that it captures two arguments for
// later retrieval. It also has two sibling functions, first() and rest() that accept the function
// returned by pair() in order to retrieve the first and second captured values, respectively.
// For example:

var point = pair(37, 91);
first(point) === 37;
rest(point) === 91;

// Here, the two === predicates will evaluate to true.
//
// [3 points] Write pair().
// [1 point] Write first().
// [1 point] Write rest().
//-------------------------------------------------------------------------------------------------
function pair(a, b) {
    return function() {
        return [a, b]
    };
}

function first(callback) {
    var array = callback();
    return array[0];
}

function rest(callback) {
    var array = callback();
    return array[1];
}

// (5) --------------------------------------------------------------------------------------------
// The data structure created by pair() can be used to represent cells in a singly-linked
// list. list() is a utility that accepts an arbitrary number of arguments and creates a
// null-terminated, singly-linked list of pairs containing the values:

var listResult = list(1, 2, 3, 4);
console.log(listResult);

// is equivalent to:

pair(1, pair(2, pair(3, pair(4, null))));

// [4 points] Write list().
// [+1 point] Use reduce() from iteration.js in your implementation.
//-------------------------------------------------------------------------------------------------

function list() {
    var args = Array.prototype.slice.call(arguments);
    var result;

    function next() {
        var currentNode = args.shift();

        if (args.length < 1) {
            result = pair(currentNode, null);
            return result;
        } else {
            pair(currentNode, next.apply(undefined, args));
        }
    }
    next();

    return result;
}

// (6) -------------------------------------------------------------------------------------------
// [1 point] What are the three functions pair(), first() and rest() traditionally called in the
// Lisp family of languages?
//-------------------------------------------------------------------------------------------------
// In Lisp pair() is called cons, first() is called  car, and rest() is called cdr