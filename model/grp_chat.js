const { json } = require("body-parser");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const grp_chat = new schema({
  //creating a schema
  roomId: { type: String, required: true },
  roomName: { type: String, required: true },
  roomMembers: { type: Array, required: true },
});
const grp_Chat = mongoose.model("Chat", grp_chat); //creating a model with schema
module.exports = grp_Chat;
