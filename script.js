const sendChatBtn =document.querySelector(".chat-input span");
const chatInput =document.querySelector(".chat-input textarea");
const Chatbox=document.querySelector(".Chatbox");
const ChatToggler=document.querySelector(".Chatbot-toggler");
const chtbotCloseBtn =document.querySelector(".close-btn")
let userMessege;

const API_KEY ="";
const inputInitHeight =chatInput.scrollHeight;
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
    chatInput.style.height =`${inputInitHeight}px`;

    Chatbox.appendChild(createChatLi(userMessege,"outgoing"));
    Chatbox.scrollTo(0,Chatbox.scrollHeight)

    setTimeout(()=>{
        const incommingChatLi=createChatLi("generating your answer...","incomming")
        Chatbox.appendChild(incommingChatLi);
        Chatbox.scrollTo(0,Chatbox.scrollHeight)
        generateResponce(incommingChatLi);
    },600)
}

chatInput.addEventListener("keydown",(e)=>{
    if (e.key ==="Enter" && window.innerWidth>800){
        e.preventDefault();
        handleChat();
    }
});

ChatToggler.addEventListener("click",()=>document.body.classList.toggle("show-Chatbot"));
sendChatBtn.addEventListener("click" ,handleChat);
chtbotCloseBtn.addEventListener("click",() =>document.body.classList.remove("show-Chatbot"))