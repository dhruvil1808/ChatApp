const socket = io("http://localhost:3001");
socket.on("connection");
let messageArea = document.querySelector(".message__area");
/* socket.on("message", (data) => {
  document.querySelector("h3").innerHTML = data;
});
const sendMessage = () => {
  const info = document.querySelector(".message").value;
  socket.emit("message", info);
}; */

socket.on("message", (data) => {
  let maindiv = document.createElement("div"); //creating new div
  maindiv.className = "incoming_msg";
  maindiv.innerHTML = `
     <div class="card"> 
      <h4 class="chat-user">${data.username}</h4>
      <p class="chat-message">${data.info}</p>
      </div>
  `; //injecting data into div
  messageArea.appendChild(maindiv); //appending div to message area
});
const sendMessage = () => {
  const info = document.querySelector(".message").value;
  const v1 = document.getElementById("textarea");
  v1.value = "";
  data = { info, username };
  socket.emit("message", data);
};
