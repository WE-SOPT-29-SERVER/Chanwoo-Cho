const members = [
    { name: "강한희", part: "Server", group: "OB" },
    { name: "고성용", part: "Server", group: "OB" },
    { name: "구건모", part: "Server", group: "YB" },
    { name: "권세훈", part: "Server", group: "YB" },
    { name: "김영권", part: "Server", group: "YB" },
    { name: "김은지", part: "Server", group: "YB" },
    { name: "김진욱", part: "Server", group: "YB" },
    { name: "김희빈", part: "Server", group: "OB" },
    { name: "남지윤", part: "Server", group: "YB" },
    { name: "문규원", part: "Server", group: "YB" },
    { name: "박나희", part: "Server", group: "OB" },
    { name: "박정현", part: "Server", group: "YB" },
    { name: "박현지", part: "Server", group: "OB" },
    { name: "변주현", part: "Server", group: "OB" },
    { name: "서호영", part: "Server", group: "OB" },
    { name: "설지원", part: "Server", group: "YB" },
    { name: "손시형", part: "Server", group: "YB" },
    { name: "안준영", part: "Server", group: "OB" },
    { name: "장서현", part: "Server", group: "OB" },
    { name: "오예원", part: "Server", group: "OB" },
    { name: "이다은", part: "Server", group: "OB" },
    { name: "이동근", part: "Server", group: "YB" },
    { name: "이솔", part: "Server", group: "OB" },
    { name: "이승헌", part: "Server", group: "YB" },
    { name: "이정은", part: "Server", group: "YB" },
    { name: "이제준", part: "Server", group: "YB" },
    { name: "정설희", part: "Server", group: "OB" },
    { name: "조윤서", part: "Server", group: "OB" },
    { name: "조재호", part: "Server", group: "YB" },
    { name: "조찬우", part: "Server", group: "YB" },
    { name: "주어진사랑", part: "Server", group: "YB" },
    { name: "주효식", part: "Server", group: "YB" },
    { name: "채정아", part: "Server", group: "OB" },
    { name: "최영재", part: "Server", group: "OB" },
    { name: "최유림", part: "Server", group: "YB" },
    { name: "최진영", part: "Server", group: "YB" },
    { name: "허유정", part: "Server", group: "YB" },
  ];

// shuffle 함수
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
};

// yb, ob 기준으로 필터링 
let ybMembers = members.filter(member => member.group === 'YB');
let obMembers = members.filter(member => member.group === 'OB');

// yb, ob 멤버들 shuffle
shuffle(ybMembers);
shuffle(obMembers);

console.log(ybMembers);
// console.log(ybMembers.length); // 21
// console.log(obMembers.length); // 16

// 조 배열 생성
let teamMember = 4;
const totalTeamNum = Math.floor(members.length / teamMember);

// console.log(teamMember);
// console.log(totalTeamNum);

// 조 배열 생성 후, 값 0으로 채우기
let teamArray = Array.apply(null, new Array(totalTeamNum)).map(Number.prototype.valueOf, 0);
// console.log(teamArray);

// yb넣기
for(i = 0; i < ybMembers.length; i++) {
    teamArray[i % totalTeamNum] += ybMembers[i].name;
    teamArray[i % totalTeamNum] += " ";
}
// ob넣기
for(i = 0; i < obMembers.length;  i++) {
    teamArray[i % totalTeamNum] += obMembers[i].name;
    teamArray[i % totalTeamNum] += " ";
}
// 조별 출력
for (i = 0; i < totalTeamNum; i++) {
    console.log(`${i+1}조 : ${teamArray[i]}`)
}
