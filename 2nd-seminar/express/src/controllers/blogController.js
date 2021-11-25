// let blogs = [
//     {
//         title: "First Blog",
//         rating: 10,
//         comments: 3,
//         createdAt: "4days ago",
//         views: 14,
//     },
//     {
//         title: "Second Blog",
//         rating: 2,
//         comments: 39,
//         createdAt: "2days ago",
//         views: 83,
//     },
//     {
//         title: "Third Blog",
//         rating: 6,
//         comments: 23,
//         createdAt: "1days ago",
//         views: 67,
//     },
// ];

export const home = (req, res) => res.send("HOME");

export const getBlog = (req, res) => {
    const result = {
        status: 200,
        message: "blog에 접근합니다.",
    };
    res.status(200).send(result);
};
export const postBlog = (req, res) => {
    const result = {
        status: 200,
        message: "blog를 post합니다."
    };
    res.status(200).send(result);
};
