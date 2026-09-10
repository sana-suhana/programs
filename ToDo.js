const express = require('express');
const mongoose = require('mongoose');
const DataBase = require('./model');
const app = express();
mongoose.connect("mongodb://localhost:27017/").then(()=>console.log("database conneted")).catch((err)=> console.log(err.message))
app.use(express.json())
/*methods*/
app.post('/create_todo', async (req,res)=>{
    const{ title , Discription , Status}  = req.body;
    try{
        const data = new DataBase({
            title,
            Discription,
            Status
        });
        await data.save();
        return res.json({
            message:"ToDo created successfully",
            todo : data
        
        });
    }
    catch(err){
        console.log(err.message);
    }
});

app.get('/get_todo', async(req,res)=>{
    try{
        const data = await DataBase.find()
        return res.json({
            message : "getting todo task...",
            database :data
        })
    }
    catch(err){
        console.log(err.message);
    }
});

app.get('/get_todo/:id',async (req,res)=>{
    try{
        const user=await DataBase.findById(req.params.id).select("title Discription");
    if(!user){
        return res.status(404).json({
            message:"Task not found"
        });
    }
    return res.status(200).json(user);
    }
    catch(err){
        console.log(err.message);
    }
});

app.put('/update/:Id',async(req,res)=>{
    try{
        const {Status}=req.body;
        const user = await DataBase.findByIdAndUpdate(
        req.params.Id,

        {
            Status
        },
          {
            new:true
         }
    );
    if(!user){
        return res.status(404).json({
            message:"Task not found"
        });
    }
    return res.status(200).json({
       message:"updated successfully",
        database:user
    });
}
catch(err){
    console.log(err.message);
    }
});

app.put('/update/:id',async(req,res)=>{
    try{
        const{title,Discription,Status}=req.body;
        const user = await DataBase.findByIdAndUpdate(
        req.params.id,

        {
            title,
            Discription,
            Status
        },
          {
            new:true
         }
    );
    if(!user){
        return res.status(404).json({
            message:"Task not found"
        });
    }
    return res.status(200).json({
       message:"Task updated successfully",
        database:user
    });
}
catch(err){
    console.log(err.message);
    }
});

app.delete('/delete/:id', async(req,res)=>{
    try{
        const user = await DataBase.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).json({
                message:"Task not found",
                database:user
            });
        }
        return res.status(200).json({
            message:"Task deleted successfully",
            database:user
        });
    }
        catch(err){
            console.log(err.mesage);
        }
    }
)

app.listen(3000, ()=> console.log("server is running....http://127.0.0.1:5500/"));