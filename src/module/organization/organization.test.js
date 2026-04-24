import request from "supertest";
import app from "../app.js"; // your express app
import Organization from "../modules/org/organization.model.js";





describe("POST /create-org", () => {

  afterEach(async () => {
    await Organization.deleteMany();
  });

  test("should create a new organization", async () => {
    const res = await request(app)
      .post("/create-org")
      .send({ organizationName: "Google" });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
  });

  test("should fail if organization already exists", async () => {
    await Organization.create({
      organizationName: "Google",
      organizationId: 1,
    });

    const res = await request(app)
      .post("/create-org")
      .send({ organizationName: "Google" });

    expect(res.statusCode).toBe(500); // or 400 if you fix
    expect(res.body.status).toBe("failed");
  });

  test("should fail if organizationName is missing", async () => {
    const res = await request(app)
      .post("/create-org")
      .send({});

    expect(res.statusCode).toBe(500);
  });

});









describe("PUT /update-org", () => {
  let org;
  beforeEach(async () => {
    org = await Organization.create({
      organizationName: "Google",
      organizationId: 1,
    });
    return org;
  });

  afterEach(async () => {
    await Organization.deleteMany();
  });

  test("should update organization", async () => {
    const res = await request(app)
      .put("/update-org")
      .send({
        organizationId: 1,
        organizationName: "Meta",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });

  test("should fail if organization not found", async () => {
    const res = await request(app)
      .put("/update-org")
      .send({
        organizationId: 999,
        organizationName: "Meta",
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe("failed");
  });

});




