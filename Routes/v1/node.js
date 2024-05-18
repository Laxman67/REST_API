import { Router } from "express";
import validator from "express-validator";

import {
  getNotes,
  deleteNote,
  getNoteById,
  createNote,
  updateNote,
} from "../../controllers/v1/notes.js";

const router = Router();
const { body } = validator;

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post(
  "/",

  body("title").exists(),
  body("content").exists(),
  body("isDraft").isBoolean(),
  createNote,
);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);

export default router;
