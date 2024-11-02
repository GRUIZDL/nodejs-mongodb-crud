const express = require('express');
const mongoose = require('mongoose');
const productosRoute = require('./routes/productos.route.js')
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// routes
app.use("/api/productos", productosRoute)
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(
    "mongodb+srv://user:dbUser@backenddb.fhbry.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Conectado a la BD");
  })
  .catch(() => {
    console.log("Conexion fallida a la BD");
  });
