// new 생성자를 통해 person 객체 생성
const person = new Object();

// property(속성) 추가 => key : value
person.name = "조찬우";
person.part = "sever";
person["group"] = "YB";
person.sayHello = () => {
    console.log(`안녕하세요 제 이름은 ${this.name}입니다~!`);
}

console.log(typeof person); 
console.log(person);
person.sayHello();
console.log("==================");


// 객체 안에서는 : 를 사용해 key : vaule로 저장한다
// 객체 안에서의 함수는 메소드라 부른다
const animal = {
    animalType : "dog",
    animalName : "뽀삐",
    animalFriends : ["코코", "초코", "쿠키"],
    bark : function(){
        console.log(`${this.animalName} : 멍멍`);
    },
    thisFriends : function(){
        this.animalFriends.forEach(friend => {
            console.log(`${this.animalNmae}의 친구 : ${friend}`);
        });
    }
};

console.log(animal);
animal.bark();
animal.thisFriends();

