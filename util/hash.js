const crypto = require("crypto");

const hashed = {};
hashed.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    let hash = crypto
      .createHmac("sha256", process.env.SECRET_KEY)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

module.exports = hashed;
