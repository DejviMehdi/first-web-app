let toDo = require('../toDo')

const Item = {
    type: 'object',
    properties: {
        id:{
            type: 'string'
        },
        name:{
            type: 'string'
        },
        description:{
            type: 'string'
        }
    }
};

const getItemsOpts = {
    schema: {
        response: {
            200: {
                type:'array',
                toDo: Item 
           }
        }
    }
};

const getItemOpts = {
    schema:{
        response: {
            200: Item
       },
    },
};

const postItemOpts={
    schema:{
        body:{
            type: 'object',
            required: ['name','description'],
            properties:{
                name:{type: 'string'},
                description:{type: 'string'}
           }
        },
        response: {
            201: Item
       },
    },
};

const deleteItemOpts = {
    schema:{
        response:{
            200: {
                type:"object",
                properties: {
                message: { type: "string" },
                },
            },
        },
    },
};

const updateItemOpts={
    schema:{
   body:{
        type:"object",
        required:["name","description"],
        properties:{
            name:{type:"string"},
            description:{type:"string"},
           }
    },
    },
    response:{
        201:Item,
    },    
};

const itemRoute=(fastify, options, done)=>{

    fastify.get('/', function(request, reply){
         reply.send(toDo)
    })

    fastify.get('/:id', getItemOpts, (request, reply)=>{
        const{id} = request.params
        const item = toDo.find((item)=> item.id == id)

        reply.send(item)
    })

    fastify.post('/', postItemOpts, (request,reply)=>{
        const{name,description}=request.body
        const item={id:String(toDo.length +1),name,description}
        toDo.push(item)
        reply.code(201).send(item)
    })

    fastify.delete('/:id',(request,reply) => {
        const{id} = request.params
        toDo=toDo.filter((item) => item.id !== id)
        reply.send(`Item ${id} got deleted`)
    })
    
    fastify.put('/:id', updateItemOpts, (request,reply) => {
        const{id}=request.params
        const{name,description}=request.body
        const item=toDo.find((item) => item.id === id)
        item.name = name
        item.description = description
        reply.send(item)
    })
    done()
 }
 module.exports = {itemRoute}