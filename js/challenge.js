const counterEl = document.querySelector('h1#counter');
const commentsEl = document.querySelector('div.comments');
const likesEl = document.querySelector('ul.likes');
let count = 0;
let timerID = 0;

function refreshCounter() {
    counterEl.textContent = count;
}

function toggleControls() {
    document.querySelectorAll('button').forEach(el => {
        if (el.id !== 'pause') el.disabled = !el.disabled;
    });
}

function startCounter() {
    timerID = setInterval(incrementCounter, 1000);
}

function incrementCounter() {
    count++;
    refreshCounter();
}

function decrementCounter() {
    if (count > 0) count--;
    refreshCounter();
}

function pauseCounter(ev) {
    if (timerID > 0) {
        clearInterval(timerID);
        timerID = 0;
        ev.target.textContent = 'resume';
    } else {
        startCounter();
        ev.target.textContent = 'pause';
    }
    toggleControls();
}

function addLikes() {
    let likeEl = document.querySelector(`li[data-num='${count}']`);
    if (likeEl) {
        likeEl.dataset.likes = parseInt(likeEl.dataset.likes) + 1;
        likeEl.textContent = `${count} has been liked ${likeEl.dataset.likes} times.`;
        return;
    }
    likeEl = document.createElement('li');
    likeEl.setAttribute('data-num', count);
    likeEl.setAttribute('data-likes', 1);
    likeEl.textContent = `${count} has been liked 1 time.`;
    likesEl.appendChild(likeEl);
}

function addComment(ev) {
    ev.preventDefault();
    let comment = document.querySelector('input#comment-input').value;
    if (comment !== '') {
        const commentEl = document.createElement('p');
        commentEl.textContent = comment;
        commentsEl.appendChild(commentEl);
    }
}

function addListeners() {
    document.querySelector('button#minus').addEventListener('click', decrementCounter);
    document.querySelector('button#plus').addEventListener('click', incrementCounter);
    document.querySelector('button#pause').addEventListener('click', ev => pauseCounter(ev));
    document.querySelector('button#heart').addEventListener('click', addLikes);
    document.querySelector('form#comment-form').addEventListener('submit', addComment);
}

document.addEventListener('DOMContentLoaded', () => {
    addListeners();
    startCounter();
});
