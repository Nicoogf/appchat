import React, { useState } from 'react'

  export const Chat = ( { socket , username , room } ) => {

    const [ currentMessage , setCurrentMessage ] = useState("")
    
    const sendMessage = async() => {
        if( username & currentMessage ) {
           const info = {
            message : currentMessage , 
            room,
            author: username ,
            time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
           } ;
           await socket.emit('send_message', info);
           setCurrentMessage('');
        }
    }

  return (
    <div>

        <section className='chat-header'>
            <p> Live-Chat</p>
        </section>

        <section className='messages'>

        </section>

        <section className='chat-footer'>
                <input type="text" placeholder='Ingresar Mensaje...' onChange={e => setCurrentMessage(e.target.value)}/>
                <button onClick={ () => sendMessage } className='bg-red-500 py-2 px-5'> Enviar </button>
        </section>

    </div>
  )
}
