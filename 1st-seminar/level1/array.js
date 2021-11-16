/* -------------------- */
/*   1. 배열 실습    */
/* -------------------- */

let arr1 = [];
console.log(arr1);
console.log(typeof arr1);

let arr2 = new Array(1, 2, 3, 4, 5);
console.log(arr2);
console.log(typeof arr2);

let arr3 = ["조찬우", 1, 2, 3, null, { name: "chanwoo", age: 24 }];
console.log(arr3);
console.log(typeof arr3);

/* -------------------------- */
/*   2. 배열 prototype 메서드    */
/* -------------------------- */

console.log("**** Array 기본 함수들을 알아보자 ****");
let arr = [1, 2, 3, 4];

// 2-1, length
console.log(`arr의 길이: ${arr.length}`);

// 2-2, push, pop
arr.push("new item");   // push : 배열의 마지막에 요소 추가
console.log("arr push:", arr);
arr.pop();  // pop : 배열의 마지막 요소 삭제
console.log("arr pop:", arr);

// 2-3 shift, unshift
arr.unshift("first item");  // unshift : 전달받은 인수 모두 배열의 첫번째 요소로 추가
console.log("arr unshift:", arr);
arr.shift();    // shift : 배열의 첫번째 요소 삭제
console.log("arr shift:", arr);

// 2-4 includes : 배열 내 특정 요소가 포함되어 있는지 확인 -> boolean으로 반환
console.log("arr.includes(4):", arr.includes(4)); // true
console.log("arr.includes(1000):", arr.includes(1000)); // false

// 2-5 indexOf
console.log("arr.indexOf(4):", arr.indexOf(4));
console.log("arr.indexOf(100):", arr.indexOf(100));

// * 2-6 concat  배열을 합쳐줌 ( 인수로 전달된 값을 배열의 마지막 요소로 추가 후 배열 반환 )
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let concatArr = arr1.concat(arr2);
console.log("arr1.concat(arr2):", concatArr);

// * 2-7 join : 원본 배열의 모든 요소를 문자열로 변환 후, 연결한 문자열을 반환
let location = ["서울", "대전", "대구", "부산"];
console.log(location.join("-> "));

location = [1, "string", true, 4];
console.log(location.join("- "));

// 2-8 reverse : 배열 순서를 뒤집어 배열 반환
console.log(location.reverse().join("-> "));

//* 2-9 sort : 배열 요소를 기본 오름차순으로 정렬
let countries = ["Österreich", "Andorra", "Vietnam"];
console.log(countries.sort((a, b) => (a > b ? 1 : -1))); // Andorra, Vietnam, Österreich (제대로 정렬이 되지 않았습니다.)
console.log(
  countries.sort(function (a, b) { // return 값이 양수면 b가 a보다 앞에 오도록 정렬, 음수면 a가 b보다 앞에 오도록 정렬, 0이면 그대로. 
    return a.localeCompare(b); // a와 인수 b를 비교해, b가 a보다 사전적으로 앞에 있으면 1, 뒤에 있으면 -1, 같으면 0 반환  
  }),
); // Andorra,Österreich,Vietnam (제대로 정렬되었네요!) 유니코드 기준으로 문자 정렬
console.log(
  "오름차순 정렬:",
  concatArr.sort((a, b) => a - b),
);
console.log(
  "내림차순 정렬:",
  concatArr.sort(function (a, b) {
    return b - a;
  }),
);

// * 2-10 filter : 배열 요소 전체를 대상으로 조건을 걸어 그 조건을 충족하는 결과를 새로운 배열을 반환
let number = [100, 234, -125, 1, 23, -637, -123, 99, 2, 3, 4, 5];
let minusNumber = number.filter(item => item < 0);
console.log("minusNumber: ", minusNumber);

// * 2-11 map : 배열 요소 전체를 대상으로 함수를 호출하고, 그 결과 새로운 배열을 반환할때 주로 사용
let newCountries = ["Österreich", "Andorra", "Vietnam", "Korea", "China"];
let newCountriesLengths = newCountries.map(item => item.length);
console.log("newCountriesLengths: ", newCountriesLengths);
console.log("                              ");

// ** 2-12 reduce : map은 배열을 반환할때 사용했지만, reduce는 값 하나를 반환할때 주로 사용. 대표적인 예시로 1 ~ n 까지 더하기
let res = [3, 4, 5, 6, 7];
res.reduce((accumulator, currentValue, currentIndex, {length}) => {
    console.log(`accumulator : ${accumulator}`);
    console.log(`currentValue : ${currentValue}`);
    console.log(`currentIndex : ${currentIndex}`);
    console.log(`length : ${length}`);
    console.log("                              ");
    return accumulator + currentValue;
}, 0);

console.log("res:", res);
//initialValue를 제공하지 않으면, reduce()는 인덱스 1부터 시작해 콜백 함수를 실행하고 첫 번째 인덱스는 건너 뜀
//reduce()함수 호출시 initialValue 값이 없는 경우
//-accumulator 는 배열의 첫번째 값
//-currentValue 는 배열의 두번째 값

console.log("                              ");
console.log("                              ");
console.log("                              ");
console.log("                              ");


let newNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = newNumber.reduce((previousValue, currentValue) => {
  console.log(`previousValue: ${previousValue}, currentValue: ${currentValue}`);
  return previousValue + currentValue;
},0);

console.log("sum = ", sum);
console.log("                              ");


// 2-13 fill : 전달받은 값으로 채운다
// 인자가 하나일 경우 - 배열 전체를 그 인자로 채움
let arr = [1, 2, 3, 4, 5];
// console.log(arr.fill(0));
// console.log(arr);

// 인자가 두개일 경우 - 첫번째 인자를 두번째 인자 인덱스부터 채움
// console.log(arr.fill(0,2));
// console.log(arr);

// 인자가 세개일 경우 - 첫번째 인자를 두번째 인자 인덱스부터 세번째 인자 인덱스 전 까지 채움
console.log(arr.fill("string",2,3));


// * 2-14 some : 자신을 호출한 배열을 순회하면서 콜백함수의 반환값이 한번이라도 참이면 true 모두 거짓이라면 false => 유사 || : or 연산자
console.log([23, 10, 5].some(element => element > 10)); // true
console.log([23, 10, 5].some(element => element > 25)); // false

// * 2-15 every : 자신을 호출한 배열을 순회하면서 콜백함수의 반환값이 모두 참이면 true 한번이라도 거짓이라면 false => 유사 && : and 연산자
console.log([23, 10, 5].every(element => element > 0)); // true
console.log([23, 10, 5].every(element => element > 5)); // false

// * 2-16 find : 호출한 배열의 요소를 순회하며 반환값이 true 인 첫번째 요소를 반환한다. 
// 결과값은 배열이 아닌 해당 요소 값이다! 
// filter 는 배열을, find는 요소값을 반환
const list = [
    {id: 1, name: "철수"},
    {id: 2, name: "영희"},
    {id: 3, name: "도지"},
    {id: 4, name: "머스크"},
  ];
  
console.log(list.find(element => element.id === 2));
console.log("                              ");
console.log("                              ");


/* -------------------- */
/*   3. 배열 순회    */
/* -------------------- */

let serverPart = [
  "강한희",
  "고성용",
  "구건모",
  "권세훈",
  "김영권",
  "김은지",
  "김진욱",
];
let serverIndexStr = '서버파트 여러분 번호 한번 세겠습니다. "';
let serverPartMemberNameStr = '서버파트 여러분 이름 한번씩만 불러주세요~ "';

// 3-1 for...in : 객체의 모든 열거 가능한 속성에 대해 반복, key를 리턴 (배열의 경우 index) => 객체의 key를 순회 ~!~!
for (let item in serverPart) {
  serverIndexStr += item + "! ";
}
console.log(serverIndexStr);

// * 3-2 for...of : iterable 객체의 value를 순회 ~!~! value를 리턴.
for (let item of serverPart) {
  serverPartMemberNameStr += item + "! ";
}
console.log(serverPartMemberNameStr);

// * 3-3 forEach : 내부에서 반복문 샐행 모든 요소에 접근
serverPart.forEach(item => {
  console.log(item);
});
