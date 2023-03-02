const User = require("../models/user");

const getUser = async (req, res) => {
    try {
        const user = await User.find({})
        console.log(user)
        res.status(200).json(user)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const user = await User.findById(id)
        console.log(user)
        res.status(200).json(user)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

const userLogin = async (req, res) => {
    try {
        const { userName, password } = req.body
        console.log(userName, password)
        const user = await User.findOne({ 
            $or : [ 
                {
                    $and: [
                        {email: userName},
                        {password: password}
                    ]
                }, 
                {
                    $and: [
                        {phoneNumber: userName},
                        {password: password}
                    ]
                }
            ]
        })
        console.log(user)
        res.status(200).json(user)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

const userRegister = async (req,res) => {
    try {
        console.log(req.body)
        const user = new User(req.body)
        await user.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

const removeUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id})
        res.status(200).send("Remove Success!!")
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

const updateImage = async (req, res) => {
    try {
        await User.updateOne({_id: req.body.id}, {avatar: req.body.avatar})
        const user = await User.findOne({_id: req.body.id})
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

module.exports = { getUser, getUserById, userLogin, userRegister, removeUser, updateImage }