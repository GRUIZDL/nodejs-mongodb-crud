const path = require('path');
const fs = require('fs');
const CSVProcessor = require('../utils/CSVProcessor.service.js');

const guardarCsvMongo = async (req, res) => {
    try {
        const csvFilePath = path.join(__dirname, '../data/csvtest.csv');
        console.log('Ruta del archivo:', csvFilePath);
        if (!fs.existsSync(csvFilePath)) {
            return res.status(404).json({
                success: false,
                message: 'Archivo CSV no encontrado',
                path: csvFilePath
            });
        }
        const csvProcessor = new CSVProcessor(csvFilePath);
        const result = await csvProcessor.saveToMongoDB();
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
}

module.exports = {
    guardarCsvMongo
}