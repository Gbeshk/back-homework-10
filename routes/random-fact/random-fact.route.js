const { Router } = require("express");
const { getRandomFact } = require("./random-fact.service");
const halfMiddleware = require("../../middlewares/half.middleware");
const randomRouter = Router();

randomRouter.get("/", halfMiddleware, getRandomFact);

module.exports = randomRouter;
