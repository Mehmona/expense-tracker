// Init
const router = require("express").Router();

// All Routes
router.use("/auth", require("./auth"));
router.use("/expense", require("./expense"));

// Export
module.exports = router;
