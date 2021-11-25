//import {add, subtract, multiply, divide} from "./calculator";
const { add, subtract, multiply, divide } = require("./calculator");

const addResult = add(1,3);
const subtractResult = subtract(1,3);
const multiplyResult = multiply(1,3);
const divideResult = divide(1,3);

console.log(addResult, subtractResult, multiplyResult, divideResult);