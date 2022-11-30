const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

const routes = require("./routes/routes");
app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
