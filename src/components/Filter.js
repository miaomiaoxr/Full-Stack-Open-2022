import React from "react"

const Filter = ({ setFilterKey }) => {

    const handleFilterWordChange = (event) => setFilterKey(event.target.value)

    return (
        <div>
            <form>
                filter show with <input placeholder = "Input a name to find one" onChange={handleFilterWordChange} />
            </form>
        </div>
    )
}

export default Filter