const {model , Schema} = require("mongoose");

const CartSchema = new Schema({
    Nombre: {type: String, require:true},
    Urlimagen: {type: String , require: true},
    Cantidad: {type: Number , require: true},
    Precio: {type: Number , require:true},
    Usuario:{type: Schema.Types.ObjectId, ref:'Usuario'}
});

module.exports = model("Cart",CartSchema);