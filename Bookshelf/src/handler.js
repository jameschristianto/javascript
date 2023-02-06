const { nanoid } = require('nanoid');
const books = require('./books');

const SUCCESS = 'success';
const FAIL = 'fail';

const SUC_200 = 200;
const SUC_201 = 201;
const ERR_400 = 400;
const ERR_404 = 404;
const ERR_500 = 500;

const SUC_ADD = 'Buku berhasil ditambahkan';
const SUC_UPDATE = 'Buku berhasil diperbarui'
const SUC_DELETE = 'Buku berhasil dihapus';
const ERR_NAME = 'Gagal menambahkan buku. Mohon isi nama buku';
const ERR_PAGE = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
const ERR_ADD = 'Buku gagal ditambahkan';
const ERR_UNKNOWN = 'Buku tidak ditemukan';
const ERR_UPDATE = 'Gagal memperbarui buku. Id tidak ditemukan';
const ERR_UPDATE_NAME = 'Gagal memperbarui buku. Mohon isi nama buku';
const ERR_UPDATE_PAGE = 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount';
const ERR_DELETE = 'Buku gagal dihapus. Id tidak ditemukan';

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        const response = h.response({
            status: FAIL,
            message: ERR_NAME
        });
        response.code(ERR_400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: FAIL,
            message: ERR_PAGE
        });
        response.code(ERR_400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: SUCCESS,
            message: SUC_ADD,
            data: {
                bookId: id
            }
        });
        response.code(SUC_201);
        return response;
    }

    const response = h.response({
        status: FAIL,
        message: ERR_ADD
    });
    response.code(ERR_500);
    return response;
};

const getAllBooksHandler = (request, h) => {
    const {
        name,
        reading,
        finished
    } = request.query;

    let filteredBooks = books;

    if (name) {
        console.log('querying name');
        filteredBooks = books.filter((bn) => bn.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading) {
        console.log('querying reading');
        filteredBooks = books.filter((book) => Number(book.reading) === Number(reading));
    }

    if (finished) {
        console.log('querying finished');
        filteredBooks = books.filter((book) => Number(book.finished) === Number(finished));
    }

    const response = h.response({
        status: SUCCESS,
        data: {
            books: filteredBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    });
    response.code(SUC_200);
    return response;
};

const getBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        const response = h.response({
            status: SUCCESS,
            data: {
                book
            }
        });
        response.code(SUC_200);
        return response;
    }

    const response = h.response({
        status: FAIL,
        message: ERR_UNKNOWN
    });
    response.code(ERR_404);
    return response
};

const editBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updateAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);
    const finished = pageCount === readPage;

    if (!name) {
        const response = h.response({
            status: FAIL,
            message: ERR_UPDATE_NAME
        });
        response.code(ERR_400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: FAIL,
            message: ERR_UPDATE_PAGE
        });
        response.code(ERR_400);
        return response;
    }

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updateAt
        };

        const response = h.response({
            status: SUCCESS,
            message: SUC_UPDATE
        });
        response.code(SUC_200);
        return response;
    }

    const response = h.response({
        status: FAIL,
        message: ERR_UPDATE
    });
    response.code(ERR_404);
    return response;
};

const deleteBookbyIdHandler = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: SUCCESS,
            message: SUC_DELETE
        });
        response.code(SUC_200);
        return response;
    }

    const response = h.response({
        status: FAIL,
        message: ERR_DELETE
    });
    response.code(ERR_404);
    return response;
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookbyIdHandler
};