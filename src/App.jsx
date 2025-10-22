import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteForAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    voteForAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  const voteForAnecdoteMutation = useMutation({ //Vote for anecdote mutator
    mutationFn: voteForAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if(result.isLoading) {
    return <div>loading data...</div>
  }
  else if(result.isError) {
    return <div>anecdote service not availible due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
