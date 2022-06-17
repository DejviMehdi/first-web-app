const itemRoute=(fastify,options,done)=>{

    fastify.get('/',function(request,reply){
         reply.send({hello:'world'})
    })
    
    done()
 }
 module.exports = {itemRoute}