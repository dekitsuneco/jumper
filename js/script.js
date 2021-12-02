const character = document.getElementById('character');
const enemy = document.getElementById('slug');
const score =  document.querySelector('#score-tab>span');

let checkEnv = setInterval(() => {
    let characterTopPosition = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    let enemyLeftPositiion = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));

    if (isDead(enemyLeftPositiion, characterTopPosition)) {        
        lose();
        restart();
    } else if (enemyLeftPositiion <= 0) {
        let currentScore = updateScore();

        if (currentScore < 30 && currentScore >= 20) {
            enemy.style.animation = 'slug 1s infinite ease-in';
        } else if (currentScore < 40 && currentScore >= 30) {
            enemy.style.animation = 'slug 1s infinite cubic-bezier(.8, 1.5, .2, -1);';
        } else if (currentScore < 55 && currentScore >= 40) {
            enemy.style.animation = 'slug 1s infinite ease';
        } else if (currentScore >= 55) {
            win();
            restart();
        }
    }
}, 10);

function jump() {
    if (!character.classList.contains('animate')) {
        character.classList.add('animate');
    }

    setTimeout(() => character.classList.remove('animate'), 500);
}

function isDead(enemyLeftPositiion, characterTopPosition) {
    if ((enemyLeftPositiion < 60) && 
        (enemyLeftPositiion > 0) && 
        (characterTopPosition >= 79)) {
        return true;
    }

    return false;
}

function lose() {
    enemy.style.animation = 'none';
    enemy.style.display = 'none';
    alert('You lose ;(');
}

function updateScore() {
    let currentScore = parseInt(score.textContent);
    currentScore++;
    score.textContent = currentScore++;

    return currentScore;
}

function win() {
    enemy.style.animation = 'none';
    enemy.style.display = 'none';
    alert('You win ^_^');
}

function restart() {
    enemy.style.display = 'block';
    enemy.style.animation = 'slug 1s infinite linear';
    score.textContent = '0';
}
