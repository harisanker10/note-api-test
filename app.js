const express = require("express");
const app = express();

const {v4:uuid} = require('uuid');

const notes = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send('notes api')
})

app.get('/notes',(req,res)=>{
    res.json(notes);
})

app.post('/note',(req,res)=>{
    
    const {title, description, isCompleted} = req.body;
    if(!title || !description || !isCompleted){
        res.status(400).json("Check values");
        return;
    }
    console.log(req.body);
    let id = null;
    if(!req.body._id)id = uuid();
    else id = req.body.id;
    
    notes.push({
        _id: id,
        title,
        description,
        isCompleted,
        createdAt: Date.now()
    })
    res.status(200).json({status: 'success', id });
})

app.delete('/note/:id',(req,res)=>{
    const id = req.params.id;
    const index = notes.findIndex(note =>{note._id === id});
    notes.splice(index,1);
    res.status(200).json("success");
})


const port = 5050;

app.listen(port,()=>console.log(`listening at ${port} `))