import React, { useRef, useEffect } from 'react'
import Tile from './Tile'

function Board({board, boardSize, revealTile, markTile,  gameOver }) {
    const boardRef = useRef()


    useEffect(() => {
        if(gameOver) endGame()
    }, [gameOver])

    function endGame() {
        boardRef.current.addEventListener("click", stopProp, { capture: true })
        boardRef.current.addEventListener("contextmenu", stopProp, { capture: true })
    }

    function stopProp(e) {
        e.stopImmediatePropagation()
    }

    const style = {

        gridTemplateColumns: `repeat(${boardSize}, 1rem)`,
        gridTemplateRows: `repeat(${boardSize}, 1rem)`
    }
    return (

        <div className='grid-container' style={style}ref={boardRef}>
        {
            board && board.map ((row, x)=> {
                return row.map((tile, y) =>{
                    return <Tile key={`tile-${x}-${y}`}
                    tile={tile}
                    board = {board}
                    revealTile={revealTile}
                    markTile = {markTile}
                        />
                })
            })
        }

        </div>
    )
}

export default Board
