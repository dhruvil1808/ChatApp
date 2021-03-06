const socket = io("http://localhost:3001");
socket.on("connection");
let messageArea = document.querySelector(".message__area");
textarea.addEventListener("keyup", (e) => {
  //to listen for enter key press
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
socket.on("message", (data) => {
  //listening for message from server
  appendMessage(data, "incoming"); //appending div to message area
  scrolltoBottom();
});
const sendMessage = () => {
  //to send message to server
  const temp = document.querySelector(".message").value;
  const v1 = document.getElementById("textarea");
  info = temp.trim();
  data = { info, username };
  v1.value = ""; //clearing the textarea after sending message
  if (info.length > 0) {
    socket.emit("message", data); //sending to the server before editing username to You as I wanted to display You in the users page
    appendMessage(data, "row justify-content-end "); //appending data to message area height-fit-content
    scrolltoBottom();
  }
};
function appendMessage(data, type) {
  //to append message to message area
  if (type !== "incoming") {
    data.username = "You";
  }
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
function scrolltoBottom() {
  chatWindow = document.getElementById("chat-window");
  chatWindow.scrollTo(0, chatWindow.scrollHeight);
}
