import { Router } from "express";
import validator from "express-validator";

import {
  getNotes,
  deleteNote,
  getNoteById,
  createNote,
  updateNote,
} from "../../controllers/v1/notes.js";
import { verityJWT } from "../../controllers/v1/auth.js";

const router = Router();
const { body } = validator;

router.get("/", verityJWT, getNotes);
router.get("/:id", verityJWT, getNoteById);
router.post(
  "/",
  verityJWT,
  body("title").exists(),
  body("content").exists(),
  body("isDraft").isBoolean(),
  createNote,
);
router.delete("/:id", verityJWT, deleteNote);
router.patch("/:id", verityJWT, updateNote);

export default router;
