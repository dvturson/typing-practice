const quoteDisplay = document.getElementById("quote-display");
const startBtn = document.getElementById("start-btn");

const quotes = [
   "The beautiful garden, filled with vibrant flowers and lush greenery, provided a peaceful escape from the busy city life, allowing visitors to relax and enjoy nature’s calming presence while listening to the gentle sounds of birds singing in the early morning sunlight.", 
   "During the conference, experts from around the world discussed innovative solutions to combat climate change, emphasizing the importance of sustainable practices, renewable energy, and international cooperation to ensure a healthier planet for future generations to thrive and prosper in a cleaner, safer environment.", 
   "The novel’s complex characters and intricate plot captivated readers, weaving together themes of love, loss, and redemption in a way that kept everyone eager to turn the page and discover how each person’s journey would ultimately unfold against the backdrop of a rapidly changing society.", 
   "After months of preparation and hard work, the team finally launched their groundbreaking app, designed to help users track their fitness goals, monitor nutrition, and connect with others for motivation, making it easier than ever to lead a healthier, more active lifestyle in a digital age.", 
   "Traveling through the ancient city, tourists marveled at the stunning architecture, historic landmarks, and vibrant street markets, where the aroma of local spices filled the air and artisans displayed their crafts, offering a unique glimpse into the culture and traditions that had endured for centuries."
    // "typing practice is practice"
];

let currentQuote; 
let typedValue = "";
let incorrectChars = 0;
let startTime;
let endTime;
let finished = false;

function normalize(text) {
    return text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function getRandomQuote () {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return normalize(quotes[randomIndex]);
}

// replaced string quote with char span quote
function displayQuote(quote) {
    quoteDisplay.innerHTML = "";
    const characters = quote.split("");

    characters.forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;

        quoteDisplay.appendChild(span);
    });
}

function updateQuoteColor() {
    const quoteSpans = quoteDisplay.querySelectorAll("span");
    console.log(incorrectChars);

    quoteSpans.forEach((span, index) => {
        const typedChar = typedValue[index];
        span.className = "";
        if (typedChar === undefined) return;

        const isCorrent = typedChar === span.textContent;
        const isSpace = span.textContent === " ";
        span.classList.add(
            isSpace ? (isCorrent ? "correctSpace" : "wrongSpace")
                    : (isCorrent ? "correct" : "wrong")
        );

    });
}

function checkFinish() {
    if (!startTime) {
        startTime = new Date();
    }

    if (currentQuote.length === typedValue.length) {
        console.log("finished");
        finished = true;
        endTime = new Date();
        const timeTaken  = (endTime - startTime) / 1000 / 60;
        const wordCount = currentQuote.split(" ").length;
        const charCount  = currentQuote.length;

        const wpm = Math.round(wordCount / timeTaken);
        const cps = Math.round(charCount / timeTaken / 60);
        const accuracy = Math.round((1 - (incorrectChars / charCount)) * 100);

        document.getElementById("wordSpeed").textContent = wpm;     // word per minute
        document.getElementById("charSpeed").textContent = cps;     // char per second
        document.getElementById("accuracy").textContent = accuracy; // cumulative
    }
}

// START BUTTON
startBtn.addEventListener("click", () => {
    typedValue = "";
    incorrectChars = 0;
    finished = false;
    const randomQuote = getRandomQuote();
    currentQuote = randomQuote; // used to check finish
    displayQuote(randomQuote);

    // reset results
    document.getElementById("wordSpeed").textContent = "0";
    document.getElementById("charSpeed").textContent = "0";
    document.getElementById("accuracy").textContent = "0";
    startTime = null;
})

// TYPED KEY
document.addEventListener("keydown", (e) => {
    // ignore ctrl / cmd keys
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (!currentQuote || finished) return;

    const key = e.key;

    if (key === " " || key === "Spacebar") {
        e.preventDefault();
    }

    if (key === "Backspace") {
        typedValue = typedValue.slice(0, -1);
    } else if (key.length == 1) {
        if (key !== currentQuote[typedValue.length]) incorrectChars++;
        typedValue += key;
    }

    updateQuoteColor();
    checkFinish();
})