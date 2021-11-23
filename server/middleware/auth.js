const JWT = require("jsonwebtoken");
const User = require("../models/user");

function auth() {
  return async (req, res, next) => {
    const header = req.get("Authorization");

    if (!header || !header.startsWith("Bearer")) {
      return res
        .status(404)
        .send({ message: "Unauthorized access: Token not found" });
    }
    const token = header.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    let user = await User.findOne({ _id: decoded.id });
    if (!user)
      return res
        .status(401)
        .send({ message: "Unauthorized access: User does not exist" });

    req.user = user;
    req.userId = user._id;

    next();
  };
}

module.exports = auth;
