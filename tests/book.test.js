const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Book } = require("../src/sequelize");

describe("/books", () => {
  let book;
  let book1;

  before(async () => {
    try {
      await Book.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Book.destroy({ where: {} });
      book = await Book.create({
        title: "mockTitle",
        ISBN: "1234",
      });
      book1 = await Book.create({
        title: "mockTitle1",
        ISBN: "12345",
      });
    } catch (err) {
      console.log(err);
    }
  });
  describe("POST /books", () => {
    it("creates a new book", (done) => {
      request(app)
        .post("/books")
        .send({
          title: "2001: A Space Odyssey",
          ISBN: "0-453-00269-2",
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal("2001: A Space Odyssey");
          expect(res.body.ISBN).to.equal("0-453-00269-2");
          done();
        });
    });
    it("returns an error if title/author are missing", (done) => {
      request(app)
        .post("/books")
        .send({
          ISBN: "0-453-00269-2",
        })
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0].message).to.equal("title is required");
          done();
        });
    });
  });
  describe("GET /books/:bookId", () => {
    it("gets a book given an id", (done) => {
      request(app)
        .get(`/books/${book.id}`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal("mockTitle");
          expect(res.body.ISBN).to.equal("1234");
          done();
        });
    });
    it("returns an error if book does not exist", (done) => {
      request(app)
        .get(`/books/1234`)
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The book could not be found.");
          done();
        });
    });
  });
  describe("GET /books", () => {
    it("returns all the books in the db", (done) => {
      request(app)
        .get(`/books/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });
  describe("PATCH /books/:bookId", () => {
    it("updates a book", (done) => {
      request(app)
        .patch(`/books/${book.id}`)
        .send({
          title: "updatedTitle",
          ISBN: "updatedISBN",
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          Book.findByPk(book.id).then((updatedBook) => {
            expect(updatedBook.title).to.equal("updatedTitle");
            expect(updatedBook.ISBN).to.equal("updatedISBN");
          });
          done();
        });
    });
    it("returns an error if the book does not exist", (done) => {
      request(app)
        .patch(`/books/1234`)
        .send({
          title: "updatedTitle",
          ISBN: "updatedISBN",
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The book could not be found.");
          done();
        });
    });
  });
  describe("DELETE /books/:bookId", () => {
    it("deletes a book", (done) => {
      request(app)
        .delete(`/books/${book.id}`)
        .then((res) => {
          expect(res.status).to.equal(204);
          Book.findByPk(book.id, { raw: true }).then((deletedBook) => {
            expect(deletedBook).to.equal(null);
          });
          done();
        });
    });
    it("returns an error if book doesn't exist", (done) => {
      request(app)
        .delete(`/books/1234`)
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The book could not be found.");
          done();
        });
    });
  });
});
