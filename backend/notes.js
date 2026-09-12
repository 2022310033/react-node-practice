import express, { response } from "express"
import db from './db.js'

const router = express.Router();

router.get("/", async(req, res) => {

    try{
        const [rows] = await db.query(
            "SELECT * FROM notes"
        )
        
        res.json(rows)

    } catch (e){
        console.log(e)

        res.status(500).json({
            message: "Failed to fetch notes"
        })
    }
});

router.post("/", async (req, res) => {
    const { title, description } = req.body

    if (!title?.trim()) {
        return res.status(400).json({ message: "Title is required" })
    }

    try {
        const [result] = await db.query(
            "INSERT INTO notes (title, description) VALUES (?, ?)",
            [title.trim(), description?.trim() ?? ""]
        )

        res.status(201).json({
            id: result.insertId,
            title: title.trim(),
            description: description?.trim() ?? "",
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Failed to add note" })
    }
})

router.put('/:id', async(req, res) =>{

    const { title, description } = req.body

    if (!title?.trim()){
        return res.status(400).json({message: "Title is needed"})
    }

    try{
        const [result] = await db.query(
            "UPDATE notes SET title = ?, description = ? WHERE id = ?",
            [title.trim(), description?.trim() ?? "", req.params.id]
        )

        if (result.affectedRows == 0){
            return res.status(400).json({message: "Note not found"})
        }

        res.json({
            id: req.params.id,
            title: title.trim(),
            description: description?.trim() ?? "",
        })
    } catch(e){
        console.log(e)
        res.status(500).json({ message: "Failed to update note" })
    }
})

router.delete("/:id", async(req, res) => {
    try{
        const [result] = await db.query(
            "DELETE FROM notes WHERE id = ?",
            [req.params.id]
        )

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Note not found"})
        }

        res.status(204).send()
    } catch(e){
        console.log(e)
        res.status(500).json({message: "Failed to delete note!"})
    }
})

export default router;
