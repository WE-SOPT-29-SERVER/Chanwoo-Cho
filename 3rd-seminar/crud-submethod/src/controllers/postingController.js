import posts from "../../dbMokup/post";
import statusCode from "../../constant/statusCode";"../../constant/responseMessage";
import responseMessage from "../../constant/responseMessage";"../../constant/statusCode";
import util from "../../lib/util";
// 모든 게시글 조회 (/post)
export const seeAllPost = (req, res) => res.render("post", {pageTitle: "Post"});

// 고유 id값 가진 게시글 조회 (/post/:id)
export const see = (req, res) => res.render("blog", {pageTitle: "Blog"}); 

// 게시글 생성
export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = async(req, res) => {
    const { title, description, location } = req.body;
    // 하나라도 입력 안하면 bad request
    if( !title || !description || !location ){
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(
                    statusCode.BAD_REQUEST, 
                    responseMessage.BAD_REQUSET));
    }
    // 

    const newPost = { title, description, location };
    posts.push(newPost);

    return res.redirect("/post").send(posts);
};

// 고유 id값 가진 게시글 수정
export const getEdit = (req, res) => {};
export const postEdit = (req, res) => {};

// 고유 id값 가진 게시글 삭제
export const deleteBlog = (req, res) => {};