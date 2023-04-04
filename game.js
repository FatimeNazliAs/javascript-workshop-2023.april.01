class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }

}

class GameViewModel{
    constructor() {
        this.secret= this.createSecret();
        this.guess = ko.observable(50);
        this.tries = ko.observable(0);
        this.moves = ko.observableArray([]);
    }
    play = () => {
        this.tries(this.tries() + 1);
        if (this.secret == this.guess()){
            this.initializeGame("You win!");
        } else if (this.tries() === 7){
            this.initializeGame("You lose!");
        } else {
            let message = "Pick smaller number!";
            if (this.guess() < this.secret)
                message = "Pick larger number!";
            this.moves.push(new Move(this.guess(),message));
        }

    }

    initializeGame = (message) => {
        this.tries(0);
        this.guess(50);
        this.moves([]);
        this.moves.push(new Move(this.secret, message))
        this.secret = this.createSecret();
    }

    createSecret = () => {
        return Math.floor(Math.random() * 100) + 1;
    }
}
const gameViewModel = new GameViewModel();
window.onload = () => {
    ko.applyBindings(gameViewModel);
}