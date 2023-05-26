const Cart =  require("../models/Cart");
const Productos = require("../models/Productos");

exports.getProductoCart = async (req , res)=>{
    const productosCart = await Cart.find();

    if(productosCart){
        res.json({ productosCart })
    }else{
        res.json({ msg : "No hay productos en el carrito" })
    }

};

exports.addProductoCart = async (req, res) => {
    const { Nombre, Urlimagen, Precio } = req.body;
    
    const estaEnProductos = await Productos.findOne({ Nombre });
  
    const noEstaVacio = Nombre !== "" && Urlimagen !== "" && Precio !== "";
  
    const estaEnCarrito = await Cart.findOne({ Nombre });
  
    if (!estaEnProductos) {
      res.status(400).json({
        msg: "Este producto no se encuentra en la base de datos",
      });
    } else if (noEstaVacio && !estaEnCarrito) {
      const newProductoCart = new Cart({
        Nombre,
        Urlimagen,
        Precio,
        Cantidad: 1,
      });
  
      // Actualizar campo EnCart en el modelo de productos
      estaEnProductos.EnCart = true;
      await estaEnProductos.save();
  
      await newProductoCart.save();
  
      res.json({
        msg: 'El Producto fue agregado al carrito',
        producto: newProductoCart,
      });
    } else if (estaEnCarrito) {
      res.status(400).json({
        msg: "El producto ya está en el carrito",
      });
    }
  };
exports.putProducto = async (req , res) =>{
    const { productoId } = req.params;
    const { query } = req.query;
    const body = req.body;


    const productoBuscado = await Cart.findById(productoId)

    if(!query){
        res.status(404).json({ msg: "Debes enviar una query"})
    }else if(productoBuscado && query === "add"){
        body.Cantidad = body.Cantidad + 1;

        await Cart.findByIdAndUpdate(productoId, body,{
            new: true,
        }).then((producto)=>{
            res.json({
                msg: `El producto ${producto.Nombre} fue actualizado`,
                producto
            });
        });

    }else if(productoBuscado && query ==="del"){
        body.Cantidad = body.Cantidad -1;

        await Cart.findByIdAndUpdate(productoId, body,{
            new:true,
        }).then((producto)=>
            res.json({
                msg: `El producto ${producto.Nombre} fue actualizado`
            })
        )

    }else{
        res.status(400).json({msg:"Ocurrio un error"})
    }
}

exports.deleteProducto = async (req , res)=>{
    const { productoId } = req.params;

    const productoEnCart = await Cart.findById(productoId);

    const { Nombre , Urlimagen , Precio , _id} = await Productos.findOne({
        Nombre : productoEnCart.Nombre
    });

    await Cart.findByIdAndDelete(productoId)

    await Productos.findByIdAndUpdate(
        _id,
        {EnCart: false, Nombre , Urlimagen , Precio},
        {new: true}
    )
    .then((producto)=>{
        res.json({
            msg: `El producti ${producto.Nombre} fue eliminado del carrito`,
        });
    })
    .catch((error)=> res.json({msg:"Hubo un error"}))

}