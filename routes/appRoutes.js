const express = require("express");
const User = require("../model/credentials");
const router = express.Router();

router.post("/create-user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.render("index", {
        title: "ChatApp",
        alrt: "User Created Successfully",
      });
    })
    .catch((err) => {
      res.render("404", { title: "404 Error" });
    });
});
router.get("/", (req, res) => {
  res.render("index", { title: "ChatApp", alrt: "" });
});
router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
router.get("/chat/:username/:select", async (req, res) => {
  const select = req.params.select;
  const username = req.params.username;
  res.render("chat", {
    title: username,
    select: select,
  });
});
router.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
});
router.get("/all-users", async (req, res) => {
  const name = req.query.search1;
  const pass = req.query.search2;
  const result = await User.findOne({ username: name, password: pass });
  if (result != null) {
    User.find({})
      .sort({ createdAt: -1 })
      .then((results) => {
        res.render("all-users", { users: results, title: result.username });
      })
      .catch((err) => {
        res.render("404", { title: "404 Error" });
      });
  } else {
    res.render("index", { title: "ChatApp", alrt: "Invalid Credentials" });
  }
});
router.use((req, res) => {
  res.render("404", { title: "404 Error" });
});

module.exports = router;
