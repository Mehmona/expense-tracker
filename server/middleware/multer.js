const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
});

exports.upload = multer({ storage: storage });
