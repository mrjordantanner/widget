import '../App.css'
import React from 'react'
// Firebase chat code directly from https://github.com/fireship-io/react-firebase-chat
export default function ChatMessage({ message, auth }) {
    // const { text, uid, photoURL } = props.message;
     const { text, uid, photoURL } = message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img className='chat-avatar' src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
  }