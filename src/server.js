const{build} = require('./app')

const app = build({logger:true})

app.listen(3000,function(err, address){
    if(err){
        app.log.error(err)
        process.exit(1)
    }
})