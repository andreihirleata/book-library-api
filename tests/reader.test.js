const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Reader } = require("../src/sequelize");

describe("/readers", () => {
  let reader;
  let reader1;

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
        password: "12345678",
      });
      reader1 = await Reader.create({
        name: "mockName1",
        email: "mockMail1@mock.com",
        password: "123456789",
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe("POST /readers/", () => {
    it("creates a new reader in database", (done) => {
      request(app)
        .post("/readers/")
        .send({ name: "test", email: "testit@test.com", password: "12345678" })
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal("test");
          expect(res.body.email).to.equal("testit@test.com");
          expect(res.body.password).to.equal("12345678");
          done();
        });
    });
    it("returns an error if email is invalid", (done) => {
      request(app)
        .post("/readers")
        .send({
          name: "test",
          email: "thisisnotanemail",
          password: "12345678",
        })
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0].message).to.equal("email must be valid");
          done();
        });
    });
    it("returns an error if password is invalid", (done) => {
      request(app)
        .post("/readers")
        .send({
          name: "test",
          email: "test@testemail.com",
          password: "123458",
        })
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0].message).to.equal(
            "the password must have at least 8 characters"
          );
          done();
        });
    });
    it("doesn't allow missing fields", (done) => {
      request(app)
        .post("/readers")
        .send({ email: "test@testemail.com", password: "12345678" })
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0].message).to.equal("name is required");
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
          expect(res.body.password).to.equal(reader.password);
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
        .send({
          name: "updatedName",
          email: "updatedEmail@update.com",
          password: "updatedPassword",
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          Reader.findByPk(reader.id, { raw: true }).then((updatedReader) => {
            expect(updatedReader.name).to.equal("updatedName");
            expect(updatedReader.email).to.equal("updatedEmail@update.com");
            expect(updatedReader.password).to.equal("updatedPassword");
          });
          done();
        });
    });
    it("returns an error if reader doesn't exist", (done) => {
      request(app)
        .patch(`/readers/1234`)
        .send({
          name: "updatedName",
          email: "updatedEmail@update.com",
          password: "updatedPassword",
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The reader could not be found.");
          done();
        });
    });
    it("returns an error if email is invalid", (done) => {
      request(app)
        .patch(`/readers/${reader.id}`)
        .send({
          name: "updatedName",
          email: "updatedEmailupdatecom",
          password: "updatedPassword",
        })
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0].message).to.equal("email must be valid");
          done();
        });
    });
    it("returns an error if password is invalid", (done) => {
      request(app)
        .patch(`/readers/${reader.id}`)
        .send({
          name: "updatedName",
          email: "updatedEmail@update.com",
          password: "12345",
        })
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0].message).to.equal(
            "the password must have at least 8 characters"
          );
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
