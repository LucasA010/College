type Game = {
    board: Board,
    turn: Colour
}

type Board = {
    tiles: [Tile],
    size: Number
}
type Tile = {
    colour: Colour,
    piece: Piece | null,
    position: Position
}

type Position = {
    row: Number,
    column: Number
}

type Piece = {
    colour: Colour
}

enum Colour {
    Black,
    White
}

const tile: Tile = {
    colour: Colour.Black,
    piece: null,
    position: {
        row: 0,
        column: 0
    }
}

// const game: Game = {

// }

export {
    Game,
    Tile,
    Board,
    Position
}