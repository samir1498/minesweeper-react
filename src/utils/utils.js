import { TILE_STATUSES } from "./tileStatuses"

export function createBoard(boardSize, minePositions) {
    let board = []
    for(let i = 0; i < boardSize; i++) {
        let row = []
        for(let j = 0; j < boardSize; j++) {
            row.push( {
                x : i,
                y : j,
                mine: minePositions.some(positionMatch.bind(null, { x : i, y : j })),
                status: TILE_STATUSES.HIDDEN,
            })
        }
        board.push(row)
    }
    return board
}

export function markedTilesCount(board) {
    return board.reduce((count, row) => {
        return (
            count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
        )
    }, 0)
}

export function checkWin(board) {
    return board.every(row => {
        return row.every(tile => {
            return (
                tile.status === TILE_STATUSES.NUMBER ||
                (tile.mine &&
                    (tile.status === TILE_STATUSES.HIDDEN ||
                        tile.status === TILE_STATUSES.MARKED))
            )
        })
    })
}

export function checkLose(board) {
    return board.some(row => {
        return row.some(tile => {
            return tile.status === TILE_STATUSES.MINE
        })
    })
}

export function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
}

export function getMinePositions(boardSize, numberOfMines) {
    const positions = []

    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize),
        }

        if (!positions.some(positionMatch.bind(null, position))) {
            positions.push(position)
        }
    }

    return positions
}

function randomNumber(size) {
    return Math.floor(Math.random() * size)
}

