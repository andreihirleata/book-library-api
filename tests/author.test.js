const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Author } = require("../src/sequelize");

describe("/Authors", () => {
  let author;
  let author1;

  before(async () => {
    try {
      await Author.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Author.destroy({ where: {} });
      author = await Author.create({
        author: "mockAuthor",
      });
      author1 = await Author.create({
        author: "mockAuthor1",
      });
    } catch (err) {
      console.log(err);
    }
  });
  describe("POST /authors", () => {
    it("creates a new author", (done) => {
      request(app)
        .post("/authors")
        .send({
          author: "test",
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.author).to.equal("test");
          done();
        });
    });
  });
  describe("GET /author/:authorId", () => {
    it("gets an author given an id", (done) => {
      request(app)
        .get(`/authors/${author.id}`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.author).to.equal("mockAuthor");
          done();
        });
    });
    it("returns an error if author does not exist", (done) => {
      request(app)
        .get(`/authors/1234`)
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The author could not be found.");
          done();
        });
    });
  });
  describe("GET /authors", () => {
    it("returns all the authors in the db", (done) => {
      request(app)
        .get(`/authors/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });
  describe("PATCH /author/:authorId", () => {
    it("updates an author", (done) => {
      request(app)
        .patch(`/authors/${author.id}`)
        .send({
          author: "updatedAuthor",
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          Author.findByPk(author.id).then((updatedAuthor) => {
            expect(updatedAuthor.author).to.equal("updatedAuthor");
          });
          done();
        });
    });
    it("returns an error if the author does not exist", (done) => {
      request(app)
        .patch(`/authors/1234`)
        .send({
          author: "updatedAuthor",
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The author could not be found.");
          done();
        });
    });
  });
  describe("DELETE /authors/:authorId", () => {
    it("deletes an author", (done) => {
      request(app)
        .delete(`/authors/${author.id}`)
        .then((res) => {
          expect(res.status).to.equal(204);
          Author.findByPk(author.id, { raw: true }).then((deletedAuthor) => {
            expect(deletedAuthor).to.equal(null);
          });
          done();
        });
    });
    it("returns an error if author doesn't exist", (done) => {
      request(app)
        .delete(`/authors/1234`)
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The author could not be found.");
          done();
        });
    });
  });
});
