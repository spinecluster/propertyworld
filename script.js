const character = document.getElementById('character');
const gameContainer = document.querySelector('.game-container');

let containerWidth = gameContainer.offsetWidth;
let containerHeight = gameContainer.offsetHeight;

let characterX = (containerWidth - character.offsetWidth) / 2;
let characterY = (containerHeight - character.offsetHeight) / 2;
let characterAngle = 0;

const speed = 5;
const animationInterval = 200; // Adjust animation interval in milliseconds
let animationTimer = null;

const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

const imagesWalk = [
    'characters/gangster_1/placeholder_character_walk_leftside.png',
    'characters/gangster_1/placeholder_character_walk_rightside.png'
];

const imagesIdle = [
    'characters/gangster_1/placeholder_character_idle_1.png',
    'characters/gangster_1/placeholder_character_idle_2.png'
];

let currentImageIndex = 0;
let isWalking = false;

function updateCharacterPosition() {
    let isMoving = false;

    if (keys.w && characterY - speed >= 0) {
        characterY -= speed;
        isMoving = true;
    }
    if (keys.s && characterY + character.offsetHeight + speed <= containerHeight) {
        characterY += speed;
        isMoving = true;
    }
    if (keys.a && characterX - speed >= 0) {
        characterX -= speed;
        isMoving = true;
    }
    if (keys.d && characterX + character.offsetWidth + speed <= containerWidth) {
        characterX += speed;
        isMoving = true;
    }

    if (isMoving && !isWalking) {
        isWalking = true;
        startWalkingAnimation();
    } else if (!isMoving && isWalking) {
        isWalking = false;
        startIdleAnimation();
    }

    character.style.top = `${characterY}px`;
    character.style.left = `${characterX}px`;
}

function startWalkingAnimation() {
    clearInterval(animationTimer); // Clear any previous animation
    animationTimer = setInterval(() => {
        character.style.backgroundImage = `url(${imagesWalk[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % imagesWalk.length;
    }, animationInterval);
}

function startIdleAnimation() {
    clearInterval(animationTimer); // Clear any previous animation
    animationTimer = setInterval(() => {
        character.style.backgroundImage = `url(${imagesIdle[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % imagesIdle.length;
    }, animationInterval);
}

function handleKeyDown(event) {
    if (event.key.toLowerCase() in keys) {
        keys[event.key.toLowerCase()] = true;
    }
}

function handleKeyUp(event) {
    if (event.key.toLowerCase() in keys) {
        keys[event.key.toLowerCase()] = false;
    }
}

function handleMouseMove(event) {
    const rect = gameContainer.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const deltaX = mouseX - (characterX + character.offsetWidth / 2);
    const deltaY = mouseY - (characterY + character.offsetHeight / 2);

    characterAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    character.style.transform = `rotate(${characterAngle}deg)`;
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
gameContainer.addEventListener('mousemove', handleMouseMove);

function gameLoop() {
    updateCharacterPosition();
    requestAnimationFrame(gameLoop);
}

character.style.top = `${characterY}px`;
character.style.left = `${characterX}px`;

gameLoop();