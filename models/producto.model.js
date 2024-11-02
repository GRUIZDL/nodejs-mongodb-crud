const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema(
  {
    nombre: {
      type: "String",
      required: [true, "Nombre obligatorio"],
    },
    cantidad: {
      type: Number,
      required: true,
      default: 0,
    },
    precio: {
      type: Number,
      required: true,
      default: 0,
    },
    imagen: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true
  }
);

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;
