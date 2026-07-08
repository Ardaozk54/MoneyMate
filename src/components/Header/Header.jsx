import {NavLink } from 'react-router-dom'
import "./Header.css"
import { HiOutlineWallet } from "react-icons/hi2";
function Header() {
  return (
    

    <header className='header'>
    <div className='header-container'>
    <div className="logo">
    <HiOutlineWallet className="logo-icon" />
    <span className="logo-text">MoneyMate</span>
    </div>

  

    <nav className='navigationContainer'>
    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }  to="/">Dashboard</NavLink>
    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }  to="/transactions">Transactions</NavLink>
    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }  to="/add-transactions">Add Transactions</NavLink>
    </nav>

  

    </div>
    </header>


  )
}

export default Header