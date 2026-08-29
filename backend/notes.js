import express from "express"
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

export default router;
