import '../App.css'
import React from 'react'
// Firebase chat code directly from https://github.com/fireship-io/react-firebase-chat
export default function SignIn( { firebase, auth } ) {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <div className='center sign-in'>
        <h1>Welcome to Widget Chat</h1>
        <button className="sign-in-button" onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    )
  
  }