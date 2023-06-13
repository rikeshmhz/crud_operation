const express=require("express")
const { addregister, getregister, deleteregister, updateregister } = require("../controller/RegisterController")
const router=express.Router()

router.post('/addregister',addregister)
router.get('/getregister',getregister)
router.put('/updateregister/:id',updateregister)
router.delete('/deleteregister/:id',deleteregister)

module.exports=router