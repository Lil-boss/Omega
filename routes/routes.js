const router = require("express").Router();
const verify = require("../middleware/verify");
//controller
const {
  createUser,
  createPost,
  getPost,
  logIn,
} = require("../controller/controller");

//routes
router.route("/user").post(createUser);
router.route("/login").post(logIn);
router.route("/post").post(verify, createPost);
module.exports = router;
