const fs = require('fs');
const csv = require('csv-parser');
const Producto = require('../models/producto.model');

class CSVProcessor {
    constructor(filePath) {
        this.filePath = filePath;
    }

    processCSV() {
        return new Promise((resolve, reject) => {
            const results = [];

            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (data) => {
                    console.log("NOMBRE: " + data.nombre)
                    console.log("CANTIDAD: " + data.cantidad)
                    console.log("PRECIO: " + data.precio)
                    console.log("IMAGEN: " + data.imagen)
                    const productoData = {
                        nombre: data.nombre,
                        cantidad: parseInt(data.cantidad),
                        precio: parseFloat(data.precio),
                        imagen: data.imagen || ''
                    };
                    console.log("PRODUCT DATA: " + productoData)
                    results.push(productoData);
                })
                .on('end', () => {
                    resolve(results);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    async saveToMongoDB() {
        try {
            const productos = await this.processCSV();
            const savedProducts = await Producto.insertMany(productos);
            return {
                success: true,
                message: `${savedProducts.length} productos importados correctamente`,
                products: savedProducts
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al procesar el archivo CSV',
                error: error.message
            };
        }
    }
}

module.exports = CSVProcessor;