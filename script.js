const funnyQuotes = [
  { text: "I'm not lazy. I'm in energy-saving mode.", author: "Unknown" },
  { text: "I asked God for a bike, but I know God doesn't work that way. So I stole a bike and asked for forgiveness.", author: "Emo Philips" },
  { text: "My bed is a magical place where I suddenly remember everything I forgot to do.", author: "Unknown" },
  { text: "I'm on a seafood diet. I see food, and I eat it.", author: "Unknown" },
  { text: "Common sense is like deodorant. The people who need it most never use it.", author: "Unknown" },
  { text: "I used to think I was indecisive, but now I'm not so sure.", author: "Unknown" },
  { text: "Running late is my cardio.", author: "Unknown" },
  { text: "Behind every great man is a woman rolling her eyes.", author: "Jim Carrey" },
  { text: "I don't need a hair stylist, my pillow gives me a new hairstyle every morning.", author: "Unknown" },
  { text: "I told my wife she was drawing her eyebrows too high. She looked surprised.", author: "Unknown" },
  { text: "The closest I've been to a diet this year is erasing food emojis from my texts.", author: "Unknown" },
  { text: "We'll be friends forever because you already know too much.", author: "Unknown" },
];

const lifeQuotes = [
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "The most common form of despair is not being who you are.", author: "Søren Kierkegaard" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "We accept the love we think we deserve.", author: "Stephen Chbosky" },
  { text: "Comparison is the thief of joy.", author: "Theodore Roosevelt" },
  { text: "One day or day one. You decide.", author: "Unknown" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The things you take for granted, someone else is praying for.", author: "Unknown" },
  { text: "Sometimes the smallest step in the right direction ends up being the biggest step of your life.", author: "Unknown" },
  { text: "It's the possibility of having a dream come true that makes life interesting.", author: "Paulo Coelho" },
];

let mood = 'funny';
let currentQuote = null;
let lastIndex = -1;
let favourites = [];
let isSaved = false;

function setMood(m) {
  mood = m;
  document.getElementById('tab-funny').classList.toggle('active', m === 'funny');
  document.getElementById('tab-life').classList.toggle('active', m === 'life');

  const badge = document.getElementById('mood-badge');
  if (m === 'funny') {
    badge.textContent = '😄 Funny';
    badge.className = 'mood-badge';
  } else {
    badge.textContent = '🍃 Slice of life';
    badge.className = 'mood-badge life';
  }

  nextQuote();
}

function getRandomQuote() {
  const pool = mood === 'funny' ? funnyQuotes : lifeQuotes;
  let idx;
  do {
    idx = Math.floor(Math.random() * pool.length);
  } while (idx === lastIndex && pool.length > 1);
  lastIndex = idx;
  return pool[idx];
}

function nextQuote() {
  const wrap = document.getElementById('quote-wrap');
  wrap.classList.add('fade');
  isSaved = false;
  updateFavBtn();

  setTimeout(() => {
    currentQuote = getRandomQuote();
    document.getElementById('quote-text').textContent = '\u201C' + currentQuote.text + '\u201D';
    document.getElementById('quote-author').textContent = '\u2014 ' + currentQuote.author;
    wrap.classList.remove('fade');
  }, 320);
}

function toggleFav() {
  if (!currentQuote) return;
  if (isSaved) {
    favourites = favourites.filter(f => f.text !== currentQuote.text);
    isSaved = false;
  } else {
    favourites.push({ ...currentQuote });
    isSaved = true;
  }
  updateFavBtn();
  renderFavourites();
}

function updateFavBtn() {
  const btn = document.getElementById('fav-btn');
  const label = document.getElementById('fav-label');
  if (isSaved) {
    btn.classList.add('saved');
    label.textContent = 'Saved';
    btn.childNodes[0].textContent = '❤️ ';
  } else {
    btn.classList.remove('saved');
    label.textContent = 'Save';
    btn.childNodes[0].textContent = '🤍 ';
  }
}

function renderFavourites() {
  const list = document.getElementById('fav-list');
  if (favourites.length === 0) {
    list.innerHTML = '<p class="fav-empty">Nothing saved yet — hit Save on a quote you like!</p>';
    return;
  }
  list.innerHTML = favourites.map((f, i) => `
    <div class="fav-item">
      <div>
        <p class="fav-text">\u201C${f.text}\u201D</p>
        <p class="fav-by">\u2014 ${f.author}</p>
      </div>
      <button class="fav-del" onclick="removeFav(${i})" aria-label="Remove">&#x2715;</button>
    </div>
  `).join('');
}

function removeFav(i) {
  const removed = favourites[i];
  favourites.splice(i, 1);
  if (currentQuote && currentQuote.text === removed.text) {
    isSaved = false;
    updateFavBtn();
  }
  renderFavourites();
}

function copyQuote() {
  if (!currentQuote) return;
  const text = `"${currentQuote.text}" — ${currentQuote.author}`;
  navigator.clipboard.writeText(text).then(() => {
    const label = document.getElementById('copy-label');
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = 'Copy'; }, 2000);
  });
}

function shareQuote() {
  if (!currentQuote) return;
  const text = encodeURIComponent(`"${currentQuote.text}" — ${currentQuote.author}`);
  window.open('https://twitter.com/intent/tweet?text=' + text, '_blank');
}

nextQuote();
