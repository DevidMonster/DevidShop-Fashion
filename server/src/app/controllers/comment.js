const Comment = require('../models/comment');

const getComment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await Comment.find({product_id: id})
        console.log(comment)
        res.status(200).json(comment)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

const createComment = (req, res) => {
    try {
        console.log(req.body)
        const comment = new Comment(req.body)
        comment.save()
        res.status(200).send("Comment Complete!!")
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

module.exports = { getComment, createComment }

