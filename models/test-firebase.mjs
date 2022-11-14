import fetch from "node-fetch"

const foo = async () => {
    const url = "https://test-connect-29814-default-rtdb.europe-west1.firebasedatabase.app/persons.json"

    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
    }
    catch (error) {
        console.log(error)
    }

}

foo();