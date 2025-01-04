// Implement sum function that can be used to add infinite number of arguments,
// having a base case.

// 1. Taking One argument at a time -

function sum(a) {
  return function (b) {
    if (!b) {
      // When b becomes undefined, base condition is met
      return a;
    }
    return sum(a + b);
  };
}

// Using arrow function -
// const sum = (a) => (b) => b ? sum(a + b) : a;

console.log(sum(1)(2)(3)(4)(5)(6)()); //21

// -------------------------------------------------------------------------------------

// 2. Taking One or More argument at a time -

function sum2(...args) {
  const curried = (...nextArgs) => {
    if (nextArgs.length === 0) {
      // If no arguments are passed, compute the total
      return args.reduce((acc, num) => acc + num, 0);
    }
    // Otherwise, collect the next arguments
    return sum2(...args, ...nextArgs);
  };

  return curried;
}

// Example usage:
console.log(sum2(1)(2)(3)(4)(5)(6)()); //21
console.log(sum2(1, 2)(3, 4, 5)(6)()); // 21

// Just for Understanding
const a = (...args) => {
  console.log(args); // []
};
const b = (args) => {
  console.log(args); // undefined
};
a();
b();
