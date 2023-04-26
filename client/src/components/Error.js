import React from 'react'

function Error({message}) {
    return (
        <div>
            <div class="alert alert-warning" role="alert">
                {message}
            </div>
        </div>
    )
}

export default Error