import '../App.css'
import React from 'react'
// Firebase chat code from https://github.com/fireship-io/react-firebase-chat
export default function SignIn( { firebase, auth, createWidget } ) {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
      createWidget(auth);
    }
  
    return (
      <div className='center sign-in'>
        <h1>Welcome to Widget Chat</h1>
        {/* <button className="sign-in-button" onClick={signInWithGoogle}>Sign in with Google</button> */}
        <button onClick={signInWithGoogle}><img src='../img/btn_google_signin_light_normal_web.png' alt='Sign in with Google'></img></button>
        
      </div>
    )
  
  }