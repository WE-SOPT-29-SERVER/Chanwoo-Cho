const members = require("./members");

const getOnline = members =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = members.filter(value => value.location === "online");
            resolve(result);
        }, 500)
    })
};

const getOffline = members =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = members.filter(value => value.location === "offline");
            resolve(result);
        }, 500)
    })
};

const getYB = members =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = members.filter(value => value.group === "YB");
            resolve(result);
        }, 500)
    })
};

const getOB = members =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = members.filter(value => value.group === "OB");
            resolve(result);
        }, 500)
    })
};

getOnline(members)
    .then(result => getOB(result))
    .then(result => {console.log(result)});
getOffline(members)
    .then(getYB)
    .then(console.log);


    
const asyncFunc1 = async (members) => {
    const onlineMembers = await getOnline(members);
    const getMembers = await getOB(onlineMembers);
    console.log(getMembers);
}
const asyncFunc2 = async (members) => {
    const offlineMembers = await getOffline(members);
    const getMembers = await getYB(offlineMembers);
    console.log(getMembers);
}

asyncFunc1(members);
asyncFunc2(members);