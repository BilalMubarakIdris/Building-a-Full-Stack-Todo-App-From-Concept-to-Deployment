// test/auth.test.js
const request = require("supertest");
const app = require("../server");
const User = require("../src/models/User");

describe("Authentication", () => {
  beforeEach(async () => {
    await User.deleteMany(); // Clean database before each test
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(res.statusCode).toEqual(302); // Redirect after success
    expect(res.header.location).toBe("/tasks");
  });

  it("should not register with existing email", async () => {
    // Create user first
    await User.create({
      username: "existinguser",
      email: "test@example.com",
      password: "password123",
    });

    // Try to create another user with same email
    const res = await request(app).post("/register").send({
      username: "newuser",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(res.statusCode).toEqual(200); // Stays on same page
    expect(res.text).toContain("Email already registered");
  });
});
