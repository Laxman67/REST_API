import { Router } from "express";

const router = Router();

import { loginUser } from "../../controllers/v1/auth.js";

router.post("/", loginUser);

export default router;
