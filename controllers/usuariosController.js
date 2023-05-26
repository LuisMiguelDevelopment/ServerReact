const Usuario = require("../models/Usuarios");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
    
    const newUser = {
      Usuario: req.body.Usuario,
      Nombre: req.body.Nombre,
      Email: req.body.Email,  
      Contrasena: bcrypt.hashSync(req.body.Contrasena),
      Tipo:req.body.Tipo,
    };
  
    Usuario.create(newUser)
      .then(user => {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: expiresIn
        });
        res.json({ user, accessToken });
      })
      .catch(err => {
        res.status(500).json({ error: 'El correo ya existe' });
        
      });
  };
  exports.loginUser = async (req, res, next) => {
    try {
      const { Email, Contrasena } = req.body;
  
      // Verificar si se proporcionaron valores para Email y Contrasena
      if (!Email || !Contrasena) {
        return res.status(400).json({ error: 'Correo electrónico y contraseña son requeridos' });
      }
  
      const user = await Usuario.findOne({ Email });
      if (!user) {
        return res.status(409).json({ error: 'Email no existe' });
      }
  
      const isMatch = await bcrypt.compare(Contrasena, user.Contrasena);
      if (isMatch) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: expiresIn
        });
        const dataUser = {
          Usuario: user.Usuario,
          Nombre: user.Nombre,
          Email: user.Email,
          Tipo: user.Tipo,
        };
        res.json({ dataUser, accessToken, expiresIn });
      } else {
        res.status(409).json({ error: 'Contraseña incorrecta' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };