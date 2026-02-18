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

module.exports = {
    createUser,
    getUserByEmail,
    createPost,
    getPosts
}
