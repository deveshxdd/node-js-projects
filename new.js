const express = require('express')
const app = express()
const users = require('./MOCK_DATA.json')
const fs= require('fs')

app.use(express.urlencoded({extended: false}))   // ek middleware laga diya data post aane ke lia

// jab v koi form data aaega wo usko body me dalne ka kaam krega

app.get('/api/user',(req,res)=>{
    return res.json(users)
})
app.listen(2000,()=>{
    console.log("port started")
})
app.get('/user',(req,res)=>{
    const html = `<ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`)}
    
     </ul>`
     return res.send(html)
})
app.get('/api/user/:id',(req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((usr)=>usr.id===id)
    return res.json(user)

})
app.post('/api/user',(req,res)=>{
    const body = req.body
    // ab ye express js ko pata hi nhi h ki kis type ka data aaya hai kaha se aaya h 
    // iske lia hum middleware use krte hai
    // avi ke lia middleware mtlb plugin 
    console.log(body)
    users.push({...body,id: users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,ress)=>{
        return res.json({status: "success", id: users.length+1})
    })
})  // write file used to overwrite
//     fs.appendFile('./MOCK_DATA.json',JSON.stringify(body),(err,ress)=>{
//             return res.json({status: "success", id: users.length+1})
//          })
// })
// how to get property coming from postman post 
