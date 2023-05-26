const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    Nombre: {
        type:String,
        require:true
    },
    Descripcion: {
        type:String,
        require:true
    },
    Urlimagen: {
        type:String,
        require:true
    },
    Marca: {
        type:String,
        require:true
    },
    EnCart: {
        type:Boolean,
        default: false
    },
    Precio: {
        type:Number,
        require:true
    },
    FechaCreacion: {
        type:Date,
        default : Date.now()
    },
})

module.exports = mongoose.model('Producto',productoSchema)