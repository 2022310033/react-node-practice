import express from "express";
import cors from "cors"
import notes from './notes.js'

const app = express()
const PORT = 2000;

app.use(cors())

app.use(express.json())

app.use('/notes', notes);

app.listen(PORT, () => {
    console.log("Server now running!")
})