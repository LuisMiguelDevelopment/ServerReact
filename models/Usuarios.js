const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    Usuario:{
        type:String,
        require:true,
        trim: true
    },
    Nombre:{
        type:String,
        require: true,
        trim: true
    },
    Email:{
        type:String,
        require:true,
        trim: true,
        unique : true
    },
    Contrasena:{
        type:String,
        require:true,
        trim: true
    },
    Tipo:{
        type:String,
       
    },
    AccesToken:{
        type:String,
        require: true,
        trim: true
    }
    

},{
    timestamps: true
})

module.exports = mongoose.model('Usuario' ,usuarioSchema)