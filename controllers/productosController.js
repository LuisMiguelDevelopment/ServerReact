const Producto = require("../models/Productos");

exports.crearProducto = async (req , res) =>{
    try {
        let producto;

        producto = new Producto(req.body);

        await producto.save();
        res.send(producto);

    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

exports.obtenerProductos = async (req , res) =>{
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error aca')
    }
}

exports.obtenerProducto = async (req , res) =>{
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(500).send('El producto no existe')
        }
        res.json(producto);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

exports.actualizarProducto = async (req , res)=>{
    try {
        const {Urlimagen,  Nombre, Descripcion,Encart,Marca, Precio} = req.body;
        let producto = await Producto.findById(req.params.id)
        
        if(!producto){
            res.status(500).send('El producto no existe')
        }
        producto.Urlimagen = Urlimagen;
        producto.Nombre = Nombre;
        producto.Descripcion = Descripcion;
        producto.Encart = Encart;
        producto.Categoria = Categoria;
        producto.Marca = Marca;
        producto.Precio =Precio;


        producto = await Producto.findOneAndUpdate(
            {_id:req.params.id},producto,{new: true})

            res.json(producto);

    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

exports.eliminarProducto = async (req , res) =>{
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(500).send('El producto no existe')
        }

        await Producto.findByIdAndRemove({_id:req.params.id})

        res.json({msg : "Producto Eliminado"});
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}