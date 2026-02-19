const createUser = async (client, { name, email, password }) => {
    const result = await client.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    )
    return result
}

const getUserByEmail = async (client, email) => {
    const result = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )
    return result
}

const createPost = async (client, { user_id, content, category }) => {
    const result = await client.query(
        'INSERT INTO posts (user_id, content, category) VALUES ($1, $2, $3)',
        [user_id, content, category]
    )
    return result
}

const getPosts = async (client) => {
    const result = await client.query(
        'SELECT p.*, u.name as author FROM posts p JOIN users u ON p.user_id = u.id ORDER BY RANDOM() LIMIT 10'
    )
    return result
}


const updatePost = async (client, { id, content, category }) => {
    const result = await client.query(
        'UPDATE posts SET content = $1, category = $2 WHERE id = $3 RETURNING *',
        [content, category, id]
    )
    return result
}

const deletePost = async (client, id) => {
    const result = await client.query(
        'DELETE FROM posts WHERE id = $1 RETURNING *',
        [id]
    )
    return result
}

const getPostById = async (client, id) => {
    const result = await client.query(
        'SELECT * FROM posts WHERE id = $1',
        [id]
    )
    return result
}

module.exports = {
    createUser,
    getUserByEmail,
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPostById
}
