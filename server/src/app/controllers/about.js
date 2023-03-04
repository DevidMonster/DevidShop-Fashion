const About = require('../models/about')

const getData = async (req, res) => {
    try {
        const data = await About.find()
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getData
}