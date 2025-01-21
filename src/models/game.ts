import { input } from "@angular/core";

export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() { // Hier werden die karten von jeder art in das array gepusht
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }

        shuffle(this.stack);
    }


    public toJson() {
        console.log('this.currentPlayer',this.currentPlayer);
        
        return {
            players: this.players,
            stack: this.stack,
            playCards: this.playedCards,
            currentPlayer: this.currentPlayer
        }
    }


}

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};