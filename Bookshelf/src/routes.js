const {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookbyIdHandler
} = require("./handler");

const routes = [
    // Add Book
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    // Get Books
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    // Get Book by ID
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler
    },
    // Change Book
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler
    },
    // Delete Book
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookbyIdHandler
    }
];

module.exports = routes;