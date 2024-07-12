import axios from 'axios'
import { useEffect, useState } from 'react'
import '../styles/updateUsers.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { set } from 'mongoose'
export default function UpdateUsers(){
   const {id} = useParams()
   const[name,setName] = useState('')
   const[email,setEmail] = useState('')
   const navigate = useNavigate()

   useEffect(()=>{
      axios.get('http://localhost:5000/getUser/'+id)
      .then(result => {
         console.log(result)
         setName(result.data.name)
         setEmail(result.data.email)
      }
   )
      .catch(err => console.log(err))
   },[])

   const handleUpdate = (event)=>{
      event.preventDefault()
      axios.put('http://localhost:5000/updateUser/'+id, {name,email})
            .then(result => {
                console.log(result.data)
                navigate('/displayUsers')
            }
        )
            .catch((err) => { console.log(err) });
        };
    return(
        <div className="center">
                 <div className="header">
                    Edit Form
                 </div>
                 <form style={{ textAlign: 'center' }} onSubmit={handleUpdate}>
                  <input type="text" placeholder="Username" value={name} onChange={(event) => { setName(event.target.value) }} style={{ display: 'block', margin: '0 auto 10px' }} />
                  <i className="far fa-envelope"></i>
                  <input id="pswrd" type="email" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} value={email} style={{ display: 'block', margin: '0 auto 10px' }} />
                  <i className="fas fa-lock"></i>
                  <button type="submit" className="btn btn-success" style={{ display: 'block', width: '100%' }}>
                     Edit
                  </button>
            <br></br>
      </form>
</div>

    )
}