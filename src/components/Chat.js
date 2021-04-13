import '../App.css'
import React, { useRef, useState, useEffect } from 'react';
import ChatMessage from './ChatMessage'
import { useCollectionData } from 'react-firebase-hooks/firestore';

// https://github.com/fireship-io/react-firebase-chat
export default function Chat( { firestore, firebase, auth }) {
    const dummy = useRef();
    const chatWindow = useRef();
    const messagesRef = firestore.collection('messages');
    const messageQuery = messagesRef.orderBy('createdAt').limit(5000);
    const [messages] = useCollectionData(messageQuery, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');


    const widgetsRef = firestore.collection('widgets');

    useEffect(() => {

    //     // Write/Overwrite user data
    //     firestore.ref('users/' + auth.currentUser.uid).set({
    //         name: auth.currentUser.displayName.split(' ')[0],
    //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //         uid: auth.currentUser.uid,
    //         photoURL: auth.currentUser.photoURL
    //       });
    //       console.log('User data written')

        // createWidget(auth.currentUser.uid);
        createWidget();

    }, [])

    const createWidget = async () => {
        await widgetsRef.add({
            uid: 'testID'
        })
  
        setFormValue('');
        dummy.current.scrollIntoView(); //{ behavior: 'smooth' }
      }




    const { uid, photoURL } = auth?.currentUser;
    const sendMessage = async (e) => {
      e.preventDefault();
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })

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