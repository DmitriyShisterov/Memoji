let emojis = ['🐶', '🐹', '🐻', '🐼', '🐨', '🐯', '🐶', '🐹', '🐻', '🐼', '🐨', '🐯'];
let cardsId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let cards = [];
let idTimer = null;
let timerIsWorked = false;

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
                for (let i = 0; i < cards.length; i++) {
                    cardBlocks[i].setAttribute('id', cards[i].id);
                    let cardContent = cards[i].content;
                    let card = cardBlocks[i];
                    card.children[1].children[0].textContent = cardContent;
                }
            }

            timer() {
                let timer = document.querySelector('.timer');
                    let endTime = new Date().getTime() + 60000;
                    let timerId = setInterval(()=>{
                        idTimer = timerId;
                        let now = new Date().getTime();
                        let timeLeft = endTime - now;
                        let sec = Math.floor(timeLeft / 1000);
                        timer.innerText = `00:${sec > 10 ? sec : `0${sec}`}`;
                        if (timeLeft < 0){
                            clearTimeout(timerId);
                            this.renderTimer('01:00');
                            timerIsWorked = false;
                            let modal = document.querySelector('.modal');
                            modal.children[0].children[0].textContent = 'Lose';
                            modal.children[0].children[1].children[0].textContent = 'Try Again';
                            modal.style.display = 'block';
                            game.reStartGame();
                        }
                    },1000)

            }
            renderTimer(x){
                let timer = document.querySelector('.timer');
                timer.innerText = x;
            }

            closeCards() {
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

            cardChecker() {
                let cards = document.querySelectorAll('.card');
                for (let i = 0; i < cards.length; i++) {
                    if (!cards[i].classList.contains('isOpenRight')) {
                        return false;
                    }
                }
                return true;
            };
            startTheGame() {
                this.closeCards();
                this.createCards();
                this.renderCards();
                this.cardChecker();
            }
            reStartGame(){
                let btn = document.querySelector('.btn');
                btn.addEventListener('click', function () {
                    let modal = document.querySelector('.modal');
                    modal.style.display = 'none';
                    cards = [];
                    game.startTheGame();
                });
            }
        }

        const fronts = document.querySelectorAll(".front");
        for (let i = 0; i < fronts.length; i++) {
            fronts[i].addEventListener('click', function (e) {
                if (!timerIsWorked){
                    timerIsWorked = true;
                    game.timer();
                }
                //rotate cards on click;
                e.target.style.transform = 'rotateY(180deg)';
                e.target.nextElementSibling.style.transform = 'rotateY(360deg)';
                //check cards if we have cards that are not the same
                let wrongCards = document.querySelectorAll('.isOpenWrong');
                for (let j = 0; j < wrongCards.length; j++) {
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
                if (game.cardChecker()){
                    clearTimeout(idTimer);
                    game.renderTimer('01:00');
                    timerIsWorked = false;
                    let modal = document.querySelector('.modal');
                    modal.children[0].children[0].textContent = 'Win';
                    modal.children[0].children[1].children[0].textContent = 'Play Again';
                    modal.style.display = 'block';
                    game.reStartGame();
                }
            })
        }
        let game = new Game();
        game.startTheGame();









