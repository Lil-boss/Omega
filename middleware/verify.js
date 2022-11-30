const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({
        status: "Failed",
        error: "your are not logged in",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.PRIVATE_KEY);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({
      status: "Failed",
      error: "Invalid token",
    });
  }
};
