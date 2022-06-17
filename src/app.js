const fastify = require('fastify')

const {itemRoute} =require('./routes/items')

const build=(opts={})=>{
    const app=fastify(opts)
    app.register(itemRoute)
    return app
}
module.exports={build}