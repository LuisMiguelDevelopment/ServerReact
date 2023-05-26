const express = require('express');
const router = express.Router();
const usuarioController = require("../controllers/usuariosController");

router.post('/register' , usuarioController.createUser);
router.post('/login' , usuarioController.loginUser);


module.exports = router;