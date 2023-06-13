const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const axios = require('axios')

require('dotenv').config()
require('./database/connection')

const static_path = path.join(__dirname, "/public")
const template_path = path.join(__dirname, "/templates/views")
const partials_path = path.join(__dirname, "/templates/partials")


const registerroute = require('./routes/RegisterRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path)


app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
        axios.get("http://localhost:3000/register/getregister")
        .then(function (response) {
            res.render("getregister", { data: response.data })
        })
        .catch(err=>{
            console.log(err)
        })
})
app.get("/updatePage",(req,res)=>{
    axios.get("http://localhost:3000/register/getregister",{params:{id:req.query.id}})
        .then(function (userdata) {
            res.render("getsingledata", { user: userdata.data })
        })
        .catch(err=>{
            console.log(err)
        })
})
app.use('/register', registerroute)
port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server started at ${port}`)
    console.log(`Click Here: http://localhost:${port}`)
})

