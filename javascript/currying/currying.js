// Implement a curry() function, which accepts a function and return a curried one.

const join = (a, b, c) => `${a}_${b}_${c}`;
const curriedJoin = curry(join);

function curry(fn) {
  return function curried(...args) {
    // If sufficient arguments are provided, execute the function
    if (args.length >= fn.length) {
      return fn(...args);
    }
    // Otherwise, return a new function to collect more arguments
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(1)(2, 3)); // '1_2_3'
console.log(curriedJoin(1)(2)(3)); // '1_2_3'
