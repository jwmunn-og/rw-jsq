// (1) --------------------------------------------------------------------------------------------
// Object-oriented JavaScript uses prototypal inheritance. Constructor functions own a prototype
// object which contains methods and other properties that are inherited by object instances.
// Instances are created by invoking a constructor with the new operator.
//
// Consider the following prototypal class implementation:

var Human = function(first, last) {
        this.first = first;
        this.last = last;
    };

Human.prototype.name = function() {
    return this.first + ' ' + this.last;
};

// [3 points] Write a code snippet to modify the Human prototype with a .greeting() method that
// uses the .name() method to return a greeting as a string.
//-------------------------------------------------------------------------------------------------
Human.prototype.greeting = function() {
    return 'Hi ' + this.name();
}

// (2) --------------------------------------------------------------------------------------------
// create() is a simplified version of ES5's Object.create(). It accepts a prototype object from
// a base class' constructor to create the prototype for a subclass. It does not support
// Object.create()'s properties argument (the second argument). This utility helps to solve the
// problem where the base class constructor takes arguments. For instance, consider writing the
// Human class as a subclass of the Animal class:

var Animal = function(gender) {
        this.gender = gender;
    },
    Human = function(gender, first, last) {
        Animal.call(this, gender);
        this.first = first;
        this.last = last;
    };

Human.prototype = new Animal();
Human.prototype.constructor = Human;

// Note that we've called the Animal() constructor with the new operator to create the Human class'
// prototype, and that we've called it again inside the Human() constructor. It's inefficient to
// call the Animal() constructor twice, and it may also cause an error if Animal() has
// required arguments.
//
// create() solves this problem by attaching a prototype object to an empty constructor function
// and returning a new instance of it. This allows us to create the Human class' prototype cleanly
// without a redundant call to the Animal() constructor:

Human.prototype = create(Animal.prototype);

// [3 points] Write create().
//-------------------------------------------------------------------------------------------------
function create(proto) {
    var prototypeOne = proto;
    prototypeOne = new Animal();
    prototypeOne.constructor = Human;
}


// (3) --------------------------------------------------------------------------------------------
// declare() is a utility for creating prototypal classes in a single function call rather than a
// series of imperative statements. It takes a base class (optionally null to imply Object), a
// constructor function and an object with methods and properties for its prototype. For example,
// the Human class from above might look like:

var Human = (
        declare(
            Animal,
            function(gender, first, last) {
                // ...
            },
            {
                name: function() {
                    // ...
                    return this.first + ' ' + this.last;
                },
                greeting: function() {
                    // ...
                    return 'Hi ' + this.name();
                }
            }));

// This call should set up the Human class so that it inherits from Animal, uses the given
// constructor function and has the .name() and .greeting() methods on its prototype.
//
// Write declare() using create().
// [3 points] Write declare()
// [+1 point] Use create() in your implementation.
// [+1 point] Use extend() from iteration.js in your implementation.
//-------------------------------------------------------------------------------------------------
// Failed attempt:
// function declare (proto, callbackOne, constructorTwo) {
//     console.log('Invoking declare()');
//     console.log(callbackOne.toString);

    // callbackOne (gender, first, last) {
    //     var newHuman = new proto(gender);
    //     newHuman.constructor = Human(first, last);
    //     return newHuman;
    // };
    // console.log(newHuman);
    // return newHuman;
}

// console.log(Human.gender, Human.name);


// (4) --------------------------------------------------------------------------------------------
// Assume the Human class has .name() and .greeting() methods as in problem 1.
//
// [3 points] Write a subclass of Human named ChattyHuman that also implements .greeting() by
// calling Human's .greeting() method and modifying its result with a longer string.
// [+1 point] Use declare() in your solution.
//-------------------------------------------------------------------------------------------------