
const quotes = [
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Don’t let yesterday take up too much of today. – Will Rogers",
  "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
  "Success is not in what you have, but who you are. – Bo Bennett",
  "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
  "nothing ever goes as planned"
];

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = quotes[randomIndex];
}
