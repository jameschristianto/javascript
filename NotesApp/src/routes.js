const { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler,
    deleteNotebyIdHandler 
} = require("./handler");

const routes = [
    // Add Note
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    // Get Note
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    // Get Detail by ID
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler
    },
    // Change Note
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler
    },
    // Delete Note
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotebyIdHandler
    }
];

module.exports = routes;