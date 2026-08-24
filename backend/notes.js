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

export default router;