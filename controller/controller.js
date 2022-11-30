const {
  userCreateService,
  postCreateService,
  postGetService,
  logInService,
} = require("../service/service");
const { hash } = require("../util/hash");
const { auth } = require("../util/token");

exports.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const data = {
      email,
      name,
      password: hash(password),
    };

    if (data) {
      const result = await userCreateService(data);
      res.status(201).json({
        status: "success",
        data: result,
      });
    } else {
      res.status(204).json({
        status: "Please provide data",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Data find to Failed",
      error: error.message,
    });
  }
};
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(204).json({
        status: "fail",
        error: "please provide your credentials",
      });
    }

    const user = await logInService(email);
    if (!user) {
      res.status(404).json({
        message: "User not found, create new user",
      });
    }
    const pass = hash(password);
    if (user.password !== pass) {
      res.status(404).json({
        message: "credentials not found",
      });
    } else {
      const token = auth(user);
      res.status(201).json({
        status: "success",
        data: {
          user,
          token,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Data find to Failed",
      error: error.message,
    });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, published, authorId } = req.body;
  const blog = {
    title,
    content,
    published,
    authorId,
  };

  if (req.user) {
    const result = await postCreateService(blog);

    res.status(201).json({
      status: "success",
      data: result,
    });
  }
};
exports.getPost = async (req, res) => {
  try {
    if (req.user) {
      const result = await postGetService();
      res.status(201).json({
        status: "success",
        data: result,
      });
    }
  } catch (error) {}
};
