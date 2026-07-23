// Word Game

const VALID_WORDS = [
    'ABOUT', 'ABOVE', 'ACTOR', 'ADMIT', 'AFTER', 'AGENT', 'AGREE', 'ALLOW', 'APPLE', 'ARENA',
    'BEACH', 'BEGIN', 'BEING', 'BLACK', 'BLAME', 'BLANK', 'BLEND', 'BLIND', 'BLOCK', 'BOARD',
    'BRAIN', 'BRAND', 'BRAVE', 'BREAD', 'BREAK', 'BRING', 'BROAD', 'BROWN', 'BUILD', 'CHAIR',
    'CHASE', 'CHEAP', 'CHECK', 'CHILD', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLIMB', 'CLOSE',
    'COULD', 'COUNT', 'COVER', 'CRAFT', 'CRASH', 'CREAM', 'CROSS', 'CROWD', 'DAILY', 'DANCE',
    'DEATH', 'DOUBT', 'DREAM', 'DRINK', 'DRIVE', 'EARLY', 'EARTH', 'EMPTY', 'ENJOY', 'ENTER',
    'EQUAL', 'EVENT', 'EVERY', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FIGHT', 'FINAL', 'FIRST',
    'FLOOR', 'FOCUS', 'FORCE', 'FOUND', 'FRAME', 'FRESH', 'FRONT', 'FRUIT', 'GLASS', 'GRAND',
    'GRANT', 'GRASS', 'GREAT', 'GREEN', 'GROUP', 'GUESS', 'HAPPY', 'HEART', 'HORSE', 'HOTEL',
    'HOUSE', 'HUMAN', 'IMAGE', 'JUDGE', 'KNOWN', 'LARGE', 'LATER', 'LAUGH', 'LAYER', 'LEARN',
    'LEAST', 'LEAVE', 'LEVEL', 'LIGHT', 'LIMIT', 'LIVES', 'LOCAL', 'LUCKY', 'LUNCH', 'MAGIC',
    'MAJOR', 'MARCH', 'MATCH', 'MAYBE', 'MEANT', 'MEDIA', 'MIGHT', 'MODEL', 'MONEY', 'MONTH',
    'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVIE', 'MUSIC', 'NEVER', 'NIGHT',
    'NORTH', 'NOTED', 'NOVEL', 'OCEAN', 'OFFER', 'ORDER', 'OTHER', 'OUGHT', 'OUTER', 'OWNER',
    'PAINT', 'PAPER', 'PARTY', 'PEACE', 'PHONE', 'PIANO', 'PILOT', 'PLACE', 'PLAIN', 'PLANE',
    'PLANT', 'PLATE', 'POINT', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR',
    'PROUD', 'PROVE', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'REACH',
    'READY', 'RIGHT', 'RIVER', 'ROUGH', 'ROUND', 'ROUTE', 'SAINT', 'SALAD', 'SCALE', 'SCENE',
    'SCORE', 'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF',
    'SHELL', 'SHIFT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SINCE', 'SKILL', 'SLEEP',
    'SMALL', 'SMART', 'SMILE', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE',
    'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPLIT', 'SPORT', 'STAFF', 'STAGE', 'STAND', 'START',
    'STATE', 'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK', 'STONE', 'STORE', 'STORM', 'STORY',
    'STUDY', 'STYLE', 'SUGAR', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TEACH', 'THANK', 'THEIR',
    'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THREE', 'THROW', 'TODAY', 'TOTAL',
    'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIED',
    'TRUCK', 'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNDER', 'UNION', 'UNTIL', 'UPPER', 'URBAN',
    'USUAL', 'VALUE', 'VIDEO', 'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL',
    'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WOMAN', 'WORLD', 'WORRY', 'WORSE', 'WORST',
    'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YOUNG', 'YOURS', 'YOUTH'
];

let currentRow = 0;
let currentTile = 0;
let gameOver = false;
let guesses = [];

const secretWord = VALID_WORDS[Math.floor(Math.random() * VALID_WORDS.length)];

const rows = document.querySelectorAll('.tile-row');
const keys = document.querySelectorAll('.key');
const messageEl = document.getElementById('message');
const modalOverlay = document.getElementById('modal-overlay');
const modalMessage = document.getElementById('modal-message');

// Keyboard click handlers
keys.forEach(key => {
    key.addEventListener('click', () => {
        if (gameOver) return;
        const keyText = key.textContent;
        if (keyText === 'ENTER') {
            submitGuess();
        } else if (keyText === '⌫') {
            deleteLetter();
        } else {
            addLetter(keyText);
        }
    });
});

// Physical keyboard support
document.addEventListener('keydown', (e) => {
    if (gameOver) return;
    if (e.key === 'Enter') {
        submitGuess();
    } else if (e.key === 'Backspace') {
        deleteLetter();
    } else if (/^[a-zA-Z]$/.test(e.key)) {
        addLetter(e.key.toUpperCase());
    }
});

function addLetter(letter) {
    if (currentTile < 5) {
        const tile = rows[currentRow].children[currentTile];
        tile.textContent = letter;
        currentTile++;
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        const tile = rows[currentRow].children[currentTile];
        tile.textContent = '';
    }
}

function submitGuess() {
    if (currentTile < 5) {
        showMessage('Not enough letters');
        shakeRow();
        return;
    }

    let guess = '';
    for (let i = 0; i < 5; i++) {
        guess += rows[currentRow].children[i].textContent;
    }

    if (!VALID_WORDS.includes(guess)) {
        showMessage('Not in word list');
        shakeRow();
        return;
    }

    if (guesses.includes(guess)) {
        showMessage('Already guessed');
        shakeRow();
        return;
    }

    guesses.push(guess);
    colorTiles(guess);
}

function colorTiles(guess) {
    const colors = getColors(guess, secretWord);
    const tiles = rows[currentRow].children;

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            tiles[i].classList.add('flip');
            setTimeout(() => {
                tiles[i].classList.add(colors[i]);
                updateKeyboardColor(guess[i], colors[i]);
            }, 250);
        }, i * 300);
    }

    setTimeout(() => {
        if (guess === secretWord) {
            gameOver = true;
            bounceRow();
            setTimeout(() => showModal(getWinMessage()), 500);
        } else if (currentRow === 5) {
            gameOver = true;
            setTimeout(() => showModal(`The word was ${secretWord}`), 500);
        } else {
            currentRow++;
            currentTile = 0;
        }
    }, 1500);
}

function getColors(guess, secret) {
    const colors = ['gray', 'gray', 'gray', 'gray', 'gray'];
    const secretArr = secret.split('');
    const guessArr = guess.split('');

    // First pass: mark greens
    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === secretArr[i]) {
            colors[i] = 'green';
            secretArr[i] = null;
            guessArr[i] = null;
        }
    }

    // Second pass: mark yellows
    for (let i = 0; i < 5; i++) {
        if (guessArr[i] && secretArr.includes(guessArr[i])) {
            colors[i] = 'yellow';
            secretArr[secretArr.indexOf(guessArr[i])] = null;
        }
    }

    return colors;
}

function updateKeyboardColor(letter, color) {
    keys.forEach(key => {
        if (key.textContent === letter) {
            if (key.classList.contains('green')) return;
            if (color === 'yellow' && key.classList.contains('gray')) return;
            key.classList.remove('green', 'yellow', 'gray');
            key.classList.add(color);
        }
    });
}

function shakeRow() {
    rows[currentRow].classList.add('shake');
    setTimeout(() => rows[currentRow].classList.remove('shake'), 500);
}

function bounceRow() {
    const tiles = rows[currentRow].children;
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            tiles[i].classList.add('bounce');
        }, i * 100);
    }
}

function showMessage(msg) {
    messageEl.textContent = msg;
    setTimeout(() => messageEl.textContent = '', 2000);
}

function showModal(msg) {
    modalMessage.textContent = msg;
    modalOverlay.classList.add('show');
}

function getWinMessage() {
    const messages = ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'];
    return messages[currentRow];
}
