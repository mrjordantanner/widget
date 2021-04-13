import '../App.css'
import React from 'react'

export default function SignIn( { firebase } ) {

  const auth = firebase.auth();

  function handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
    return (
      <div className='center sign-in'>
        <div className='logo'>C L I Q U E</div>
        <button className='sign-in-button' onClick={handleSignIn}>Sign In with Google</button>
        
      </div>
    )
  
  }