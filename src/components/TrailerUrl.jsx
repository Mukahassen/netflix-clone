import React from 'react'

const TrailerUrl = () => {
    return (
        <div className="row__youtube">
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default TrailerUrl