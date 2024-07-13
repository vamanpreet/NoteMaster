const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../schema/Notes');
const {body, validationResult} = require('express-validator');

// ROUTE 1 : GET ALL THE NOTES USING : GET "/API/NOTES/FETCHALLNOTES". LOGIN REQUIRED
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

// ROUTE 2 : ADD A NEW NOTE USING POST : "API/NOTES/ADDNOTES". LOGIN REQUIRED
router.post('/addNotes', fetchUser,[
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Enter a valid description').isLength({min:5})
], async (req, res) => {
    try {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({error: error.array()});
        }
        const {title, description, tag} = req.body;
        const note = new Notes({
            title, description, tag, user : req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})


// ROUTE 3 : UPDATE AN EXISTING NOTE USING PUT : "API/NOTES/UPDATENOTE".LOGIN REQUIRED
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title) { newNote.title = title; }
    if(description) { newNote.description = description; }
    if(tag) { newNote.tag = tag; }
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send('Not Found');
        }
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

// ROUTER 4 : DELETE AN EXISTING NOTE USING DELETE : "API/NOTES/DELETENOTE". LOGIN REQUIRED
router.delete('/deleteNote/:id', fetchUser, async(req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send('Not Found');
        }
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted"})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router