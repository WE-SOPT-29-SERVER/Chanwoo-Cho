// var : 같은 변수명으로 재선언 가능
var variableVar = "123";
var variableVar = "321";
// var : 재할당 가능
variableVar = "456";

console.log("variableVar : ", variableVar);

// ler : 같은 변수명으로 재선언 불가능
let variableLet = "123";
//let variableLet = "321";

// let 재할당은 가능하다 => 값을 바꿔야 할 떄 사용
variableLet = "789";

console.log("variableLet : ", variableLet);

// const : 재선언 불가능
const variableConst = "123";
//const variableConst = "321";

// 재할당 불가능
//variableConst = "456";

//const otherConst; // 초기화값이 없어도 오류

console.log("variableConst : ", variableConst);
