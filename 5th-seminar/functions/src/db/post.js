const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const dbGetAllPosts = async (client) => {
    const { rows } = await client.query(
        `
        SELECT * FROM post p
        WHERE is_deleted = FALSE
        `
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

const dbGetPostById = async (client, postId) => {
    const { rows } = await client.query(
        `
        SELECT * FROM post p
        WHERE id = $1
            AND is_deleted = FALSE
        `,
        [postId]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const dbUpdatePost = async (client, postId, title, content) => {
    const { rows: existingRows } = await client.query(
        `
        SELECT * FROM post p
        WHERE id = $1
            AND is_deleted = FALSE
        `,
        [postId]
    );
    if (existingRows.length === 0) return false;

    const data = _.merge(
        {}, 
        convertSnakeToCamel.keysToCamel(existingRows[0]), 
        { title, content }
    );

    const { rows } = await client.query(
        `
        UPDATE post p
        SET title = $1, content = $2, updated_at = now()
        WHERE id = $3
        RETURNIG *
        `,
        [data.title, data.content, postId]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const dbDeletePost = async (client, postId) => {
    const { rows } = await client.query(
        `
        UPDATE post p
        SET is_deleted = TRUE, updated_at = now()
        WHERE id = $1
        RETURNING *
        `,
        [postId]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const dbAddPost = async (client, userId, title, content) => {
    const { rows } = await client.query(
        `
        INSERT INTO post
        (userId, title, content)
        VALUES
        ($1, $2, $3)
        RETURNING *
        `,
        [userId, title, content]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const dbGetPostByUserId = async (client, userId) => {
    const { rows } = await client.query(
        `
        SELECT * FROM post p
        WHERE user_id = $1
            AND is_deleted = FALSE
        `,
        [userId]
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

const dbGetPostsByUserIds = async (client, userIds) => {
    if (userIds.length < 1) return [];
    const { rows } = await client.query(
      `
      SELECT * FROM post
      WHERE user_id IN (${userIds.join()})
        AND is_deleted = FALSE
      `,
    );
    return convertSnakeToCamel.keysToCamel(rows);
  };

module.exports = {
    dbDeletePost,
    dbGetPostById,
    dbUpdatePost,
    dbGetAllPosts,
    dbAddPost,
    dbGetPostByUserId,
    dbGetPostsByUserIds,
}