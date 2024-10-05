const cardsArray = [
    { name: '🍎', img: '🍎' },
    { name: '🍌', img: '🍌' },
    { name: '🍇', img: '🍇' },
    { name: '🍉', img: '🍉' },
    { name: '🍓', img: '🍓' },
    { name: '🍍', img: '🍍' },
    { name: '🍒', img: '🍒' },
    { name: '🍋', img: '🍋' }
];

const gameGrid = [...cardsArray, ...cardsArray]; // Duplicate array for pairs
gameGrid.sort(() => 0.5 - Math.random()); // Shuffle cards

const memoryGrid = document.getElementById('memory-grid');
let firstCard = '';
let secondCard = '';
let hasFlippedCard = false;
let lockBoard = false;

// Create the cards
gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.name = item.name;

    const frontFace = document.createElement('div');
    frontFace.classList.add('front-face');
    frontFace.textContent = item.img;

    const backFace = document.createElement('div');
    backFace.classList.add('back-face');

    card.appendChild(frontFace);
    card.appendChild(backFace);
    memoryGrid.appendChild(card);

    card.addEventListener('click', flipCard);
});

// Flip the card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First card flipped
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second card flipped
    secondCard = this;
    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

// Disable cards if matched
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

// Reset the board after each turn
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
