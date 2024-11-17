const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Ensure you install this package
const router = express.Router();

const dbPath = path.join(__dirname, '../db/db.json');

// Utility function to read and write notes to `db.json`
const readNotes = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const writeNotes = (notes) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// GET /api/notes - Retrieve all notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await readNotes();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read notes' });
    }
});

// POST /api/notes - Add a new note
router.post('/notes', async (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).json({ error: 'Title and text are required' });
    }

    const newNote = { id: uuidv4(), title, text };

    try {
        const notes = await readNotes();
        notes.push(newNote);
        await writeNotes(notes);
        res.json(newNote);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save note' });
    }
});

// DELETE /api/notes/:id - Delete a specific note by ID
router.delete('/notes/:id', async (req, res) => {
    const noteId = req.params.id;

    try {
        const notes = await readNotes();
        const updatedNotes = notes.filter((note) => note.id !== noteId);

        if (notes.length === updatedNotes.length) {
            return res.status(404).json({ error: 'Note not found' });
        }

        await writeNotes(updatedNotes);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

module.exports = router;