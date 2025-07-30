// Array.prototype.map--------------------------------------------------

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Array.prototype.myMap = (callback) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
};

const multiplyByTwo = (item) => item * 2;

console.log(arr.myMap(multiplyByTwo));


// Array.prototype.filter------------------------------------------------

Array.prototype.myFilter = (callback) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
};

const isEven = (item) => item % 2 === 0;

console.log(arr.myFilter(isEven));


// Array.prototype.reduce------------------------------------------------

Array.prototype.myReduce = (callback, initialValue) => {
  let accumulator = initialValue;
  for (let i = 0; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
};

const sum = (acc, item) => acc + item;

console.log(arr.myReduce(sum, 0));