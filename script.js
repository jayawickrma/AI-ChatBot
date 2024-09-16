const sendChatBtn =document.querySelector(".chat-input span");
const chatInput =document.querySelector(".chat-input textarea");
const Chatbox=document.querySelector(".Chatbox")
let userMessege;

const createChatLi =(message ,className) =>{
    const chatLi =document.createElement("li")
    chatLi.classList.add("chat",className);
    let chatContent =className === "outgoing" ?' <p>${message}</p> ':
       ' <span className="material -symbols-outlined">smart_toy</span><p>${message}</p>';
        chatLi.innerHTML=chatContent;
        return chatLi
}
const handleChat = ()=>{
    userMessege = chatInput.value.trim()
    if (!userMessege)return;

    Chatbox.appendChild(createChatLi(userMessege,"outgoing"));
}
sendChatBtn.addEventListener("click",handleChat);