const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
    console.log(newAnecdote)

     if(newAnecdote.content.length < 5) {
        throw new Error('Anecdote length must be 5 characters or more')
     }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify(newAnecdote)
    }

    const response = await fetch(baseUrl, options)

    if(!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}