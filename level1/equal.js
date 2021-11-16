const numberVariable = 1;
const stringVariable = '1';

// 동등 연산자 : 값만 비교한다
// == , !=
console.log(numberVariable == stringVariable); //true

//값(Type Casting) : 안전하게 하기위해선 `명시적형변환` 필요!
//숫자 vs 문자 -> 숫자를 문자로
console.log(numberVariable + stringVariable); //11

// 일치 연산자 : 값 & 타입 비교
// ===
console.log(numberVariable === stringVariable); //false

// 번외 id값을 불러올때(문자열로 가져오게 됨)
// "1" ===1, js에서는 false, sql에서는true
// 일치연산자(===)를 쓰는게 안전하다 !==