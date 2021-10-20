// 작성 코드
hoistFunction();

function hoistFunction(){
    console.log(x);
    var x = "var";
    console.log(x);
}


// hoist된 코드
// 함수 선언부와 변수 선언부분만 최상위로 올려진다 (hoist)
function hoistFunction(){
    var x;
    console.log(x);
    x = "var";
    console.log(x);
}

hoistFunction(); // 호출부가 내려오게 됨

// hoisting이 일어나지 않도록 var는 앞으로 쓰지 않는다. 
// let과 const를 사용한다