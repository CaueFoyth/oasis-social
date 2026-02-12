const createUser = async (client, { name, email, password }) => {
    const result = await client.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
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

module.exports = {
    createUser,
    getUserByEmail,
    createPost
}
