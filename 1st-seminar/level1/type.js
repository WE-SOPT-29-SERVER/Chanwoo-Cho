//null vs undefined
//null : Object 타입
//undefined : undefined 타입 (아직 지정 X)
//object(객체타입)를 제외한 나머지는 원시타입

console.log(typeof 1); //number
console.log(typeof 'str'); //string
console.log(typeof undefined); //undefined
console.log(typeof Symbol()); //symbol
console.log(typeof true); //boolean

console.log(typeof null); //object => 버그다. null은 원시타입이 맞다

console.log("null === undefined", null === undefined); // false
console.log("null == undifined", null == undefined); // true