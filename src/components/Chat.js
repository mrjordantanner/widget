import '../App.css'
import React, { useRef, useState, useEffect } from 'react';
import ChatMessage from './ChatMessage'

// NOTE: I DID NOT WRITE MOST OF THIS!
// Firebase chat code directly from https://github.com/fireship-io/react-firebase-chat
export default function Chat( { auth, firestore, firebase, useCollectionData }) {
    const dummy = useRef();
    const chatWindow = useRef();

    const messagesRef = firestore.collection('messages');
    const messageQuery = messagesRef.orderBy('createdAt').limit(2000);
    const [messages] = useCollectionData(messageQuery, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');

    // useEffect(() => {
    //     // setFormValue('');
    //     // chatWindow.current.scrollIntoView({ behavior: 'smooth' });
    //     // chatWindow.scrollTo(0, chatWindow.scrollHeight);

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
      dummy.current.scrollIntoView(); //{ behavior: 'smooth' }
    }
  
    return (
        <div>
            <div className='chat' ref={chatWindow}>
                {/* <main> */}
                    {messages &&
                        messages.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} auth={auth} />
                        ))}

                    <div ref={dummy}></div>
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