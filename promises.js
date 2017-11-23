// (1) --------------------------------------------------------------------------------------------
// Promises are a primary tool in modern JavaScript programming for managing multiple asynchronous
// events and callback-driven APIs. The Promises/A+ standard https://promisesaplus.com/ specifies
// the API for the behavior of a promise object. However, it does not specify how promises
// are created.
//
// Assume we have a function called defer() that creates an object with two methods, .resolve()
// and .reject(), and a .promise property that references a Promises/A+ promise object. Calling
// .resolve() with a normal value will cause the .promise object to call its .then() handlers.
// Calling .resolve() with another promise will defer calling the .promise's .then() handlers until
// the other promise resolves. Note that in Promises/A+ all .then() handlers are scheduled to run
// asynchronously, regardless of whether the promise is resolved with a normal value or a promise.
//
// when() is a utility that accepts a value or another promise and returns a promise. Essentially,
// it unifies normal values with promised values:

when(valueOrPromise).then(function(value) {
    // Do something with the value or resolved promise here.
    // ...
});


// [3 points] Write when() using defer().
//-------------------------------------------------------------------------------------------------



// (2) --------------------------------------------------------------------------------------------
// reject() is similar to when(), except that it creates a rejected promise. That is:

when(reject(reason)).then(null, function(reason) {
    // Do something with the rejection reason.
    // ...
});

// or more tersely:

reject(reason).then(null, function(reason) {
    // ...
});

// [3 points] Write reject() using defer().
//-------------------------------------------------------------------------------------------------



// (3) --------------------------------------------------------------------------------------------
// all() is a utility that accepts an array of promises and returns a new promise that will be
// resolved as an array of values once all the promises in the array have resolved. If any promise
// in the array is rejected, the promise returned by all() will be rejected immediately with the
// first rejecting promise's reason, i.e. rejection value.
//
// [3 points] Write all() using defer() and when().
// [+1 point] Use each() from iteration.js in your solution.
//-------------------------------------------------------------------------------------------------



// (4) --------------------------------------------------------------------------------------------
// series() is a utility that accepts an array of functions that return promises. It calls the
// first function and waits for its promise to resolve before calling the next function, and so on,
// i.e. "in series." It returns a new promise that will resolve to an array of the resolved
// promise results. Similarly to all(), series() will reject its returned promise with the first
// rejecting promise's reason.
//
// [4 points] Write series() using when().
// [+1 point] Use reduce() from iteration.js in your solution.
//-------------------------------------------------------------------------------------------------
