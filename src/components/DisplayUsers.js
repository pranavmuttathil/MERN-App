import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/displayUsers.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
export default function DisplayUsers() {
        const {id} = useParams()
        const [users, setUsers] = useState([]);
        useEffect(()=>{
            const fetchUsers = async()=>{
                try{
                    const response = await axios.post('http://localhost:5000/displayUsers')
                    setUsers(response.data)
                }catch(err){
                    console.error('Error Fetching Users: ',err)
                }
            }
        fetchUsers();
        }
    ,[])



    const handleDelete = async(userId) =>{
        axios.delete('http://localhost:5000/deleteUser/'+userId)
        .then(result=>setUsers(result.data))
        .catch(err =>console.log(err))
    }

        return (
                <div className="bigwrapper">
                <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Update Details</th>
                    <th>Delete your Details</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link to={`/update/${user._id}`} className="btn btn-success">Edit</Link>
                    </td>
                    <td><button type="button" onClick={(e)=>{handleDelete(user._id)}} className="btn btn-danger">Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        
        </div>
        
        );
    }
