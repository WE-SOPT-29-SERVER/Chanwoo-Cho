const members = [
    {name : "조찬우", address : "성남시 분당구", age : 24, hobby : "농구"},
    {name : "구건모", address : "인천시 남동구", age : 23, hobby : "독서"},
    {name : "변주현", address : "서울시 중랑구", age : 22, hobby : "개발"},
    {name : "주어진사랑", address : "서울시 용산구", age : 23, hobby : "해뜨고 자기"},
]

const introduceMembers = () => {
    members.forEach(member => {
        console.log(`
        이름은 ${member.name}이고, 
        사는곳은 ${member.address}, 
        나이는 ${member.age}이며 
        취미는 ${member.hobby}입니다.`)
    });
}

introduceMembers();