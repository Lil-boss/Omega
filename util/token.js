const jwt = require("jsonwebtoken");

exports.auth = (user) => {
  const payload = {
    email: user.email,
  };
  const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};
