// (1) --------------------------------------------------------------------------------------------
// Functions are first-class objects in JavaScript. They can be created dynamically, be passed as
// arguments to other functions and returned from other functions. In the same way that objects
// like strings have methods like .toLowerCase(), functions have methods like .call() and
// .apply(). These methods can be used to manipulate the value of a function's this context when
// it is invoked.
//
// JavaScript has three different syntactical forms for invoking functions:

// fn(1, 2, 3);
// obj.fn(1, 2, 3);
// obj['fn'](1, 2, 3);

// // The first is the most basic and simply invokes a function without a this context, passing
// // the three arguments 1, 2 and 3. The latter two are more complicated, but they are behaviorally
// // equivalent. They invoke the function fn(), which is stored as a property of obj, setting obj as
// // the this context and passing the three arguments 1, 2 and 3.
// //
// // These three syntaxes are unified by a function's .call() method. Its first argument is the
// // this context to set up for the function call. Any additional arguments are passed through to the
// // function. Using .call(), the above example may be rewritten:

// fn.call(null, 1, 2, 3);
// obj.fn.call(obj, 1, 2, 3);
// obj['fn'].call(obj, 1, 2, 3);

// // Additionally, functions have a .apply() method that can be used to pass a this context value and
// // an arbitrary number of arguments as an array:

// fn.apply(null, [1, 2, 3]);
// obj.fn.apply(obj, [1, 2, 3]);
// obj['fn'].apply(obj, [1, 2, 3]);

// // Assume we have a utility named bind() that we pass a function and a this context value. It
// // returns a new function with the original function permanently bound to the this context. For
// // instance, we could write the second example as:

// bind(obj.fn, obj)(1, 2, 3);

// // Note that bind() is similar to functions' .bind() method from ES5. A function created by bind()
// // will ignore any this context value passed to its .call() or .apply() methods. For example, in:

// bind(obj.fn, obj).call(other, 4, 5, 6);

// // the this context in the function returned by bind() will still be obj, not other.
// //
// // For the following function:

// var fn = function() {
//         console.log(this.greeting + ', world!');
//     };

// // [2 points] Write a code snippet that invokes fn so that it logs 'Hello, World!' to the console.
// // [+1 point] Use bind() in your solution.
// //-------------------------------------------------------------------------------------------------
// bind(fn.greeting, fn)('Hello');


// (2) --------------------------------------------------------------------------------------------
// destructure() is a utility that accepts an array, a function and an optional this context. It
// returns the result of invoking the function with the array values passed as individual
// arguments. For example:

destructure(
    [7, 9],
    function(a, b) {
        console.log(
            'My name is ' +
            this.name +
            ' and I like the numbers ',
            a +
            ' and ' +
            b);
    },
    {name: 'Bob'});

// will log to the console:
//
// My name is Bob and I like the numbers 7 and 9.
//
// [3 points] Write destructure() using the function argument's .apply() method.
//-------------------------------------------------------------------------------------------------
function destructure(array, fn, context) {
    this.name = context.name;
    return fn(array[0], array[1]);
}


// (3) --------------------------------------------------------------------------------------------
// In the paradigm of functional programming, standalone functions, rather than methods bound
// to classes, are very useful. Imagine a utility lower() that accepts a string and returns the
// string in lower-case. An obvious and trivial implementation would be:

var lower = function(string) {
        return string.toLowerCase();
    };

// Under the hood, this function is really just calling the String class' .toLowerCase() method,
// which can be accessed as String.prototype.toLowerCase.
//
// [3 points] Write a version of lower() using the .call() method of String.prototype.toLowerCase.
//-------------------------------------------------------------------------------------------------
var callLower = function(value) {
    return String.prototype.toLowerCase.call(value);
}


// (4) --------------------------------------------------------------------------------------------
// Slicing arrays, and particularly, slicing arguments objects (which are array-like, but not
// actual Array instances) is very useful in writing utilty functions. slice() is a utility
// that takes an array and optional start and end indices to create a new, sliced array.
//
// [3 points] Write slice() using the .apply() method of Array.prototype.slice. Hint: you can get
// the optional start and end index arguments by calling Array.prototype.slice.call(arguments, 1).
//-------------------------------------------------------------------------------------------------
var slicer = function (arguments) {
    return (
        function() {
            return Array.prototype.slice.call(arguments, 1);
        });
}
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slicer(2));


// (5) --------------------------------------------------------------------------------------------
// The utility apply() invokes a given function with an optional this context and an array of
// arguments. For example:

apply(
    function(a, b) {
        console.log(b, a, this.value);
    },
    {value: 25},
    [17, 34]);

// will log to the console:
//
// 34 17 25
//
// [3 points] Write apply() using the .call() method of Function.prototype.apply.
//-------------------------------------------------------------------------------------------------
var apply = function(data, arguments) {
    this.value = data.value
    return Function.prototype.apply.call(data, arguments);
}


// (6) --------------------------------------------------------------------------------------------
// The utility call() invokes a given function with an optional this context and any number of
// additional arguments. For example:

call(
    function(a, b) {
        console.log(b, a, this.value);
    },
    {value: 71},
    19,
    45);

// will log to the console:
//
// 45 19 71
//
// [3 points] Write call() using the .apply() method of Function.prototype.call and slice().
//-------------------------------------------------------------------------------------------------



// (7) --------------------------------------------------------------------------------------------
// The bind() utility described in problem (1) not only permanently binds the this context for the
// new function it returns - it also "freezes" additional arguments that will always be passed to
// the bound function before any others. For example:

var fn = function(a, b, c, d) {
        console.log(a, b, c, d, this.thing);
    },
    bound = bind(fn, {thing: 41}, 8, 73);

bound(68, 90, 12, 45);

// the call to bound() will log to the console:
//
// 8 73 68 90 41
//
// since the arguments 8 and 73 are "frozen" for all invocations of bound(). The arguments 12 and
// 45 just "fall off the end" of the formal parameters a, b, c, d of fn() and are ignored.
//
// The utility bind() takes a function, a this context and an arbitrary number of additional
// arguments to "freeze" for the function it returns.
//
// [4 points] Write bind() using slice().
// [+1 point] Use apply() in your solution.
//-------------------------------------------------------------------------------------------------
