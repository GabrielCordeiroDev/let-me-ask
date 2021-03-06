import '../styles/auth.scss'
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Button } from '../components/Button'

export function NewRoom() {
  const [newRoom, setNewRoom] = useState('')
  
  const { user } = useAuth()
  const history = useHistory()


  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') return

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt="Illustration symbolizing questions and answers" />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Answer your audience's questions in real time</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Let me ask" />
          <h2>Create a new room</h2>         
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Room name"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>
              Create room
            </Button>
          </form>
          <p>Want to join an existing room? <Link to="/">Click here!</Link></p>
        </div>
      </main>
    </div>
  )
}
