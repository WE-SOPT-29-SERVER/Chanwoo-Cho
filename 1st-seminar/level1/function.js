// 함수 선언식 => 호이스팅에 영향 받음
function funcName(parmas) { /*logic */ }
funcName(params);

// 함수 표현식 : 변수에 함수를 담음 => 호이스팅에 영향 받지 않음
const otherFuncName = parmas => { /* logic */}
otherFuncName(params);

// 함수 선언식 실습
function add(x, y){
    return x + y;
}
console.log(add(1,2));

// 함수 표현식 실습
const addNumber = function(x, y) {
    return x + y;
}
console.log(addNumber(2,3));

// 함수 표현식 실습 - 화살표 함수
const addString = (x, y) => {
    return x + y;
}
console.log(addString("Hello", "everyone"));