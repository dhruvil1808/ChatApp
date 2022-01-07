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
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
socket.on("message", (data) => {
  appendMessage(data, "incoming"); //appending div to message area
  scrollToBottom();
});
const sendMessage = () => {
  const info = document.querySelector(".message").value;
  const v1 = document.getElementById("textarea");
  data = { info, username };
  v1.value = "";
  if (info.length > 0) {
    appendMessage(data, "row justify-content-end height-fit-content");
    scrollToBottom(); //appending div to message area
    socket.emit("message", data);
  }
};

function appendMessage(data, type) {
  let maindiv = document.createElement("div"); //creating new div
  maindiv.className = type;
  maindiv.innerHTML = `
     <div class="card float-right"> 
      <h4 class="card-title">${data.username}</h4>
      <p class="card-text">${data.info}</p>
      </div>
  `; //injecting data into div
  messageArea.appendChild(maindiv); //appending div to message area
}

//function scrollToBottom() {}
