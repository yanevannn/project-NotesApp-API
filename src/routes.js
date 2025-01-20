const { addNotesHandler, getAllNotesHandler, editNoteByIdHandler, deleteNotesByIdHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotesByIdHandler,
    },
];

module.exports = routes;