const Producto = require('../models/producto.model')

const obtenerProductos = async (req, res) => {
    try {
        const producto = await Producto.find({})
        res.status(200).json({ producto });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerProductoPorId = async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params
        const producto = await Producto.findById(id)
        res.status(200).json({ producto });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const crearProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body)
        res.status(200).json({ producto });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params
        const producto = await Producto.findByIdAndUpdate(id, req.body)
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" })
        }
        const productoActualizado = await Producto.findById(id)
        res.status(200).json({ productoActualizado });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params
        const producto = await Producto.findByIdAndDelete(id)
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" })
        }
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}