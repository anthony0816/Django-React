import { getAllUsers } from "../api/User.api"
import { useState } from "react";
import { useEffect } from "react";
import { UserCard } from "../components/UserCard";
import "./Administradores.css"

export function Admin(){
    const [users,setUsers] = useState([])
    const [estado,setEstado] = useState(false)
    useEffect(()=>{
        async function loadAllUsers(){
            const res = await getAllUsers();
            setUsers(res)
            console.log("snbgwuv")
        }   
    loadAllUsers()
    },[estado])
    
    function Refresh(onClose){
        setEstado(!estado)
        onClose();
    }

return( <div className="UserCard-continer" >
        {users.map(user =>(
            <UserCard user = {user} Refresh={Refresh}/>
        ))}
    </div> )
}