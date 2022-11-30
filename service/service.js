const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//create user
exports.userCreateService = async (userData) => {
  const user = await prisma.User.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    const result = await prisma.User.create({ data: userData });
    return result;
  } else {
    const message = {
      status: 205,
      message: "user exits",
    };
    return message;
  }
};

//login
exports.logInService = async (loginData) => {
  const result = await prisma.User.findUnique({
    where: {
      email: loginData,
    },
  });
  return result;
};

exports.postCreateService = async (data) => {
  const result = await prisma.Post.create({ data: data });
  return result;
};
exports.postGetService = async () => {
  const result = await prisma.Post.findMany();
  return result;
};
