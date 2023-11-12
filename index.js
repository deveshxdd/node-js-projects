const express = require('express')
const app = express()
const PORT = 4000
const user = require('./MOCK_DATA.json')
app.get('/api/user',(req,res)=>{
    return res.json(user)
})
app.get('/user',(req,res)=>{
    const html = `<ul> ${user.map((user)=>
        `<li> ${user.first_name} </li>`
    )} </ul>`
    return res.send(html)
})
app.get('/api/user/:id',(req,res)=>{
    const id = Number(req.params.id)
    const usr = user.find((userr)=>userr.id===id)
    res.json(usr)
})
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})
// app.route("/api/user").get().put().patch
// agar tumhare paas same route hai to sbke lia ye use krkste ho
// app.route(routename).get().put().patch()