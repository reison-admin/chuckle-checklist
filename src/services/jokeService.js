export const getJokes = () => {
    return fetch('http://localhost:8088/jokes').then(res => res.json());
}
export const addJoke = async (joke) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }
    const jokeResponse = await fetch('http://localhost:8088/jokes', postOptions)
}

export const toggleJokeTold = async (joke) => {
    const postOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }
    const toggleResponse = await fetch(`http://localhost:8088/jokes/${joke.id}`, postOptions)
}