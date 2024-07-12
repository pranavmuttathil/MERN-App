import { useEffect } from "react"
import '../styles/home.css'
import { Link } from "react-router-dom"

export default function Home(){

    return(
        <div class="ok  ">
        <h1>Welcome to Home Page of our School</h1>
        
        
        <div className="home-page">
        <div className="card">
        <Link to="/Adminlogin" class="nav-link">
            <img src={require('./admin.jpg')} alt="Card Image" className="card-image" />
            <div className="card-content">
              <h3>Admin Login</h3>
              
            </div>
            </Link>
        </div>
        <div className="card">
        <Link to="/login" class="nav-link">
            <img src={require('./student.jpg')} alt="Card Image" className="card-image" />
            <div className="card-content">
              <h3>Student Login</h3>
              
            </div>
            </Link>
        </div>
        <div className="card">
        <Link to="/register" class="nav-link">
            <img src={require('./register.jpg')} alt="Card Image" className="card-image" />
            <div className="card-content">
              <h3>Register</h3>
              
            </div>
            </Link>
        </div>
      </div>
      </div>
    )
}