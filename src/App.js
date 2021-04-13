import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import WidgetView from './components/WidgetView';

// import * as firebase from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/analytics';
// import 'firebase/database';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// Firebase chat code directly from https://github.com/fireship-io/react-firebase-chat

firebase.initializeApp({
  apiKey: "AIzaSyBmcvK_M-7ZkcefFkFNgCNx1ngOoY91cFo",
  authDomain: "jts-fire-chat.firebaseapp.com",
  projectId: "jts-fire-chat",
  storageBucket: "jts-fire-chat.appspot.com",
  messagingSenderId: "951004015934",
  appId: "1:951004015934:web:48818228f885f951dc106f",
  measurementId: "G-D2KF9H9F2X"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
// const database = firebase.database();
// const analytics = firebase.analytics();



function App() {

  const [user] = useAuthState(auth);

  //from https://firebase.google.com/docs/auth/admin/manage-users#list_all_users
  // const listAllUsers = (nextPageToken) => {
  //   // List batch of users, 1000 at a time.
  //   admin
  //     .auth()
  //     .listUsers(1000, nextPageToken)
  //     .then((listUsersResult) => {
  //       listUsersResult.users.forEach((userRecord) => {
  //         console.log('user', userRecord.toJSON());
  //       });
  //       if (listUsersResult.pageToken) {
  //         // List next batch of users.
  //         listAllUsers(listUsersResult.pageToken);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('Error listing users:', error);
  //     });
  // };
  // // Start listing users from the beginning, 1000 at a time.
  // listAllUsers();




  return (
    <div>
      <Switch>
					<Route
						exact path='/'
						render={() => (
              user ? 
              <div>
                <Navbar auth={auth} />

                <div className='grid-container'>
                  <Chat className='chat-grid' auth={auth} firestore={firestore} firebase={firebase} useCollectionData={useCollectionData}/> 
                  <WidgetView firestore={firestore} auth={auth}/>
                </div>
              </div>
              : 
              <SignIn firebase={firebase} firestore={firestore} auth={auth}/>
						)}
					/>
      </Switch>






        


    </div>
  );
}

export default App;
