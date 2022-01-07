const express = require("express");
const bodyParser = require("body-parser");
var port = process.env.PORT || 3000;
const app = express();
const { Server } = require("socket.io");
const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

const mongoose = require("mongoose");
const User = require("./model/credentials");
const DBURI =
  "mongodb+srv://dhruvil1808:Dhruvil1234@dhruvils-db.6wkxh.mongodb.net/ChatApp?retryWrites=true&w=majority";

app.set("view engine", "ejs");
mongoose
  .connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("user connected" + socket.id);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});

app.post("/create-user", (req, res) => {
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
      console.log(err);
    });
});
app.get("/", (req, res) => {
  res.render("index", { title: "ChatApp", alrt: "" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/chat", async (req, res) => {
  const name = req.query.search1;
  const pass = req.query.search2;
  const result = await User.findOne({ username: name, password: pass });
  if (result != null) {
    res.render("chat", {
      user: result,
      title: result.username,
    });
  } else {
    res.render("index", { title: "ChatApp", alrt: "Invalid Credentials" });
  }
});
app.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
});
app.use((req, res) => {
  res.render("404", { title: "404 Error" });
});
