const { Router } = require("express");
const path = require("path");

const {
  getAllExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  getDetails,
} = require("./expenses.service");
const hasKeyMiddleware = require("../../middlewares/hasKey.middleware");
const allKeysMiddleware = require("../../middlewares/allKeys.middleware");
const expensesRouter = Router();
const multer = require("multer");
const {
  upload,
  deleteFromCloudinary,
} = require("../../config/claudinary.config");
const { readFile, writeFile } = require("../../utils");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const fileName = Date.now() + path.extname(file.originalname);
//     cb(null, fileName);
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 3 * 1024 * 1024,
//   },
// });
expensesRouter.get("/", getAllExpenses);
expensesRouter.post(
  "/",
  upload.single("images"),
  // allKeysMiddleware,
  addExpense
);
expensesRouter.post(
  "/:id/delete",
  //  hasKeyMiddleware,
  deleteExpense
);
expensesRouter.get("/:id/details", getDetails);

expensesRouter.post(
  "/:id/update",
  upload.single("images"),
  async (req, res) => {
    const id = Number(req.params.id);
    const { title, price } = req.body;
    const expenses = await readFile("expenses.json", true);
    const index = expenses.findIndex((el) => el.id === id);
    if (index === -1) return res.status(400).send("user not found");

    if (req.file?.path && expenses[index].image_url) {
      const fileName = expenses[index].image_url.split("uploads/")[1];
      const fileId = fileName.split(".")[0];
      const publicFileId = `uploads/${fileId}`;
      await deleteFromCloudinary(publicFileId);
    }
    const updateReq = {};
    if (title) updateReq.title = title;
    if (price) updateReq.price = price;
    if (req.file?.path) updateReq.image_url = req.file.path;
    expenses[index] = {
      ...expenses[index],
      ...updateReq,
    };
    await writeFile("expenses.json", JSON.stringify(expenses));

    res.redirect("/");
  }
);

expensesRouter.get("/:id/update", async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);

  const expense = expenses.find((el) => el.id === id);
  if (!expense) return res.status(400).send("expense not found");

  res.render("pages/update.ejs", { expense });
});

expensesRouter.put("/:id", upload.single("images"), updateExpense);

module.exports = expensesRouter;
