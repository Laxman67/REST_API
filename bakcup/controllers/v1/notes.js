import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

let notes = [];

export const getNotes = (req, res) => {
  res.send(notes);
};

export const createNote = (req, res) => {
  const note = req.body;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ Errors: result.array() });
  }

  notes.push({ ...note, id: uuidv4() });
  res.send(`Note with title: ${note.title} was added`);
};

export const getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);
  res.send(note);
};

export const deleteNote = (req, res) => {
  const { id } = req.params;
  // Asign {object} that  is not == id
  notes = notes.filter((note) => note.id != id);
  let note = notes.filter((note) => note.id === id);

  if (!note) {
    res.status(400).json({
      success: false,
      error: "You're trying to delete not exisiting data",
    });
  } else {
    res.send(`Note with id ${id} was deleted`);
  }
};

export const updateNote = (req, res) => {
  const { id } = req.params;

  const { title, content, isDraft } = req.body;

  const note = notes.find((note) => note.id === id);

  if (title) {
    note.title = title;
  }

  if (content) {
    note.content = content;
  }

  if (isDraft) {
    note.isDraft = isDraft;
  }

  res.send("Note with id ${id} was updated");
};
