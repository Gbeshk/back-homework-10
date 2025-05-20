const { deleteFromCloudinary } = require("../../config/claudinary.config");
const { readFile, writeFile } = require("../../utils");

const getAllExpenses = async (req, res) => {
  let page = Number(req.query.page) || 1;
  let take = Number(req.query.take) || 30;
  take = Math.min(30, take);

  const start = (page - 1) * take;
  const end = page * take;

  const expenses = await readFile("expenses.json", true);
  const paginatedExpenses = expenses.slice(start, end);

  res.json({
    page,
    take,
    total: expenses.length,
    data: paginatedExpenses,
  });
};

const addExpense = async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  //   if (!req.body?.title || !req.body?.price) {
  //     return res.status(400).json({ error: "Cotent is not provided" });
  //   }
  const lastId = expenses[expenses.length - 1]?.id || 0;

  const newExpense = {
    id: lastId + 1,
    title: req.body.title,
    price: req.body.price,
    image_url: req.file?.path,
  };

  expenses.push(newExpense);
  await writeFile("expenses.json", JSON.stringify(expenses));
  res
    .status(201)
    .json({ message: "expense created successfully", data: newExpense });
};

const deleteExpense = async (req, res) => {
  const secret = req.headers["secret"];
  if (secret !== "random123") {
    return res.status(401).json({ error: "You dont have permition" });
  }
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "expense not found" });
  }

  if (expenses[index].image_url) {
    const fileName = expenses[index].image_url.split("uploads/")[1];
    const fileId = fileName.split(".")[0];
    const publicFileId = `uploads/${fileId}`;
    await deleteFromCloudinary(publicFileId);
  }
  const deletedExpense = expenses.splice(index, 1);
  await writeFile("expenses.json", JSON.stringify(expenses));
  res.json({ message: "deleted successfully", data: deletedExpense });
};

const updateExpense = async (req, res) => {
  if (!req.body.title && !req.body.price) {
    return res.status(400).json({ error: "title or price are required" });
  }
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "expense not found" });
  }

  if (req.file?.path && expenses[index].image_url) {
    const fileName = expenses[index].image_url.split("uploads/")[1];
    const fileId = fileName.split(".")[0];
    const publicFileId = `uploads/${fileId}`;
    await deleteFromCloudinary(publicFileId);
  }
  expenses[index] = {
    ...expenses[index],
    title: req.body?.title,
    price: req.body?.price,
    image_url: req.file?.path,
  };
  await writeFile("expenses.json", JSON.stringify(expenses));
  res
    .status(201)
    .json({ message: "updated successfully", data: expenses[index] });
};

module.exports = { getAllExpenses, addExpense, deleteExpense, updateExpense };
