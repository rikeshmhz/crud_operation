const Register = require('../models/RegisterModel')

exports.addregister = async (req, res) => {
    try {
        let { firstname, lastname, address, phone, gender } = req.body
        let user = await Register.findOne({ phone: phone })
        if (!user) {
            let adduser = new Register({
                first_name: firstname,
                last_name: lastname,
                address: address,
                phone: phone,
                gender: gender
            })
            adduser = await adduser.save()
            return res.status(200).render("index",{ success: "User Register"})
        } else {
            return res.status(409).render("index",{ err: "Number Already Exists"})
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getregister = async (req, res) => {
    try {
        if(req.query.id){
            const id=req.query.id
            let user = await Register.findById(id)
            return res.send(user)
        }else{
        let user = await Register.find()
        return res.send(user)
    }
    } catch (error) {
        console.log(error)
    }
}

exports.updateregister = async (req, res) => {
    try {
        let { firstname, lastname, address, phone, gender } = req.body
        let user = await Register.findByIdAndUpdate(req.params.id, {
            first_name: firstname,
            last_name: lastname,
            address: address,
            phone: phone,
            gender: gender
        })
        if (!user) {
            return res.status(400).json({ error: "Something went Wrong" })
        }
        return res.status(200).render("index")
    } catch (error) {
        console.log(error)
    }
}

exports.deleteregister = async (req, res) => {
    try {
        let user = await Register.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}