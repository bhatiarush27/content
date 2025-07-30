// Polyfill for Promise to handle asynchronous and synchronous operations
// This is a basic implementation of a Promise-like object to help understand how Promises work under the hood.


// Q1. What does resolve and reject handlers do?
// A resolve handler is a function that is called when the promise is fulfilled.
// A reject handler is a function that is called when the promise is rejected.

// Q2. What is the purpose of the isFulfilled, isRejected, and isCalled flags?
// A isFulfilled flag is used to track if the promise is fulfilled.
// A isRejected flag is used to track if the promise is rejected.
// A isCalled flag is used to ensure that handlers are called only once.

// Q3. What is the purpose of the then and catch methods?
// A then method is used to set a callback for when the promise is resolved.
// A catch method is used to set a callback for when the promise is rejected.

// Q4. What is the purpose of the executor function?
// A executor function is a function that is passed to the Promise constructor.
// It is used to resolve or reject the promise.

// Q5. What is the purpose of the return this in the then and catch methods?
// A return this is used to allow chaining of the then and catch methods.

// Q6. What is the purpose of the resolve and reject functions?
// A resolve function is used to resolve the promise.



function myPromise(executor) {
  // Variables to store the resolve and reject handlers
  let onResolve, onReject;
  // Flags to track the state of the promise
  let isFulfilled = false;
  let isRejected = false;
  let isCalled = false; // Ensures that handlers are called only once
  let value, error; // To store the resolved value or rejection reason

  // The resolve function is called when the promise is fulfilled
  const resolve = (val) => {
    isFulfilled = true; // Mark the promise as fulfilled
    value = val; // Store the resolved value
    // If a resolve handler is set and hasn't been called yet, call it
    if (typeof onResolve === 'function' && !isCalled) {
      onResolve(value);
      isCalled = true; // Ensure the handler is not called again
    }
  }

  // The reject function is called when the promise is rejected
  const reject = (reason) => {
    isRejected = true; // Mark the promise as rejected
    error = reason; // Store the rejection reason
    // If a reject handler is set and hasn't been called yet, call it
    if (typeof onReject === 'function' && !isCalled) {
      onReject(error);
      isCalled = true; // Ensure the handler is not called again
    }
  }

  // The 'then' method allows setting a callback for when the promise is resolved
  this.then = function(thenCallback) {
    onResolve = thenCallback; // Store the resolve handler
    // If the promise is already fulfilled and the handler hasn't been called, call it
    if (!isCalled && isFulfilled) {
      isCalled = true;
      onResolve(value);
    }
    return this; // Return the promise to allow chaining
  }

  // The 'catch' method allows setting a callback for when the promise is rejected
  this.catch = function(catchCallback) {
    onReject = catchCallback; // Store the reject handler
    // If the promise is already rejected and the handler hasn't been called, call it
    if (!isCalled && isRejected) {
      isCalled = true;
      onReject(error);
    }
    return this; // Return the promise to allow chaining
  }

  // Immediately execute the executor function with resolve and reject functions
  executor(resolve, reject);
}

// Example usage of the myPromise polyfill

// Creating a promise that will be rejected after 1 second
const promise = new myPromise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise rejected");
  }, 1000);
});

// Creating a promise that will be resolved after 1 second
const promise2 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 1000);
});

// Handling the rejected promise
promise.then((value) => {
  console.log(value, 'then'); // This won't be called as the promise is rejected
}).catch((error) => {
  console.log(error, 'catch'); // Logs: "Promise rejected catch"
});

// Handling the resolved promise
promise2.then((value) => {
  console.log(value, 'then'); // Logs: "Promise resolved then"
}).catch((error) => {
  console.log(error, 'catch'); // This won't be called as the promise is resolved
});

// Note: This is a simplified version of Promises and does not cover all edge cases or features of native Promises.
// It is meant for educational purposes to understand the basic mechanics of Promises.




// Promise.all example

const promise01 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 1000);
});

const promise02 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2 resolved");
  }, 2000);
});

const promise03 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 3 resolved");
  }, 3000);
});

const promises = [promise01, promise02, promise03];

const myPromiseAll = (promises) => {
  return new myPromise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if(promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      promise.then((result) => {
        results[index] = result;
        completed++;
        if (completed === promises.length) {
          resolve(results);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  });
};

myPromiseAll(promises).then((results) => {
  console.log(results);
}).catch((error) => {
  console.log(error);
});