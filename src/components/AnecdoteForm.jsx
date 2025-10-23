import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import NotificationContext from "../NotificationContext"
import { useContext } from "react"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (e) => {
      notificationDispatch({ type: 'SET', payload: e.message })
      setTimeout(() => {
        console.log('timeout')
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0} )

    notificationDispatch({ type: 'SET', payload: `Anecdote '${content}' added` })
    setTimeout(() => {
      console.log('timeout')
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
