const quoteDisplay = document.getElementById("quote-display");
const startBtn = document.getElementById("start-btn");
const quoteInput = document.getElementById("quote-input");

const quotes = [
   "The beautiful garden, filled with vibrant flowers and lush greenery, provided a peaceful escape from the busy city life, allowing visitors to relax and enjoy nature’s calming presence while listening to the gentle sounds of birds singing in the early morning sunlight.", 
   "During the conference, experts from around the world discussed innovative solutions to combat climate change, emphasizing the importance of sustainable practices, renewable energy, and international cooperation to ensure a healthier planet for future generations to thrive and prosper in a cleaner, safer environment.", 
   "The novel’s complex characters and intricate plot captivated readers, weaving together themes of love, loss, and redemption in a way that kept everyone eager to turn the page and discover how each person’s journey would ultimately unfold against the backdrop of a rapidly changing society.", 
   "After months of preparation and hard work, the team finally launched their groundbreaking app, designed to help users track their fitness goals, monitor nutrition, and connect with others for motivation, making it easier than ever to lead a healthier, more active lifestyle in a digital age.", 
   "Traveling through the ancient city, tourists marveled at the stunning architecture, historic landmarks, and vibrant street markets, where the aroma of local spices filled the air and artisans displayed their crafts, offering a unique glimpse into the culture and traditions that had endured for centuries."
];

let currentQuote; 
let startTime;
let endTime;

function getRandomQuote () {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// 
function displayQuote(quote) {
    quoteDisplay.innerHTML = "";
    const characters = quote.split("");

    characters.forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;

        quoteDisplay.appendChild(span);
    });
    
}

// START BUTTON
startBtn.addEventListener("click", () => {
    quoteInput.value = "";
    quoteInput.focus();
    const randomQuote = getRandomQuote();
    currentQuote = randomQuote; // used to check finish
    displayQuote(randomQuote);

    // reset results
    document.getElementById("wordSpeed").textContent = "0";
    document.getElementById("charSpeed").textContent = "0";

    document.getElementById("accuracy").textContent = "0";
    startTime = null;
})

// INPUT BOX
quoteInput.addEventListener("input", () => {
    const typedValue = quoteInput.value;
    const currentSpans = quoteDisplay.querySelectorAll("span");
    console.log(currentSpans);
    
    if (!startTime) {
        startTime = new Date();
    }

    let correctChars = 0;

    currentSpans.forEach((span, index) => {
        const typedChar = typedValue[index];

        if (typedChar == null) {
            span.classList.remove("correct", "wrong");
        } else if (typedChar == span.textContent) {
            span.classList.add("correct");
            span.classList.remove("wrong");
            correctChars ++;
        } else {
            span.classList.add("wrong");
            span.classList.remove("correct");
        }
    })
    
    if (currentQuote === typedValue || currentQuote.length == typedValue.length) {
        console.log("finished");
        endTime = new Date;
        const timeTaken  = (endTime - startTime) / 1000 / 60;
        const wordCount = currentQuote.split(" ").length;
        const charCount  = currentQuote.length;
        const wpm = Math.round(wordCount / timeTaken);
        const cpm = Math.round(charCount / timeTaken);

        const accuracy = Math.round((correctChars / charCount) * 100);

        document.getElementById("wordSpeed").textContent = wpm;
        document.getElementById("charSpeed").textContent = cpm;
        document.getElementById("accuracy").textContent = accuracy;


    }
    console.log(currentQuote, typedValue)
})