
let emojis = ['🐶', '🐹', '🐻', '🐼', '🐨', '🐯', '🐶', '🐹', '🐻', '🐼', '🐨', '🐯'];
let cardsId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let cards = [];

class Card {
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }
}

class Game {
    constructor() {
    }
    createCards() {
        //  создаем карточки и заполняем их рандомом
        for (let i = emojis.length - 1; i > 0; i--) { //перемешиваем массив
            let j = Math.floor(Math.random() * (i + 1));
            [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
        }
        for (let i = 0; i < cardsId.length; i++) {
            cards.push(new Card(cardsId[i], emojis[i]));
        }
        console.log(cards);
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
    closeCards () {
        let cards = document.querySelectorAll('.card');
        for (let i = 0; i < cards.length; i += 1) {
            if (cards[i].classList.contains('isOpenRight')) {
                rotateCardBack(cards[i]);
                cards[i].classList.remove('isOpenRight');
            }
            if (cards[i].classList.contains('isOpenWrong')) {
                rotateCardBack(cards[i]);
                cards[i].classList.remove('isOpenWrong');
            }
            if (cards[i].classList.contains('isOpen')) {
                rotateCardBack(cards[i]);
                cards[i].classList.remove('isOpen');
            }
        }
    };
    startTheGame() {
        console.log('startTheGame');
        this.createCards();
        this.renderCards();
        this.closeCards();
    }
}


/*const cards = createCards();*/
/*renderCards(cards);*/

const fronts = document.querySelectorAll(".front");
for (let i = 0; i < fronts.length; i += 1) {
    fronts[i].addEventListener('click', (e) => {
        //first step: animation
        e.target.style.transform = 'rotateY(180deg)';
        e.target.nextElementSibling.style.transform = 'rotateY(360deg)';
        //check if we have cards that are not the same
        let wrongCards = document.querySelectorAll('.isOpenWrong');
        for (let j = 0; j < wrongCards.length; j += 1) {
            wrongCards[j].classList.remove('isOpenWrong');
            rotateCardBack(wrongCards[j]);
        }
        //adding class "IsOpen" to clicked card
        let isOpenCard = document.querySelector('.isOpen');
        let card = e.target.parentNode;
        card.classList.add('isOpen');
        card.classList.add('oddCard');
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
        if (cardChecker()) {

        }
    })
}

const cardChecker = () => {
    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i += 1) {
        if (!cards[i].classList.contains('isOpenRight')) {
            return false;
        }
    }
    return true;
};

function rotateCardBack(card) {
    let back = card.children[1];
    back.style.transform = 'rotateY(180deg)';
    let front = card.children[0];
    front.style.transform = 'rotateY(0deg)';
}

let ggame = new Game();
ggame.startTheGame();






