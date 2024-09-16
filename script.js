const sendChatBtn =document.querySelector(".chat-input span");
const chatInput =document.querySelector(".chat-input textarea")
let userMessege;
const handleChat = ()=>{
    userMessege = chatInput.value.trim()
    console.log(userMessege)
}
sendChatBtn.addEventListener("Click",handleChat)