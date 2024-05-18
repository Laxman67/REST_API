import { Router } from "express";
const router = Router();

import { getNotes } from "../../controllers/v2/notes.js";

router.get("/", getNotes);

export default router;
