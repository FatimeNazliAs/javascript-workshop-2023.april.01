class GameViewModel{
    constructor() {
        this.secret= this.createSecret();
        this.guess = ko.observable(50);
        this.tries = ko.observable(0);
        this.moves = ko.observableArray([]);
    }

    createSecret = () => {
        return Math.floor(Math.random() * 100) + 1;
    }
}
const gameViewModel = new GameViewModel();
window.onload = () => {
    ko.applyBindings(gameViewModel);
}