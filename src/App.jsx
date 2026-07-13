import { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = '/api/notes/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/api/notes').then((response) => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  }, [])

  const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() > 0.5,
  }

  axios.post('http://localhost:3001/api/notes', noteObject).then((response) => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
}

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default {getAll, create, update}