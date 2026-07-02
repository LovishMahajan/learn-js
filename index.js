"use strict";
const firstName = "Lovish";
let age = 28;
const active = true;
const levels = [1, 2];
const friends = ["abhi", "gill"];
//age="fake"; // Type 'string' is not assignable to type 'number'.
let color = "red"; // we initially or first value define make it string type. and when we assign value of different data type then it give error of different data type not assignable.
// color=5 //Type 'number' is not assignable to type 'string'.
const multiply = (a, b) => {
    return a * b;
};
console.log(multiply(2, 4));
//console.log(multiply("Lovish",4)); //Argument of type 'string' is not assignable to parameter of type 'number'.
function greet(name, age) {
    return `Hello ${name} you are ${age} years old`;
}
console.log(greet("Lovish", 28));
// Thinking question, in a comment: you've now seen TS reject bad inputs to a function and reject a wrong return value. In your own words — how is this different from the errors you got in plain JavaScript last week? When does TypeScript catch the mistake versus when did JavaScript catch it? (This "when" is the entire reason TypeScript exists — take a real swing.)
// Ans: TS catch the mistake at the time of writing the code and JS catch the mistake at the time of running the code.
