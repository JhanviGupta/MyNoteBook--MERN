const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        res.status(500)
    }
})

router.post('/createnotes', fetchUser, [
    body('title', "Enter a valid Title!").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters!"),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save();
        res.json(saveNotes);
    }
    catch (error) {
        res.status(500)
    }
})

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found!") };

    if (note.user.toString() != req.user.id) {
        return res.status(401).send("Not authenticated!");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    const saveNotes = await note.save();
    res.json({ note });
})

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found!") }

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not authenticated!");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Deleted Successfully!", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Sever Error!");
    }
})

module.exports = router;