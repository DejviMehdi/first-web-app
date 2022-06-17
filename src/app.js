const fastify = require('fastify')
const fastifySwagger=require('@fastify/swagger')

const {itemRoute} =require('./routes/toDo')

const build=(opts={}, optsSwagger={})=>{
    const app=fastify(opts)
    app.register(fastifySwagger, optsSwagger)
    app.register(itemRoute)
    return app
}
module.exports={build}