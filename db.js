const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
  // sbse phle database mongo connnect krne ke lia hum schema banate h mtlb structure
  // schema banane ke baad hum model banate hai fir uske aage koi v operation krkste h 



mongoose.connect('mongodb://localhost:27017/firstdb').then(()=>{
    console.log("mongo connected")
}).catch(()=>{
    console.log("mongosse not connected")
})



const userschema = new mongoose.Schema({
firstname:{
    type: String,
    required: true

},
lastname:{
    type: String,
 
},
email:{
type: String,
required: true,
unique: true
}
// required true mtlb ye dalna jruri hai hi kaise v unique true mtlb duplicate value are not allowed
})




const User = new mongoose.model("user",userschema)
  // ab hum interect krskte hai 
// mongo ke sath interact krne ke lia hume connect krna pdega






app.use(express.urlencoded({extended: false}))




app.post('/api/user', async(req,res)=>{
    const body = req.body
    if(!body.firstname)
{
return res.status(400).end("enter first name")
}
    if(!body.lastname){
        return res.status(400).end("enter last name")
    }
    if(!body.email){
        return res.status(400).end("enter email")
    }
    const retur = await User.create({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email

    })

return res.status(201).send("status succeed")
})




app.get('/api/user',async(req,res)=>{
    const alldbuser = await User.find({})
    /// data base se agar kisi data ko lena h to .find({}) {} iska mtlb all


res.send(alldbuser)
})
app.get('/api/user/:id',async(req,res)=>{
const iddb = await User.findById(req.params.id)
res.send(iddb)
})
app.route('/api/user/:id').patch(async(req,res)=>{
await User.findByIdAndUpdate(req.params.id , {lastname:"devvvv"})
res.end("status ")
}).delete(
    async(req,res)=>{
        await User.findByIdAndDelete(req.params.id)
res.end("status ")
    }
)




app.listen(2200,()=>{
    console.log("server started")
})