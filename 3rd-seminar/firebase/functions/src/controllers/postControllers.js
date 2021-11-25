const util = require("../lib/util");
const statusCode = require("../constants/statusCode");
const responseMessage = require("../constants/responseMessage");
const posts = require("../dbMockup/post");
const users = require("../dbMockup/user");

const getPost = async (req, res) => {
    const { postId } = req.params;
    
    if (!postId) 
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

    const post = posts.filter(post => post.id === postId);

    if ( post.length === 0 ) 
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));

    res
        .status(statusCode.OK)
        .send(
            util.success(
                statusCode.OK, 
                responseMessage.READ_POST_SUCCESS, 
                post
            )
        );
    
};

const editPost = async (req, res) => {
    const { postId } = req.params;
    const { title, text } = req.body;
    // 게시글이니까 title, text중 하나는 있어야함
    if (!title && !text)
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST, responseMessage.NULL_VALUE
                )
            );

    // dbPost에 가서 넘겨받은 postId랑 post_id 비교해서 일치하는 포스트 데려옴
    const post = posts.filter(post => post.id === postId);
    
    if ( post.length === 0 ) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST, responseMessage.NO_POST
                )
            );
    } else {
        if (title) post[0].title = title; // 해당 타이틀에 수정된 타이틀 넣어주기
        if (text) post[0].text = text; // 해당 텍스트에 수정된 텍스트 넣어주기
    }
    res
        .status(statusCode.OK)
        .send(
            util.success(
                statusCode.OK, 
                responseMessage.MODIFY_POST_SUCCESS, 
                post
            )
        );
};

const deletePost = async (req, res) => {
    const { postId } = req.params;

    if (!postId) 
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST, responseMessage.NULL_VALUE
                )
            );
    
    const post = posts.filter(post => post.id === postId);

    if (!post) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));

    // delete post

};

const getAllPost = async (req, res) => {
    const allPost = {
        posts,
    };
    res
        .status(statusCode.OK)
        .send(
            util.success(
                statusCode.OK, 
                responseMessage.READ_ALL_POSTS_SUCCESS, 
                allPost
            )
        );
};

// upload는 userId 필요~!
const uploadPost = async (req, res) => {
    const { title, text, userId } = req.body;

    if ( !title || !text || !userId ) 
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

    const isUser = users.filter(user => user.id === userId);
    
    let author;

    if ( isUser.length === 0 ) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    } else {
        author = isUser[0].name;
    }

    const newPost = {
        id: posts.length + 1,
        title,
        text,
        author,
    };

    res
        .status(statusCode.OK)
        .send(
            util.success(
                statusCode.CREATED, 
                responseMessage.CREATE_POST_SUCESS, 
                newPost
            )
        );
};


module.exports = { 
    getPost, 
    editPost, 
    deletePost, 
    getAllPost, 
    uploadPost 
};