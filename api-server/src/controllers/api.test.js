const request = require("supertest");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const User = require("../models/User");
const Book = require('../models/Book')
const generateTestAuthToken = require("../utils/auth");
let app;
let authToken;
let fakeToken = "f4t0k3n"
let idBook
const newName = "NewName!"

const testImage = `${__dirname}/../../testimg/unsplash.jpg`
const imgStream = fs.createReadStream(testImage)

const MIN = 3000;
const MAX = 10000;

const username = faker.person.fullName();
const email = faker.internet.email();
const password = "toto123";

const userData = {
    username: username,
    email: email,
    password: password,
};

const bookData = {
  username: username,
  name: "bookname",
  category: "SF",
  description: "totodescription",
  note: 5,
  comments: [],
};

function getRandomPort() {
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

describe("/api/books", () => {
  beforeAll(async () => {
    delete require.cache[require.resolve("../server")];
    const server = require("../server.js");
    app = await server.start();
    app = await app.listen(getRandomPort());

    const user = await User.create(userData);
    authToken = generateTestAuthToken(user._id);
  });

  afterAll(async () => {
    await User.deleteMany({})
    await Book.deleteMany({})
    app.close();
  });

  // BOOKS

  it("should post one book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${authToken}`)
      .field("username", bookData.username)
      .field("name", bookData.name)
      .field("category", bookData.category)
      .field("description", bookData.description)
      .field("note", bookData.note)
      .field("comments", bookData.comments)
      .attach("image", imgStream);
    expect(res.status).toBe(201);
    idBook = res.body.savedBook._id
  });

  it("should get books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
  });

  it("should return one book", async() => {
    const res = await request(app).get(`/api/books/${idBook}`)
    expect(res.status).toBe(200);
  });

  it("should return an error for modifying, Unauthorized request", async() => {
    const res = await request(app).put(`/api/books/${idBook}`)
    .field('name', newName)
    .set("Authorization", `Bearer ${fakeToken}`)
    expect(res.status).toBe(403)
  })

  it("should modify one book", async() => {
    const res = await request(app).put(`/api/books/${idBook}`)
    .field("name",newName)
    .set("Authorization", `Bearer ${authToken}`)
    expect(res.status).toBe(200)
  })

  it("should post a commentary on one book", async () => {
    const commentary = {
      comment: faker.word.adjective(),
      username: username
    }
    const res = await request(app).post(`/api/books/${idBook}/commentary`)
    .set("Authorization", `Bearer ${authToken}`)
    .send(commentary)
    expect(res.status).toBe(201)
  })

  it("should return an error for deleting, Unauthorized Request", async() => {
    const res = await request(app).delete(`/api/books/${idBook}`)
    .set("Authorization", `Bearer ${fakeToken}`)
    expect(res.status).toBe(403)
  })

  it("should return an error, ID doesn't exist", async() => {
    const fakeID = 'e4f5hl7lmef3'
    const res = await request(app).delete(`/api/books/${fakeID}`)
    .set("Authorization", `Bearer ${authToken}`)
    expect(res.status).toBe(404)
  })

  it("should delete one book", async() => {
    const res = await request(app).delete(`/api/books/${idBook}`)
    .set("Authorization", `Bearer ${authToken}`)
    expect(res.status).toBe(200)
  })


  // AUTH

  const newUser = {
    username: faker.person.fullName(),
    email: faker.internet.email(),
    password: "fakePassword123"
  }

  it("should sign in", async() => {
    const res = await request(app).post('/api/auth/signup')
    .send(newUser)
    expect(res.status).toBe(201)
  })

  const toto = {
    email: faker.internet.email(),
    password: "123password"
  }

  it("should return an error for login, user doesn't exist" , async() => {
    const res = await request(app).post('/api/auth/login')
    .send(toto)
    expect(res.status).toBe(401)
  })

  it("should return an error for login, wrong password or identifier", async() => {
    const res = await request(app).post('/api/auth/login')
    .send({ email: userData.email, password: "123" })
    expect(res.status).toBe(401)
  })

  it("should login", async() => {
    const res = await request(app).post('/api/auth/login')
    .send({ email: newUser.email, password: newUser.password })
    expect(res.status).toBe(200)
  })
});

