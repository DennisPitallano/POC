import express from "express";
import  * as NoteController from "../controllers/notes";

const router = express.Router();

router.get("/", NoteController.getNotes);
router.get("/:id", NoteController.getNote);
router.post("/", NoteController.createNote);
router.put("/:id", NoteController.updateNote);
router.delete("/:id", NoteController.deleteNote);

export default router;