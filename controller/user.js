const { v4: uuidv4 } = require("uuid");
const Users = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUsersSignUp(req, res) {
  const { name, password, email } = req.body;
  await Users.create({ name, password, email });
  return res.redirect("/");
}

async function handleUsersLogin(req, res) {
  const { password, email } = req.body;
  const user = await Users.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "invalid user name or password" });
  }
  // const sessionId = uuidv4();
  // console.log(setUser);
  const token = setUser(user);

  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUsersSignUp,
  handleUsersLogin,
};
