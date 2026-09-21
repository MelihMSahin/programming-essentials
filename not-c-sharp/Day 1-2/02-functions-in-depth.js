// Part A: convert these standard functions to arrow functions.

const double = (n) =>n * 2;

const greet = (name) =>"Hello, " + name;

const add = (a, b) => a + b;

console.log(double(4));
console.log(greet("Amara"));
console.log(add(2, 3));

// Part B: this script has a deliberate bug. Use the VS Code debugger
// (breakpoints, step-through, watch) to find it before fixing it.

function calculateAverage(scores) {
  let total = 0;
  for (let i = 0; i < scores.length; i++) {
    total = total + scores[i];
  }
  return total / scores.length;
}

let classScores = [72, 58, 91, 40, 65];
console.log("Average score:", calculateAverage(classScores));