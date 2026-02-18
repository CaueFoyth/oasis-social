const db = require('./db')
const bcrypt = require('bcrypt')

const routes = async (fastify, options) => {
    fastify.get('/', async (req, reply) => {
        return reply.view('index.ejs')
    })

    fastify.get('/about', async (req, reply) => {
        return reply.view('about.ejs')
    })

    //===============================REGISTER===============================
    fastify.get('/register', async (req, reply) => {
        const cookie = req.cookies.session_id
        if (cookie && req.unsignCookie(cookie)) return reply.redirect('/feed')

        return reply.view('register.ejs', { error: null, name: '', email: '' })
    })

    fastify.post('/register', async (req, reply) => {
        const { name, email, password } = req.body

        let user = await db.getUserByEmail(fastify.pg, email)

        if (user.rows && user.rows.length > 0) {
            return reply.view('register.ejs', { error: 'Email já cadastrado', name, email })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await db.createUser(fastify.pg, { name, email, password: hashedPassword })

        const token = JSON.stringify({
            user_id: user.rows[0].id,
            email: user.rows[0].email,
            name: user.rows[0].name
        })

        reply.setCookie('session_id', token, {
            path: '/',
            httpOnly: true,
            secure: false,
            signed: true,
            maxAge: 60 * 60 * 24
        })

        return reply.redirect('/feed',)
    })

    //===============================LOGIN===============================
    fastify.get('/login', async (req, reply) => {
        const cookie = req.cookies.session_id
        if (cookie && req.unsignCookie(cookie)) return reply.redirect('/feed')

        return reply.view('login.ejs', { error: null, email: '' })
    })

    fastify.post('/login', async (req, reply) => {
        const { email, password } = req.body
        const user = await db.getUserByEmail(fastify.pg, email)

        const token = JSON.stringify({
            user_id: user.rows[0].id,
            email: user.rows[0].email,
            name: user.rows[0].name
        })

        reply.setCookie('session_id', token, {
            path: '/',
            httpOnly: true,
            secure: false,
            signed: true,
            maxAge: 60 * 60 * 24
        })

        if ((!user.rows || user.rows.length === 0) || (!await bcrypt.compare(password, user.rows[0].password))) {
            return reply.view('login.ejs', { error: 'Email ou senha inválidos', email })
        }

        return reply.redirect('/feed')
    })

    //===============================Feed===============================
    fastify.get('/feed', async (req, reply) => {
        const cookie = req.cookies.session_id
        if (!cookie || !req.unsignCookie(cookie)) return reply.redirect('/login')

        const user = JSON.parse(req.unsignCookie(cookie).value)

        const posts = await db.getPosts(fastify.pg)

        return reply.view('feed.ejs', { error: null, user, content: '', category: '', posts: posts.rows })
    })

    //===============================Post===============================
    fastify.post('/post', async (req, reply) => {
        const cookie = req.cookies.session_id
        if (!cookie || !req.unsignCookie(cookie)) return reply.redirect('/login')

        const user = JSON.parse(req.unsignCookie(cookie).value)

        const { content, category } = req.body

        if (!content || !category) {
            return reply.view('feed.ejs', { error: 'Preencha todos os campos', user, content, category })
        }

        await db.createPost(fastify.pg, { user_id: user.user_id, content, category })

        return reply.redirect('/feed')
    })
}

module.exports = routes