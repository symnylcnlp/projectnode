const  users  = require('../models/servicesModel.js')

exports.create = async (req, res) => {
    try {
        const { title, description, description2, images } = req.body;
        const newRecord = await users.create({ title, description, description2, images })
        res.status(201).json(newRecord)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.findAll = async (req, res) => {
    try {
        const records = await users.findAll()
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await users.findByPk(id)
        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({ message: 'Record not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const {  title, description, description2, images   } = req.body
        const [updated] = await users.update({  title, description, description2, images   }, {
            where: { id }
        });
        if (updated) {
            const updatedRecord = await users.findByPk(id)
            res.status(200).json(updatedRecord);
        } else {
            res.status(404).json({ message: 'Record not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await users.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).send()
        } else {
            res.status(404).json({ message: 'Record not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
