const express = require("express");

const { bindCurrentNamespace } = require("./utils/storage");
const { tenantHandler } = require("./utils/middleware");
const UserModel = require("./models/user.model");

const PORT = 9001;

const app = express();

app.use(bindCurrentNamespace);
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Hello" });
});
app.post("/users", tenantHandler, async (req, res) => {
  try {
    const user = await UserModel().save(req.body);
    res.send({ success: true, data: user });
  } catch (err) {
    throw err;
  }
});

app.listen(PORT, () => {
  console.log(`Listening to port:`, PORT);
});
