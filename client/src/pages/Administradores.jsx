import { getAllUsers } from "../api/User.api"
import { useState } from "react";
import { useEffect } from "react";
import { UserCard } from "../components/UserCard";
import "./Administradores.css"

export function Admin(){
    const [users,setUsers] = useState([])
    
    useEffect(()=>{
        async function loadAllUsers(){
            const res = await getAllUsers();
            setUsers(res)
            console.log(res)
        }   
    loadAllUsers()
    },[])
    
    

return( <div className="UserCard-continer" >
        {users.map(user =>(
            <UserCard user = {user}/>
        ))}
    </div> )
}