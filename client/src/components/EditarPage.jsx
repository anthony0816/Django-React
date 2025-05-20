import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTask } from "../api/task.api";
import { useNavigate } from "react-router-dom";
import "./EditarPage.css";
import { update } from "../api/task.api";


export function Editar() {
    const navegate = useNavigate()
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const LoadTask = async () => {
            try {
                const fetchedTask = await getTask(id);
                setTask(fetchedTask); // Aquí actualizamos el estado con los datos
            } catch (error) {
                console.error("Error al cargar la tarea:", error);
            }
        };
        
        LoadTask();
    }, [id]);

    async function HandleSubmit(e, task) {
    e.preventDefault(); // Evita que el formulario recargue la página
    const id = task.id
    const oldTask =  await getTask(id)
    const newTask ={
        title: document.querySelector("#title").value ,
        description: document.querySelector("#description").value,
        done: document.querySelector("#done").checked
    }
    
    if((oldTask.title == newTask.title)&&(oldTask.description == newTask.description)&&(oldTask.done == newTask.done)){
        return
    }
    else{
        await update(id,newTask) // para saber si se esta pasando bien
        const modal =document.querySelector("#modal")
        const background = document.querySelector("#main_continer")
        modal.style.display="block"
        background.style.display="none"
    }
}

    

    return (
        <div className="edit-wrapper" >
            <div className="edit-container" id="main_continer">
                <div className="header">
                    <h1 className="edit-title">Editando Tarea #{id}</h1>
                    <div className="user-badge">usuario</div>
                </div>
                
                <form className="edit-form" onSubmit={(event)=>HandleSubmit(event,task)}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Título
                        </label>
                        <input 
                            type="text" 
                            id="title" 
                            className="form-input"
                            placeholder="Escribe el título"
                            value={task?.title || ""}
                            onChange={(e) => setTask({...task, title: e.target.value})}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Descripción
                        </label>
                        <textarea 
                            id="description" 
                            className="form-textarea"
                            placeholder="Describe la tarea..."
                            rows="4"
                            value={task?.description || ""}
                            onChange={(e) => setTask({...task, description: e.target.value})}
                        />
                    </div>
                    
                    <div className="form-group checkbox-group">
                        <div className="checkbox-container">
                            <input 
                                type="checkbox" 
                                id="done" 
                                className="form-checkbox"
                                checked={task?.done || false}
                                onChange={(e) => setTask({...task, done: e.target.checked})}
                            />
                            <label htmlFor="done" className="checkbox-label">
                                Completada
                            </label>
                        </div>
                    </div>
                    
                    <div className="form-buttons">
                        <button type="button" className="form-button cancel-button"
                        onClick={()=>navegate("/tasks")}
                        > Cancelar         
                        </button>

                        <button type="submit" className="form-button submit-button">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal" id="modal">
                <h2>La tarea fue actualizada exitosamente</h2>
                <button onClick={()=>navegate("/tasks")} >Aceptar</button>
            </div>
        </div>
    );
}

