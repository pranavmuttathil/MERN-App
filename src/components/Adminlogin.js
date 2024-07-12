import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import axios from 'axios';

import DisplayUsers from './DisplayUsers';
export default function AdminLogin(){
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[isLoggedIn,setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };
    if(email=='admin@example.com'){
    try {
      const response = await axios.post('http://localhost:5000/login', data);
      console.log(response.data); 

      if (response.data.success) {
        alert('Login successful!');
        setIsLoggedIn(true)
      } else {
        alert(response.data.message); 
      }
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.'); 
    }}
    else{
      alert('Login failed. Please try again.'); 
    }
  };
  
  return (
    <div>
      {isLoggedIn ? (
        navigate('/displayUsers')
      ) : (
        <div className="container">
          <input type="checkbox" id="check" />
          <div className="login form">
            <header>Admin Login</header>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                placeholder="Enter your email"
              />
              <input
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
              />
              
              <input type="submit" className="button" value="Login" />
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
}