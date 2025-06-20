import { MAX_PLAYER_SIZE } from "../config/config.js";

export class Room {
    constructor(roomID) {
        this.roomID = roomID;
        this.boardState = Array(10).fill(null).map(() => Array(10).fill(null)); // creating a 10x10 board with null values;
        this.players = new Map(); // map os players linked with their ws
        this.movesLog = []; // process moves
        this.playersReady = 0;
        this.playersEndedTurn = 0;
    }

    isFull() {
        return this.players.size > MAX_PLAYER_SIZE;
    }
}