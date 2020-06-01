const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Reader } = require("../src/sequelize");

describe("/readers", () => {
  let reader;
  let reader2;

  before(async () => {
    try {
      await Reader.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Reader.destroy({ where: {} });
      reader = await Reader.create({
        name: "mockName",
        email: "mockMail@mock.com",
      });
      reader1 = await Reader.create({
        name: "mockName1",
        email: "mockMail1@mock.com",
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe("POST /readers/", () => {
    it("creates a new reader in database", (done) => {
      request(app)
        .post("/readers/")
        .send({ name: "test", email: "testit@test.com" })
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal("test");
          expect(res.body.email).to.equal("testit@test.com");
          done();
        });
    });
  });

  describe("GET /readers/:readerId", () => {
    it("gets a reader by id", (done) => {
      request(app)
        .get(`/readers/${reader.id}`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(reader.name);
          expect(res.body.email).to.equal(reader.email);
          done();
        });
    });
    it("returns an error if reader is not found", (done) => {
      request(app)
        .get(`/readers/1234`)
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The reader could not be found.");
          done();
        });
    });
  });

  describe("GET /readers/", () => {
    it("gets all readers from the database", (done) => {
      request(app)
        .get("/readers/")
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });

  describe("PATCH /readers/:readerId", () => {
    it("updates a reader given an id", (done) => {
      request(app)
        .patch(`/readers/${reader.id}`)
        .send({ name: "updatedName", email: "updatedEmail" })
        .then((res) => {
          expect(res.status).to.equal(200);
          Reader.findByPk(reader.id, { raw: true }).then((updatedReader) => {
            expect(updatedReader.name).to.equal("updatedName");
            expect(updatedReader.email).to.equal("updatedEmail");
          });
          done();
        });
    });
    it("returns an error if reader doesn't exist", (done) => {
      request(app)
        .patch(`/readers/1234`)
        .send({ name: "updatedName", email: "updatedEmail" })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The reader could not be found.");
          done();
        });
    });
  });
  describe("DELETE /readers/:readerId", () => {
    it("deletes a reader given an id", (done) => {
      request(app)
        .delete(`/readers/${reader.id}`)
        .then((res) => {
          expect(res.status).to.equal(204);
          Reader.findByPk(reader.id, { raw: true }).then((deletedReader) => {
            expect(deletedReader).to.equal(null);
            done();
          });
        });
    });
    it("returns an error if reader does not exit", (done) => {
      request(app)
        .delete(`/readers/1234`)
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The reader could not be found.");
          done();
        });
    });
  });
});
