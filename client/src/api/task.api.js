import axios from "axios"

// Configurar Axios para enviar cookies en cada petición


var objetos = Array(0)

//---------OBTENER TAREA
export const getTask= async (id)=>{
const res = await axios.get('http://localhost:8000/tasks/api/v1/tasks/' + id + '/')

console.log("respuesta de axios",res.data)
return res.data
}

//---------OBTENER TODAS LAS TAREAS
export const  getAllTask = ()=> {
return  axios.get('http://localhost:8000/tasks/api/v1/tasks/')
}

//---------ELIMINAR
export const deleteTask=(id)=>{
    return axios.delete('http://localhost:8000/tasks/api/v1/tasks/' + id + '/')
}

//----------ELIMINAR TODAS
export const deleteALL=async ()=>{
    const res = await getAllTask()
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
    axios.post("http://localhost:8000/tasks/api/v1/tasks/", task, );
};

//--------UPDATE
export const update =(id,task)=>{
    const res = axios.put('http://localhost:8000/tasks/api/v1/tasks/' + id + '/',task)
    return res
}

//--------AUTENTICAR USUARIO
export const AutenticarUsuario=async (username,password)=>{ 
    const respuesta = await axios.post("http://localhost:8000/tasks/user/", {
            username,
            password
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
    console.log("Esta autenticado ?", respuesta)
    return true
    
}

/*
export const apiTest =async ()=>{
    const respuesta =  await axios.get("http://localhost:8000/tasks/test/")
    console.log("respuesta de testing", respuesta)
}
*/

