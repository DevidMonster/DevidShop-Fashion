const Product = require('../models/Item');
const Category = require('../models/category');

const getItem = async (req, res) => {
    try {
        const { search, id } = req.query
        let item = [];
        if(!!id) {
            item = await Product.findOne({_id: id})
        } else {
            if(!!search) {
                item = await Product.find({
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                    ]
                })
            } else {
                item = await Product.find({})
            }
        }
        res.status(200).json(item)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

const getItemByCategory = async (req, res) => {
    try {
        const { search, id } = req.query
        const string = search || ""

        if(id) {
            const item = await Product.find({cate_id: id})
            res.status(200).json(item)
            return
        }
        const category = await Category.findOne({ name:req.query.cate })
        const item = await Product.find({cate_id: category._id,
            $or: [
                { name: { $regex: string, $options: 'i' } },
            ]
        })
        res.status(200).json(item)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

const getItemById = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Product.findById({_id: id})
        res.status(200).json(item)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

const addUserLiked = async (req, res) => {
    try {
        const { id, likes } = req.body
        const item = await Product.updateOne({ _id: id }, { $set: { liked: likes } })
        res.status(200).json(item)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

module.exports = { getItem, getItemByCategory, addUserLiked, getItemById }

