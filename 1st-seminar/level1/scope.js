// Fuction Scope
// var 는 if문의 block과 관계 없이 접근 가능하다
if(true){
    var a = "var";
}
console.log(`var : ${a}`);

// 유효범위가 함수 내 이므로 밖으로 나가지 못한다
function colornScope(){
    if(true){
        var color = "blue";
        console.log(`color : ${color}`);
    }
}
colornScope();
// console.log(`color : ${color}`); // 불가능



// Block Scope
// let, const 는 block에 영향을 받아 그 밖에서 접근 불가능하다
if(true){
    let b = "let";
    const c = "const";
}
//console.log(`let : ${b}, const : ${c}`); // 불가능


// let => 반복문의 변수에 사용하기 용이
const arr = ["string", true, 3];
function blockScope(){
    for(let i = 0; i < arr.length; i++){
        console.log(arr[i]);
    }
}
blockScope();






