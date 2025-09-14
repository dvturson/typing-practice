const quoteDisplay = document.getElementById("quote-display");
const startBtn = document.getElementById("start-btn");
const quoteInput = document.getElementById("quote-input");

const quotes = [
    "My name is Devran and I like biking.", 
    "Beep moop moop beep moop",
    "Test had a direct-to-streaming release via Netflix on 4 April 2025."
];

let currentQuote; 


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
})

// INPUT BOX
quoteInput.addEventListener("input", () => {
    const typedValue = quoteInput.value;
    const currentSpans = quoteDisplay.querySelectorAll("span");
    console.log(currentSpans);
    

    currentSpans.forEach((span, index) => {
        const typedChar = typedValue[index];

        if (typedChar == null) {
            span.classList.remove("correct", "wrong");
        } else if (typedChar == span.textContent) {
            span.classList.add("correct");
            span.classList.remove("wrong");
        } else {
            span.classList.add("wrong");
            span.classList.remove("correct");
        }
    })
    
    if (currentQuote == typedValue) {
        console.log("finished");
    }
    console.log(currentQuote, typedValue)
})