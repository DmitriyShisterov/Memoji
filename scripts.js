
let emojis = ['🐶', '🐹', '🐻', '🐼', '🐨', '🐯', '🐶', '🐹', '🐻', '🐼', '🐨', '🐯'];
let cardsId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let cards = [];

class Card {
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }
    rotateCardBack(card) {
        let back = card.children[1];
        back.style.transform = 'rotateY(180deg)';
        let front = card.children[0];
        front.style.transform = 'rotateY(0deg)';
    }
}

class Timer {
    constructor(){
    }
    timerStart(){
            var now	= new Date(),
            times	= [1, 0,],
            box = document.getElementsByClassName('timer');

        function showTimer(min, sec) {
            box[0].innerText = min+':'+sec;
        }

        var tm = setInterval(function() {
            times[1]--;
            if (times[0] == 0 && times[1] == 0) {
                clearInterval(tm);
            } else if (times[1] == -1) {
                times[1] = 59;
                times[0]--;
            }
            var m = (times[0] < 10) ? '0' + times[0] : times[0],
                s = (times[1] < 10) ? '0' + times[1] : times[1];
            showTimer(m, s);
        }, 1000);
    }
}

class Game {
    constructor() {
    }
    createCards() {
        //  create card and shuffle emojis
        for (let i = emojis.length - 1; i > 0; i--) { //shuffle array
            let j = Math.floor(Math.random() * (i + 1));
            [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
        }
        for (let i = 0; i < cardsId.length; i++) {
            cards.push(new Card(cardsId[i], emojis[i]));
        }
        return cards;
    }
    renderCards() {
        let cardBlocks = document.querySelectorAll('.card');
        for (let i = 0; i <cards.length; i++) {
            cardBlocks[i].setAttribute('id', cards[i].id);
            let cardContent = cards[i].content;
            let card = cardBlocks[i];
            card.children[1].children[0].textContent = cardContent;
        }
    }
    startTimer(){
        let timer = new Timer();
        timer.timerStart();
    }
    closeCards () {
        let cards = document.querySelectorAll('.card');
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].classList.contains('isOpenRight')) {
                Card.prototype.rotateCardBack(cards[i]);
                cards[i].classList.remove('isOpenRight');
            }
            if (cards[i].classList.contains('isOpenWrong')) {
                Card.prototype.rotateCardBack(cards[i]);
                cards[i].classList.remove('isOpenWrong');
            }
            if (cards[i].classList.contains('isOpen')) {
                Card.prototype.rotateCardBack(cards[i]);
                cards[i].classList.remove('isOpen');
            }
        }
    };
    cardChecker () {
        let cards = document.querySelectorAll('.card');
        for (let i = 0; i < cards.length; i++) {
            if (!cards[i].classList.contains('isOpenRight')) {
                return false;
            }
        }
        return true;
    };
    startTheGame() {
        this.createCards();
        this.renderCards();
        this.closeCards();
        this.cardChecker();
        this.startTimer();
    }
}

const fronts = document.querySelectorAll(".front");
for (let i = 0; i < fronts.length; i++) {
    fronts[i].addEventListener('click', function (e) {
        //rotate cards on click;
        e.target.style.transform = 'rotateY(180deg)';
        e.target.nextElementSibling.style.transform = 'rotateY(360deg)';
        //check cards if we have cards that are not the same
        let wrongCards = document.querySelectorAll('.isOpenWrong');
        for (let j = 0; j < wrongCards.length; j ++) {
            wrongCards[j].classList.remove('isOpenWrong');
            Card.prototype.rotateCardBack(wrongCards[j]);
        }
        //adding class "IsOpen" to clicked card
        let isOpenCard = document.querySelector('.isOpen');
        let card = e.target.parentNode;
        card.classList.add('isOpen');
        card.classList.add('oddCard');
        //check cards content
        if (isOpenCard) {
            let firstCardContent = isOpenCard.children[1].children[0].textContent;
            let secondCardContent = card.children[1].children[0].textContent;
            if (firstCardContent === secondCardContent) {
                // make cards green if they are correct
                card.classList.add('isOpenRight');
                isOpenCard.classList.add('isOpenRight');
                card.classList.remove('isOpen');
                isOpenCard.classList.remove('isOpen');
            } else {
                //make cards red
                card.classList.add('isOpenWrong');
                isOpenCard.classList.add('isOpenWrong');
                card.classList.remove('isOpen');
                isOpenCard.classList.remove('isOpen');
            }
        }
        if (Game.prototype.cardChecker()) {
        }
    })
}
let game = new Game();
game.startTheGame();






