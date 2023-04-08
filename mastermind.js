class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}

class MastermindViewModel {
    constructor() {
        // game level: 3 --> 10
        // secret: 549
        // guess -> 123 -> No match!
        //          456 -> -2
        //          567 -> +1
        //          594 -> +1-2
        //  max tries: 10
        //  lives: 3
        //  game level: 4

        this.secret = this.createSecret(3);
        this.guess = ko.observable(123);
        this.tries = ko.observable(0);
        this.moves = ko.observableArray([]);
        this.level = ko.observable(3);
        this.lives = ko.observable(3);
        this.counter = ko.observable(60);
        this.progressBarWidth = ko.computed(() => {
            return Math.floor((5 * this.counter()) / 3) + "%";
        })
        this.timer = setInterval(this.countDown, 1_000);
    }

    countDown = () => {
        this.counter(this.counter() - 1);
        if (this.counter() <= 0) {
            this.playerFails();
        }
    }
    evaluate = (number1, number2) => {
        number1 = number1.toString();
        number2 = number2.toString();
        let exactMatch = 0;
        let partialMatch = 0;
        for (const [i, digit1] of [...number1].entries()) {
            for (const [j, digit2] of [...number2].entries()) {
                if (digit1 === digit2) {
                    if (i === j) {
                        exactMatch++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        let message = exactMatch === 0 && partialMatch === 0 ? "No Match" : "";
        if (partialMatch > 0)
            message = `${message}-${partialMatch}`;
        if (exactMatch > 0)
            message = `${message}+${exactMatch}`;
        return message;
    }

    play = () => {
        this.tries(this.tries() + 1);
        let secret = this.secret.toString();
        let guess = this.guess().toString();
        if (secret.toString() === guess.toString()) {
            this.playerLevelsUp();
        } else {
            if (this.tries() === 10) {
                this.playerFails();
            } else {
                this.moves.push(new Move(this.guess(), this.evaluate(this.secret, this.guess())));
            }
        }
    }

    initializeGame = () => {
        this.tries(0);
        this.counter(60);
        this.guess();
        this.moves([]);
    }

    playerLevelsUp = (message) => {
        this.initializeGame();
        if (this.level() == 10) {
            clearInterval(this.timer);
            window.location.href = "playerwins.html";
            return;
        }
        this.level(this.level() + 1);
        this.moves.push(new Move(this.secret, `You win and continue with the next level ${this.level()}`));
        this.secret = this.createSecret(this.level());
    }

    playerFails = () => {
        this.lives(this.lives() - 1);
        if (this.lives() > 0) {
            this.initializeGame();
            this.moves.push(new Move(this.secret, `You failed at the level ${this.level()}!`));
            this.secret = this.createSecret(this.level());
        } else {
            this.gameIsOver();
        }
    }

    gameIsOver = () => {
        clearInterval(this.timer);
        window.location.href = "gameover.html";
    }

    createSecret = (level) => {
        const digits = [];
        digits.push(this.createRandomDigit(1, 9))
        while (digits.length < level) {
            const digit = this.createRandomDigit(0, 9);
            if (digits.includes(digit)) continue;
            digits.push(digit);
        }
        const secret = digits.reduce((number, digit) => number * 10 + digit, 0);
        console.log(secret);
        return secret;
    }

    createRandomDigit = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}


const mastermindViewModel = new MastermindViewModel();
window.onload = () => {
    ko.applyBindings(mastermindViewModel);
}

