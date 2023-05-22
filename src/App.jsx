import React, {useState, useEffect } from 'react'
import './App.css'
import { createBoard, getMinePositions, checkLose, checkWin, markedTilesCount} from './utils/utils'
import Board from './components/Board'
import { TILE_STATUSES } from './utils/tileStatuses'


function App() {
    const [board, setBoard] = useState()

    const boardSize = 10
    const minesNumber = 10

    const [msg, setMsg] = useState('')

    const [win, setWin] = useState(false)

    const [lose, setLose] = useState(false)

    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        setBoard(()=> createBoard(boardSize,getMinePositions(boardSize, minesNumber) ))
    }, [])

    useEffect(() => {
        if(board) {
            checkGameEnd(board)
            listMinesLeft(board)
        }
    }, [board])

    useEffect(() => {
      if(win) setMsg('You Win')
      if(lose) setMsg('You Lose')
    }, [win, lose])


    useEffect(() => {
      if(win || lose) setGameOver(true)
    }, [win, lose])

    function revealTile(board, tile) {
        if(!board) return
        let newBoard = [...board]
        let newTile = newBoard[tile.x][tile.y]

        if (tile.status !== TILE_STATUSES.HIDDEN) {
            return
        }

        if (tile.mine) {
            newTile.status = TILE_STATUSES.MINE
            setBoard(newBoard)
            return
        }

        newTile.status = TILE_STATUSES.NUMBER

        const adjacentTiles = nearbyTiles(board, tile)
        const mines = adjacentTiles.filter(t => t.mine)
        tile.adjacentMinesCount = mines.length

        setBoard(newBoard)

        if (mines.length === 0) {
            adjacentTiles.forEach(t => {
                revealTile(board, t)
            })

        }
    }

    function nearbyTiles(board, { x, y }) {
        const tiles = []

        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            for (let yOffset = -1; yOffset <= 1; yOffset++) {
                const tile = board[x + xOffset]?.[y + yOffset]
                if (tile) tiles.push(tile)
            }
        }


        return tiles
    }

    function markTile(board, {x, y}) {
        let newBoard = [...board]
        let tile = newBoard[x][y]
        if (
            tile.status !== TILE_STATUSES.HIDDEN &&
            tile.status !== TILE_STATUSES.MARKED
        ) {
            return
        }

        if (tile.status === TILE_STATUSES.MARKED) {
            tile.status = TILE_STATUSES.HIDDEN

        } else {
            tile.status = TILE_STATUSES.MARKED
        }
        setBoard(newBoard)
    }

    function checkGameEnd(board) {
        const win = checkWin(board)
        const lose = checkLose(board)

        let newBoard = [...board]

        if (win) {
            setWin(true)
        }
        if (lose) {
            newBoard.forEach(row => {
                row.forEach(tile => {
                    if (tile.status === TILE_STATUSES.MARKED) board = markTile(board, tile)
                    if (tile.mine) revealTile(board, tile)
                })
            })

            setLose(true)
        }
    }


    function listMinesLeft(board) {
        setMsg(`Mines Left: ${minesNumber - markedTilesCount(board)}`)
    }


    return (
        <>
        <h3 className="title">Minesweeper</h3>
        <div className="text">
        <span >{msg}</span>
        <Board
                board={board}
                boardSize={boardSize}
                revealTile={revealTile}
                markTile={markTile}
                gameOver={gameOver}
        />
        </div>
        </>
    )
}

export default App
