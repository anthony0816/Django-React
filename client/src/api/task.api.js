import axios from "axios"
import { jwtDecode } from "jwt-decode";

// Configurar Axios para enviar cookies en cada petición


var objetos = Array(0)

//---------OBTENER TAREA
export const getTask= async (id)=>{
    const rawToken = localStorage.getItem("access_token")

    const res = await axios.get('http://localhost:8000/tasks/api/v1/tasks/' + id + '/',{
        headers: {
        'Authorization': `Bearer ${rawToken}`
        }
    })

return res.data
}

//---------OBTENER TODAS LAS TAREAS (solo para desarrolladores)
export const  getAllTask = ()=> {
return  axios.get('http://localhost:8000/tasks/api/v1/tasks/')
}

// OBTENER LAS TAREAS DEL USAUARIO AUTENTICADO 
export const getUserTasks =async ()=>{
    const rawToken = localStorage.getItem("access_token")
    const token = jwtDecode(rawToken)
    
    const res = await axios.get('http://localhost:8000/tasks/api/v1/tasks/',{
        params: {
            user_id : token.user_id
        },
        headers: {
        'Authorization': `Bearer ${rawToken}`
        }
    })
    
    return res
}


//---------ELIMINAR
export const deleteTask=(id)=>{
    return axios.delete('http://localhost:8000/tasks/api/v1/tasks/' + id + '/',{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
}

//----------ELIMINAR TODAS
export const deleteALL=async ()=>{
    const res = await getUserTasks()
    let tareas = res.data;
    
    for (let index = 0; index < tareas.length; index++) {
        objetos[index] = tareas[index]
        deleteTask(tareas[index].id)
        
    }
}
//--------DESHACER ELIMINAR TODAS
export const deshacer = ()=>{
    for (let index = 0; index < objetos.length; index++) {
        let task = {
            title:objetos[index].title,
            description: objetos[index].description,
            done: objetos[index].done
        }
        createTask(task);
        
    }
    objetos = []
}

//---------CREAR NUEVA TAREA
export const createTask=(task)=>{ 
    axios.post("http://localhost:8000/tasks/api/v1/tasks/", task, {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    });
};

//--------UPDATE
export const update =(id,task)=>{
    const res = axios.put('http://localhost:8000/tasks/api/v1/tasks/' + id + '/',task , {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    return res
}

//--------AUTENTICAR USUARIO
export const AutenticarUsuario=async (username)=>{ 
    const respuesta = await axios.post("http://localhost:8000/tasks/user/", {
            username:username
            
        }, {
            headers: {
                "Content-Type": "application/json",  // Clave para que Django reconozca el JSON
            }
        });
        
        return respuesta
};

//------------VERIFICAR USUARIO
export  const VerificarUsuario = async()=>{
    const respuesta =  await axios.get("http://localhost:8000/tasks/verificar-user/").data.mensaje
    
    return true
    
}

// Crear Usuario 
export const CrearUsuario = async (username,password)=>{
    await getCsrfToken();
    
    const getCSRFToken =()=>{
        return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    }
    const CSRFToken = getCSRFToken()
    

    const res = await axios.post("http://localhost:8000/tasks/create-user/",{
        username:username,
        password: password
    },{
        headers: {
                'X-CSRFToken': CSRFToken,
                "Content-Type": "application/json",  // Clave para que Django reconozca el JSON
            }
    })
    return res;
}


const getCsrfToken = async () => {
    const response = await fetch('http://localhost:8000/tasks/csrf-token/', { 
        credentials: 'include'  
        });
    const data = await response.json();
    
};

