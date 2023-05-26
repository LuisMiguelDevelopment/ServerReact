const express = require('express');
const conectarBD = require('./config/db')
const  cors = require('cors')


const app = express();
const PORT = 4000;

conectarBD();

app.use(express.json())
app.use(cors())

app.use('/api/productos',require('./routes/productosRoutes'));
app.use('/api/productos-cart',require('./routes/carritoRoutes'))

app.use('/api/usuarios',require('./routes/usuarioRoutes'))



app.listen(PORT,()=>{
    console.log("Server corriendo")
})
