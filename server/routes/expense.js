// Init
const router = require("express").Router();
const {
  createExpense,
  updateExpense,
  getSingleExpense,
  getAllExpenses,
  deleteExpenseByUser,
  searchExpenses,
} = require("../controllers/expense.js");
const {
  createExpenseValidator,
  isValidated,
} = require("../middleware/validators");
const auth = require("../middleware/auth");
// get single Expense
router.get("/:id", getSingleExpense);
// get All Expenses by user
router.get("/", auth(), getAllExpenses);
// search expense
router.get("/search/:search", auth(), searchExpenses);
// create Expense
router.post(
  "/create",
  auth(),
  createExpenseValidator,
  isValidated,
  createExpense
);
// update Expense
router.put(
  "/update/:id",
  auth(),
  createExpenseValidator,
  isValidated,
  updateExpense
);
// delete Expense By User
router.delete("/:id", auth(), deleteExpenseByUser);
// Export
module.exports = router;
