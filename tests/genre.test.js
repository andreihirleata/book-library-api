const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Genre } = require("../src/sequelize");

describe("/genres", () => {
  let genre;
  let genre1;

  before(async () => {
    try {
      await Genre.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Genre.destroy({ where: {} });
      genre = await Genre.create({
        genre: "mockGenre",
      });
      genre1 = await Genre.create({
        genre: "mockGenre1",
      });
    } catch (err) {
      console.log(err);
    }
  });
  describe("POST /genres", () => {
    it("creates a new genre", (done) => {
      request(app)
        .post("/genres")
        .send({
          genre: "test",
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.genre).to.equal("test");
          done();
        });
    });
  });
  describe("GET /genre/:genreId", () => {
    it("gets an genre given an id", (done) => {
      request(app)
        .get(`/genres/${genre.id}`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.genre).to.equal("mockGenre");
          done();
        });
    });
    it("returns an error if genre does not exist", (done) => {
      request(app)
        .get(`/genres/1234`)
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The genre could not be found.");
          done();
        });
    });
  });
  describe("GET /genres", () => {
    it("returns all the genres in the db", (done) => {
      request(app)
        .get(`/genres/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });
  describe("PATCH /genres/:genreId", () => {
    it("updates a genre", (done) => {
      request(app)
        .patch(`/genres/${genre.id}`)
        .send({
          genre: "updatedGenre",
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          Genre.findByPk(genre.id).then((updatedGenre) => {
            expect(updatedGenre.genre).to.equal("updatedGenre");
          });
          done();
        });
    });
    it("returns an error if the genre does not exist", (done) => {
      request(app)
        .patch(`/genres/1234`)
        .send({
          author: "updatedGenre",
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The genre could not be found.");
          done();
        });
    });
  });
  describe("DELETE /genres/:genreId", () => {
    it("deletes a genre", (done) => {
      request(app)
        .delete(`/genres/${genre.id}`)
        .then((res) => {
          expect(res.status).to.equal(204);
          Genre.findByPk(genre.id, { raw: true }).then((deletedGenre) => {
            expect(deletedGenre).to.equal(null);
          });
          done();
        });
    });
    it("returns an error if genre doesn't exist", (done) => {
      request(app)
        .delete(`/genres/1234`)
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The genre could not be found.");
          done();
        });
    });
  });
});
