import mine from '../assets/icons8-land-mine-48.png'
import flag from '../assets/icons8-flag-48.png'

import { TILE_STATUSES } from '../utils/tileStatuses'

function Tile({board,tile, revealTile, markTile}) {



    return (
        <div className='tile'
        onContextMenu ={(e) =>{
            e.preventDefault()
            markTile(board, tile)}
        }
        onClick={() => revealTile(board, tile)}
        data-status={tile.status}
        >
        {tile.status === TILE_STATUSES.NUMBER &&
            (tile.adjacentMinesCount === 0 ? " ":
                tile.adjacentMinesCount)}
        {tile.status === TILE_STATUSES.MINE && <img className='icon' src={mine} alt=""/>}
        {tile.status === TILE_STATUSES.MARKED && <img className='icon' src={flag} alt=""/>}

        </div>
    )
}

export default Tile
