import '../styles/LoggedInContent.css'
import { Link } from "react-router-dom"
export default function LoggedInContent(){
  
  return(
    <div >
    <header class="header">
      <h1>School Management Portal</h1>
    </header>
  
  
    <nav class="navbar">
      <ul>
        <li><a href="http://localhost:3000/home">Home</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </nav>
  
   
    <section class="content">
      <div class="background-image">
      <img src={require('./c.png')} alt="Background Image" class="bg-img" id="img" width={"60%"} />
        <div class="content-text">
        <h2>Welcome to Our School Management Portal</h2>
  <p>Our School has boasted High Success Rates throughout primary and secondary designations</p>
  
  <h3>About Us</h3>
  <p>Our school is dedicated to providing quality education and fostering an environment where students can thrive academically and personally.</p>
  
  <h3>Key Features</h3>
  <ul>
    <li>Easy access to class schedules and assignments.</li>
    <li>Personalized student profiles for monitoring progress.</li>
    <li>Communication tools for parents and teachers.</li>
    <li>Secure and reliable platform for school-related information.</li>
  </ul>
  
  
        </div>
      </div>
    </section>
  
    
    <footer class="footer">
      <div class="contact-info">
        <p>Contact us at: example@email.com</p>
      </div>
    </footer>
    </div>
  )
}