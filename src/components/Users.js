import '../App.css';
import React from 'react'


export default function Users({ auth, firestore, firebase, useCollectionData }) {

    // const usersRef = firestore.collection('users');
    // const userQuery = usersRef.orderBy('createdAt').limit(25);
    // const [users] = useCollectionData(userQuery, { idField: 'id' });


    return (
        <div className='users-grid'>
            <p>User 1</p>
            <p>User 1</p>
            <p>User 1</p>
        </div>
	);
}
