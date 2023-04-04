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
    }

}

const mastermindViewModel = new MastermindViewModel();
window.onload = () => {
    ko.applyBindings(mastermindViewModel);
}