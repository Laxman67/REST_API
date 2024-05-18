import express, { json, query } from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import morgan from "morgan";

import notesRoutesV1 from "./Routes/v1/node.js";
import notesRoutesV2 from "./Routes/v2/node.js";
import authRoutesV1 from "./Routes/v1/auth.js";

import { loginUser } from "./controllers/v1/auth.js";

configDotenv();
const app = express();
const PORT = process.env.PORT || 3009;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));
app.use("/", loginUser);
app.use("/v1/notes", notesRoutesV1);
app.use("/v2/notes", notesRoutesV2);

// Server Listner
app.listen(PORT, (err) => {
  if (err) console.log(`Error Occures =>${err} `);

  console.log(`Sever listening on Port http://localhost:${PORT}`);
});
