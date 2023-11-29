import { useState } from 'react' ;
import './App.css' ;
import io from "socket.io-client" ;
import { Chat } from './Chat';

const socket = io.connect("http://localhost:3001")

function App() {
  const [ username , setUsername ] = useState("") ;
  const [ room  , setRoom ] = useState("") ;
  const joinRoom = () => {
    if( username !== "" && room !== "" ){
      socket.emit( "join_room" , room)
    }
  }

  return (
   
      <div className=''>
        <h3> Unirme al Chat </h3>
        <input type='text' placeholder='Chris' onChange={ e => setUsername(e.target.value) } />
        <input type='text' placeholder='ID de Sala' onChange={ e => setRoom(e.target.value) } />
        <button onClick={ joinRoom }> Ingresar </button>
        <Chat socket={socket} username={username} room={room} />
      </div>
      
  )
}

export default App
