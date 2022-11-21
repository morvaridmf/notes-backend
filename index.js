const express = require('express');
const cors = require('cors')
const NoteModel = require("./model/model")
const mongoose = require("mongoose")
const url = "mongodb+srv://morvarid_mf:notes1234@cluster0.3lgyeg2.mongodb.net/?retryWrites=true&w=majority"


const app = express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://mern-notes.onrender.com"]
}))


// ----- connection to db


mongoose.connect(url);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})




// ---get all the notes
app.get('/notes', async (req, res) => {
    try {
        const newData = await NoteModel.find({})

        res.status(200).send(newData)

    } catch (error) {
        console.log(error.message)

    }
})


// ----get one note

app.get('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = await NoteModel.findById(id)

        res.status(200).send(newData)

    } catch (error) {
        console.log(error.message)

    }
})




// --- add a new note
app.post('/notes', async (req, res) => {
    try {
        const newData = await new NoteModel({
            title: req.body.title,
            description: req.body.description
        })
        await newData.save();


        res.status(200).json(newData)

    } catch (error) {
        console.log(error.message)

    }
})


// ---- delete a note

app.delete('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = await NoteModel.findByIdAndDelete(id)

        res.status(200).send(newData)

    } catch (error) {
        console.log(error.message)

    }
})

// ----update a note
app.put('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = await NoteModel.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description
        })

        res.status(200).send(newData)

    } catch (error) {
        console.log(error.message)

    }
})



app.listen(3001, () => console.log("port is listening"))



