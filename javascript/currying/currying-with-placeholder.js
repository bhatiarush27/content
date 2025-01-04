// Implement curry() which also supports placeholder.

const join = (a, b, c) => `${a}_${b}_${c}`;
const curriedJoin = curry(join);

// Step-by-Step execution of Example -> curriedJoin(_, _, _)(1)(_, 2)(3)

    // Initial Call: curriedJoin(_, _, _)
    // Input: (_, _, _)
    // Logic:
        // args = [_, _, _] (placeholder in all positions).
        // Since the number of arguments (args.length) matches the function's arity (fn.length), but placeholders are present, the function does not execute yet.
        // Returns a new function for further input.

    // Second Call: curriedJoin(_, _, _)(1)
    // Input: 1
    // Logic:
        // nextArgs = [1].
        // args = [_, _, _] is updated to [1, _, _]:
        // First placeholder (_) is replaced by 1.
        // Returns a new function for further input.

    // Third Call: curriedJoin(_, _, _)(1)(_, 2)
    // Input: (_, 2)
    // Logic:
        // nextArgs = [_, 2].
        // args = [1, _, _] is updated to [1, _, 2]:
        // First _ is skipped.
        // Second _ is replaced by 2.
        // Returns a new function for further input.

    // Fourth Call: curriedJoin(_, _, _)(1)(_, 2)(3)
    // Input: 3
    // Logic:
        // nextArgs = [3].
        // args = [1, _, 2] is updated to [1, 3, 2]:
        // Remaining _ is replaced by 3.
        // Now args = [1, 3, 2] matches the arity (fn.length) without placeholders.

    // Final Execution:
    // The curried() function executes join(1, 3, 2).
    // Output: '1_3_2'.


function curry(fn) {
  return function curried(...args) {
    // if number of arguments match
    if (
      args.length >= fn.length &&
      args.slice(0, fn.length).every((item) => item !== curry.placeholder)
    ) {
      return fn.call(this, ...args);
    }
    // otherwise return a function which merges the args
    return function (...nextArgs) {
      const mappedArgsTo = args.map((item) =>
        item === curry.placeholder && nextArgs.length ? nextArgs.shift() : item
      );
      return curried.call(this, ...mappedArgsTo, ...nextArgs);
    };
  };
}

curry.placeholder = Symbol(); 
// By using Symbol, the placeholder is guaranteed to be distinguishable 
// from any other value.

const _ = curry.placeholder;
console.log(_); // Symbol()


console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'
console.log(curriedJoin(_, 3)(2, 1, 4)); // '2_3_1'
console.log(curriedJoin(_, _, _)(1)(_, 2)(3)); // '1_3_2'
