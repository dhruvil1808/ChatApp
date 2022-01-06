const mongoose = require("mongoose");
const schema = mongoose.Schema; //create a schema

const chat = new schema( //creating a schema
  {
    chatId: { type: String, required: true },
    username: { type: String, required: true },
    body: { type: String, required: true },
    timestamps: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Chat = mongoose.model("Chat", chat); //creating a model with schema
module.exports = Chat;
