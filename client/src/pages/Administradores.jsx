import { getAllUsers } from "../api/User.api"
import { useState } from "react";

export function Admin(){
    const [users,setUsers] = useState([])
    async function loadAllUsers(){
        const res = await getAllUsers();
        console.log(res)
    }   
    loadAllUsers()
    
    

return( <div>
        Hola mundo 
    </div> )
}