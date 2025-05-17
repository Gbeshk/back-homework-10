const { Router } = require("express");
const {
  getAllExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} = require("./expenses.service");
const hasKeyMiddleware = require("../../middlewares/hasKey.middleware");
const allKeysMiddleware = require("../../middlewares/allKeys.middleware");

const expensesRouter = Router();

expensesRouter.get("/", getAllExpenses);
expensesRouter.post("/", allKeysMiddleware, addExpense);
expensesRouter.delete("/:id", hasKeyMiddleware, deleteExpense);
expensesRouter.put("/:id", updateExpense);

module.exports = expensesRouter;
