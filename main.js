// 1) Craete routes and grouped all expenses into routes.
// 2) Add services file where you write all logics.
// 3) Create a middleware and add this middleware on delete route. check if you does not provided some key from headers, throw errors.
// 4) Create a middleware that add craete expense route and check if user pass all required fields, otherwise throw errors.
// 5) Create a /random-fact route that returs some random fact about anything that you want, create a middleware that adds to random route
// and randomly half of request blocks and half of requests pass.
const express = require("express");
const expensesRouter = require("./routes/expenses/expenses.route");
const randomRouter = require("./routes/random-fact/random-fact.route");

const app = express();
app.use(express.json());
app.use("/expenses", expensesRouter);
app.use("/random-fact", randomRouter);

app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
