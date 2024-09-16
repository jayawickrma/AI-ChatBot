const sendChatBtn =document.querySelector(".chat-input span");
const chatInput =document.querySelector(".chat-input textarea");
const Chatbox=document.querySelector(".Chatbox");
const ChatToggler=document.querySelector(".Chatbot-toggler");
const chtbotCloseBtn =document.querySelector(".close-btn")
let userMessege;

const API_KEY ="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";

const createChatLi =(message ,className) =>{
    const chatLi =document.createElement("li")
    chatLi.classList.add("chat",className);
    let ChatContent =className === "outgoing" ?' <p></p> ':
       ' <span class="material -symbols-outlined">smart_toy</span><p></p>';
        chatLi.innerHTML=ChatContent;
        chatLi.querySelector("p").textContent =message;
        return chatLi;
}
const generateResponce =(incommingChatLi) =>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement=incommingChatLi.querySelector("p")

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
    fetch(API_URL,requestOptions).then(res =>res.json()).then(data =>{
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error)=>{
        messageElement.classList.add("error");
        messageElement.textContent = "Ooops! something went wrong. Please try again.";
    }).finally(() =>Chatbox.scrollTo(0,Chatbox.scrollHeight));
}
const handleChat = ()=>{
    userMessege = chatInput.value.trim()
    if (!userMessege)return;
    chatInput.value ="";

    Chatbox.appendChild(createChatLi(userMessege,"outgoing"));
    Chatbox.scrollTo(0,Chatbox.scrollHeight)

    setTimeout(()=>{
        const incommingChatLi=createChatLi("Thinking...","incomming")
        Chatbox.appendChild(incommingChatLi);
        Chatbox.scrollTo(0,Chatbox.scrollHeight)
        generateResponce(incommingChatLi);
    },600)
}
ChatToggler.addEventListener("click",()=>document.body.classList.toggle("show-Chatbot"));
sendChatBtn.addEventListener("click" ,handleChat);
chtbotCloseBtn.addEventListener("click",() =>document.body.classList.remove("show-Chatbot"))