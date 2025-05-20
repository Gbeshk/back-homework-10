const { Router } = require("express");
const path = require("path");

const {
  getAllExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} = require("./expenses.service");
const hasKeyMiddleware = require("../../middlewares/hasKey.middleware");
const allKeysMiddleware = require("../../middlewares/allKeys.middleware");
const expensesRouter = Router();
const multer = require("multer");
const { upload } = require("../../config/claudinary.config");

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
  allKeysMiddleware,
  addExpense
);
expensesRouter.delete("/:id", hasKeyMiddleware, deleteExpense);
expensesRouter.put(
  "/:id",
  upload.single("images"),
  updateExpense
);

module.exports = expensesRouter;

// Add following functionality to prev task 11.

// 1) add image upload using multer and cloudinary
// 2) add validation to upload max 3 mb of image
// 3) when you edit image each expense you should delete prev image from cloudinary
// 4) when you delete expense you also should delete this image from clodinary.
