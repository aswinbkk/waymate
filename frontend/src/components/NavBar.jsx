import React from 'react'
import "../style/navbar.css"

function NavBar() {
  return (
    <div>
        <div class= "nav_container">
        <div class="logo"><img src="/waymate_standalone_icon.png"></img></div>
        <div class="nav_center">
            <ul>
                <li>Home</li>
                <li>Search</li>
                <li>Contact</li>
                <li>About</li>
            </ul>
        </div>
        <button>Login</button>
        </div>
    </div>
  )
}

export default NavBar