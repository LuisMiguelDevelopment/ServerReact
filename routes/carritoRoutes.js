const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController")



router.post('/',cartController.addProductoCart)
router.get('/',cartController.getProductoCart)
router.put('/:productoId',cartController.putProducto)
router.delete('/:productoId',cartController.deleteProducto)

module.exports = router;