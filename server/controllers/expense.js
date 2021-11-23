const Expense = require("../models/expense");
const User = require("../models/user");

//get single Expense

exports.getSingleExpense = async (req, res) => {
  try {
    let ExpenseId = req.params.id;
    let expense = await Expense.findOne({ _id: ExpenseId }); // Check if Expense exist
    if (!expense) return res.status(404).send({ message: "Expense not found" });

    return res.json({ expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all Expenses by user

exports.getAllExpenses = async (req, res) => {
  try {
    let userId = req.user.id;
    let expenses = await Expense.find({ userId: userId }).sort([
      ["createdAt", -1],
    ]); // get all Expenses
    return res.json({ expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//search Expenses by user

exports.searchExpenses = async (req, res) => {
  try {
    let userId = req.user.id;
    let searchItem = req.params.search;
    let expenses = await Expense.find({
      $and: [{ amount: searchItem }, { userId: userId }],
    }).sort([["createdAt", -1]]); // get all Expenses
    return res.json({ expenses });
  } catch (error) {
    console.log("Error--->", error.message);
    res.status(500).json({ message: error.message });
  }
};

//create Expense
exports.createExpense = async (req, res) => {
  try {
    let userId = req.user.id;
    req.body.userId = userId;
    await Expense.create(req.body);
    let expenses = await Expense.find({ userId: userId });

    res.json({ message: "Expense Created Successfully", expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update Expense

exports.updateExpense = async (req, res) => {
  try {
    let ExpenseId = req.params.id;
    const { amount, description, comment, date } = req.body;
    let expense = await Expense.findOne({ _id: ExpenseId }); // Check if Expense exist
    if (!expense)
      return res.status(404).send({ message: "Expense not found!" });

    await Expense.findOneAndUpdate(
      //update Expense
      {
        _id: ExpenseId,
      },
      {
        $set: {
          amount: amount,
          date: date,
          description: description,
          comment: comment,
        },
      },
      {
        new: true,
      }
    );
    let expenses = await Expense.find({});

    res.json({ message: "Expense updated", expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete single Expense

exports.deleteExpenseByUser = async (req, res) => {
  try {
    let ExpenseId = req.params.id;
    let userId = req.user.id;

    let expense = await Expense.findOne({ _id: ExpenseId }); // Check if Expense exist
    if (!expense) return res.status(404).send({ message: "Expense not found" });
    await Expense.findByIdAndRemove({ _id: ExpenseId }); //remove Expense
    let expenses = await Expense.find({ userId: userId });
    return res.json({ message: "Expense Deleted Successfully", expenses });
  } catch (error) {
    console.log("Error------>", error);
    res.status(500).json({ message: error.message });
  }
};
