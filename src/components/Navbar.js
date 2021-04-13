import '../App.css'
import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar({ auth, removeWidget }) {
    return (
        <div className='navbar'>
            <h2>C L I Q U E</h2> 
            <ul>
                <li><a href='http://www.jordantanner.net' target='_blank'>Contact</a></li>
                {auth.currentUser && (
                <li><button
                onClick={() => (auth.signOut())}>Log Out</button></li>)}
            </ul>
        </div>
    )
}
