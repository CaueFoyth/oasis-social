require('dotenv').config();

const fastify = require('fastify')()
const fastifyView = require("@fastify/view")
const fastifyPostgres = require("@fastify/postgres")
const fastifyCookie = require('@fastify/cookie')
const path = require("node:path")

const PORT = process.env.PORT || 3000

fastify.register(fastifyPostgres, {
    connectionString: process.env.DATABASE_URL
})

fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    hook: 'onRequest',
})
fastify.register(require('@fastify/formbody'));

fastify.register(fastifyView, {
    engine: {
        ejs: require("ejs")
    },
    root: path.join(__dirname, "views"),
})

fastify.register(require('./src/routes'))

fastify.listen({ port: PORT }, (err, address) => {
    // if (err) throw err
    console.log(`Servidor na porta ${PORT}!`)
})
