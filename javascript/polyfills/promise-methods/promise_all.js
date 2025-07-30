// Promise.all Polyfill

// Note: Promise.all is a built-in method that takes an array of promises and returns a single promise that resolves when all of the promises have resolved.
// If any of the promises reject, the returned promise will reject with the reason for the first promise that rejected.

const myPromiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    let resolvedCounter = 0;
    const promiseCount = promises.length;
    const resolvedValues = [];

    if (promiseCount === 0) {
      return resolve([]);
    }

    // Iterate over the promises and resolve them one by one, but in parallel.
    // This is why we use Promise.resolve to ensure that the promise is resolved.
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          resolvedCounter++;
          resolvedValues.push(value);
          if (resolvedCounter === promiseCount) {
            resolve(resolvedValues);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

// Example usage---------------------------
const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Promise 2 resolved");
  }, 1500);
});

const promise3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Promise 3 resolved");
  }, 1000);
});

const promises = [promise1, promise2, promise3];

myPromiseAll(promises).then((results) => {
  console.log(results); // [ 'Promise 3 resolved', 'Promise 2 resolved', 'Promise 1 resolved' ]
}).catch((error) => {
  console.error(error);
});

// If we replace any of the promises with a rejected promise, the returned promise will reject with
// the reason for the first promise that rejected as soon as it is rejected.

const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 4 rejected");
  }, 1000);
});

const promises2 = [promise1, promise2, promise3, promise4];

myPromiseAll(promises2).then((results) => {
  console.log(results);
}).catch((error) => {
  console.error(error); // Promise 4 rejected
});
