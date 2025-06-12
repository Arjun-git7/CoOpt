import React,{ useState } from 'react'
import { assets } from '../../assets/assets'
import "../ui/NavBar.css"

const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen)
      }
 
    return (
    <nav className="navbar">
            <div className="navbar-logo">
                <img src={assets.LogoCoOpt} alt="Co-Opt Logo" className="logo-img"/>
                <h1 className="logo-text">Co-Opt</h1>
            </div>

            {/* Middle: Search Bar */}
        <div className="navbar-search">
         <input
            type="text"
            placeholder="Search jobs, companies..."
            className="search-input"
        />
        <button className="search-button">Search</button>
        </div>

        {/* Right: Account Menu */}
        <div className="navbar-account">
         <div className="account-icon" onClick={handleDropdownToggle}>
           {/* Replace with a user icon or profile pic */}
           <span className="icon-letter">A</span>
         </div>
      
         {dropdownOpen && (
          <div className="account-dropdown">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li>Log Out</li>
            </ul>
          </div>
         )}
         </div>
    </nav>
  )
}

export default NavBar