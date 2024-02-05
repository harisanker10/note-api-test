const express = require("express");
const app = express();

const {v4:uuid} = require('uuid');

const notes = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    const documentation = `
        <h1>Notes API Documentation</h1>
        <p>Welcome to the Notes API. Here are the available endpoints:</p>
        <ul>
            <li><strong>GET /notes</strong>: Get all notes</li>
            <li><strong>GET /note/:id</strong>: Get a specific note by ID</li>
            <li><strong>POST /note</strong>: Create a new note</li>
            <li><strong>DELETE /note/:id</strong>: Delete a note by ID</li>
        </ul>
        <p>For more details on how to use each endpoint, refer to the API documentation.</p>
    `;

    res.send(documentation);
});

app.get('/note/:id',(req,res)=>{
    const note = notes.find(note=>note._id === req.params.id);
    res.json(note);
})

app.get('/notes',(req,res)=>{
    res.json(notes);
})

app.post('/note',(req,res)=>{
    
    console.log(req.body);
    
    let {title, description, isCompleted} = req.body;
    if(!title || !description || !isCompleted.toString() === ''){
        res.status(400).json("Check values");
        return;
    }

    let id = null;
    if(!req.body._id)id = uuid();
    else id = req.body.id;

    createdAt = Date.now();
    
    const note = notes.push({
        _id: id,
        title,
        description,
        isCompleted,
        createdAt
    })
    res.status(200).json({status: 'success',data: {note}});
})

app.delete('/note/:id',(req,res)=>{
    const id = req.params.id;
    const index = notes.findIndex(note =>{note._id === id});
    notes.splice(index,1);
    res.status(200).json("success");
})

app.put('/notes/:id',(req,res)=>{

    const index = notes.findIndex((obj)=>obj._id === req.params.id);

    const keys = ['title','description','isCompleted'];
    Object.keys(req.body).forEach((key)=>{
        if(keys.indexOf(key) === -1){
            res.status(400).json("Invalid keys");
            return;
        }
    })

    notes[index] = {...notes[index], ...req.body, updatedAt: Date.now()};
    res.status(200).json({status:"success", data: notes[index]})

    

})



const port = 8090;

app.listen(port,'0.0.0.0',()=>console.log(`listening at ${port} `))