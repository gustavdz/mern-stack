const { Router } = require('express');
const router = Router();

const { getNotes, createNote, deleteNote, getNote, updateNote} = require('../controllers/notes.controller');

router.route('/')
    .get(getNotes)
    .post(createNote);

router.route('/:id')
    .put(updateNote)
    .get(getNote)
    .delete(deleteNote);

module.exports = router;
