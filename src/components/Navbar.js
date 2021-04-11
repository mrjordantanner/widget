import '../App.css'
import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar({ auth }) {
    return (
        <div className='navbar'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {auth.currentUser && (
                <li><button className="sign-out" 
                onClick={() => auth.signOut()}>Sign Out</button></li>)}
            </ul>
        </div>
    )
}