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
        return Object.prototype.toString.call(value) === '[object String]';
    };

// typeTest() is a utility that generates type-testing predicate functions like isString():

var isString = typeTest('String'),
    isRegExp = typeTest('RegExp'),
    // ...

// [3 points] Write typeTest().
//-------------------------------------------------------------------------------------------------



// (2) --------------------------------------------------------------------------------------------
// complement() is a utility that accepts a predicate function (a function that returns true or
// false) and returns a new function that invokes the predicate function, returning its boolean
// opposite. The returned function should accept any number of arguments and should preserve the
// this context from its invocation.
//
// [3 points] Write complement().
// [+1 point] Use apply() from binding.js in your implementation.
//-------------------------------------------------------------------------------------------------



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
retrieve(function(value) {
    return value;
});

// Here, the call to retrieve() will return 25.
//
// [3 points] Write single().
//-------------------------------------------------------------------------------------------------



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



// (5) --------------------------------------------------------------------------------------------
// The data structure created by pair() can be used to represent cells in a singly-linked
// list. list() is a utility that accepts an arbitrary number of arguments and creates a
// null-terminated, singly-linked list of pairs containing the values:

list(1, 2, 3, 4);

// is equivalent to:

pair(1, pair(2, pair(3, pair(4, null))));

// [4 points] Write list().
// [+1 point] Use reduce() from iteration.js in your implementation.
//-------------------------------------------------------------------------------------------------



// (6) -------------------------------------------------------------------------------------------
// [1 point] What are the three functions pair(), first() and rest() traditionally called in the
// Lisp family of languages?
//-------------------------------------------------------------------------------------------------
