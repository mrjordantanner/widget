import '../App.css'
import React, { useRef, useState, useEffect } from 'react';
import ChatMessage from './ChatMessage'

// NOTE: I DID NOT WRITE MOST OF THIS!
// Firebase chat code directly from https://github.com/fireship-io/react-firebase-chat
export default function Chat( { auth, firestore, firebase, useCollectionData }) {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');

    // useEffect(() => {
    //     console.log('chat mounted');
    //     setFormValue('');
    //     dummy.current.scrollIntoView({ behavior: 'smooth' });
    // }, [])
    
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
      
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      // Reset input field and scroll to bottom of window
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (
        <div>
            <div className='chat'>
                {/* <main> */}
                    {messages &&
                        messages.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} auth={auth} />
                        ))}

                    <span className='dummy' ref={dummy}></span>
                {/* </main> */}
            </div>

            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder='Enter message'
                />

                <button type='submit' disabled={!formValue}>
                    SEND
                </button>
            </form>
        </div>
		);
  }