let btn = document.getElementById("btn");
let content = document.getElementById("content");
let voice = document.getElementById("voice");

function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    let synth = window.speechSynthesis;
    let voices = synth.getVoices();

    let preferredVoice = voices.find(voice => 
        voice.name.includes("Male") || voice.name.includes("Deep") || voice.name.includes("Barry")
    ) || voices.find(voice => voice.lang.includes("en")) || voices[0];

    utterance.voice = preferredVoice;
    utterance.lang = preferredVoice ? preferredVoice.lang : "en-US";
    utterance.rate = 1;
    utterance.pitch = 0.8;
    utterance.volume = 1.0;

    utterance.onstart = () => {
        console.log("Speech started...");
        let r = setInterval(() => {
            console.log("Checking speech status:", synth.speaking);
            if (!synth.speaking) {
                clearInterval(r);
            } else {
                synth.pause();
                synth.resume();
            }
        }, 14000);
    };

    utterance.onend = () => console.log("Speech ended.");
    utterance.onerror = (event) => console.error("Speech error:", event);

    synth.cancel();
    setTimeout(() => {
        synth.speak(utterance);
    }, 100);
}

window.speechSynthesis.onvoiceschanged = () => {
    console.log("Available voices:", speechSynthesis.getVoices());
};

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let transcript = event.results[event.results.length - 1][0].transcript;
    content.innerText = transcript;
    console.log("User Input:", transcript);
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function sendMessageToChatbot(message) {
    fetch("https://myclone-production.up.railway.app/clone_chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.response) {
            console.log("Chatbot Response:", data.response);
            speak(data.response);
        } else {
            console.error("Error in chatbot response:", data.error);
        }
    })
    .catch(error => console.error("Error communicating with chatbot:", error));
}

function takeCommand(message) {
    if (message.toLowerCase().includes("linkedin")) {
        window.open("https://www.linkedin.com/in/hrithikraisaxena/", "_blank");
    } else if (message.toLowerCase().includes("github")) {
        window.open("https://github.com/HrithikRai", "_blank");
    } else if (message.toLowerCase().includes("blogs")) {
        window.open("https://medium.com/@hrithikraisaxena97", "_blank");
    } else {
        sendMessageToChatbot(message);
    }
    
    btn.style.display = "flex";
    voice.style.display = "none";
}
