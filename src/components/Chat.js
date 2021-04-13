import '../App.css'
import React, { useRef, useState, useEffect } from 'react';
import ChatMessage from './ChatMessage'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import useSound from 'use-sound';
import click from '../audio/click-2.wav';
import click_wet from '../audio/click-2-wet.wav';

// https://github.com/fireship-io/react-firebase-chat
export default function Chat( { firestore, firebase, auth }) {
    const dummy = useRef();

    const messagesRef = firestore.collection('messages');
    const messageQuery = messagesRef.orderBy('createdAt').limit(5000);
    const [messages] = useCollectionData(messageQuery, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');

    const [play_click_dry] = useSound(click);
    const [play_click_wet] = useSound(click_wet);

    const scrollToBottom = () => {
        dummy.current?.scrollIntoView({ behavior: "smooth" })
      }

    useEffect(() => {
        scrollToBottom();
      }, [messages]);



    const { uid, photoURL } = auth?.currentUser;
    const sendMessage = async (e) => {
      e.preventDefault();
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      play_click_dry();
      setFormValue('');
      dummy.current.scrollIntoView(); //{ behavior: 'smooth' }
    }
  
    return (
        <div>
            <div className='chat'>
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