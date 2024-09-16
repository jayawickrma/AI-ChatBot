const sendChatBtn =document.querySelector(".chat-input span");
const chatInput =document.querySelector(".chat-input textarea");
const Chatbox=document.querySelector(".Chatbox")
let userMessege;
const API_KEY ="";

const createChatLi =(message ,className) =>{
    const chatLi =document.createElement("li")
    chatLi.classList.add("chat",className);
    let ChatContent =className === "outgoing" ?' <p>${message}</p> ':
       ' <span class="material -symbols-outlined">smart_toy</span><p>${message}</p>';
        chatLi.innerHTML=ChatContent;
        return chatLi;
}
const generateResponce =() =>{
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user",content:userMessege}]
        })
    }
}
const handleChat = ()=>{
    userMessege = chatInput.value.trim()
    if (!userMessege)return;

    Chatbox.appendChild(createChatLi(userMessege,"outgoing"));

    setTimeout(()=>{
        Chatbox.appendChild(createChatLi("Thinking...","incomming"));
        generateResponce();
    },600)
}
sendChatBtn.addEventListener("click" ,handleChat)