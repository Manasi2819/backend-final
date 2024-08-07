const express =require('express')
const bp=require('body-parser')
const cors = require('cors')
const mongoose=require('mongoose')
const empc= require('./models/model')
const URL="mongodb+srv://admin:atlas1234@cluster0.xach4cj.mongodb.net/gfgdb?retryWrites=true&w=majority&appName=Cluster0";

var app=express()
app.use(cors())
app.use(bp.json())
var uid =1

app.post('/addproduct',(req,res)=>{
    const user = new empc({...req.body})
    user.save().then(()=>console.log('product added'))    
    res.send('product added')
})

app.get('/loaddata',async(req,res)=>{
    const users =await empc.find();
    res.send(users)
})

// app.get('/loaddata/:id',async(req,res)=>{
//     var uid=parseInt(req.params.id)
//     const users =await empc.findById(uid);
//     res.send(users)
// })

app.get('/loaddata/:id', (req, res) => {
    const uid = req.params.id;
    empc.findById(uid).then(user => {
            if (user) {
                res.send(user);
            } else {
                res.status(404).send('User not found');
            }
        })
})


app.delete('/deleteuser/:id', (req, res) => {
    const uid = req.params.id;
    empc.findByIdAndDelete(uid).then(user => {
            if (user) {
                console.log('user deleted');
                res.send('User deleted');
            } else {
                res.status(404).send('User not found');
            }
        })
})



const startServer=async()=>{
    await mongoose.connect(URL)
    app.listen(5000,()=>{
        console.log("server is running on port 5000");
    })
}
startServer()


