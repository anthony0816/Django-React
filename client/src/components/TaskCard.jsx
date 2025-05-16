import { Eliminar } from "../api/eliminarTarea";
import { deleteTask } from "../api/task.api";
import { useNavigate } from "react-router-dom";
import "./taskCard.css";

export function TaskCard({ task, onTaskDeleted }) {
    const navegate = useNavigate();
    const root = document.documentElement;
    const color = getComputedStyle(root).getPropertyValue('--primary');
    
    async function handleDelete(task_id){
        
        await deleteTask(task_id)
        await onTaskDeleted();
    }

    return (
        <div className="task-card" id={"task-card"+task.id}>
            <div className="task-status-bar"
                style={{
                    background: task.done 
                        ? "linear-gradient(90deg, #00c9a7, #00a8ff)"
                        : "linear-gradient(90deg, #ff6b6b, #ffa502)"
                }}
            />
            
            <h1 className="task-title">{task.title}</h1>
            
            <p className="task-description"> <strong><span style={{color:color}}>Description:</span></strong> {task.description? task.description : "empty"}</p>
            
            <div className="task-status">
                <div className="task-status-indicator" 
                    style={{
                        background: task.done ? "#00c9a7" : "#ff6b6b",
                        boxShadow: task.done 
                            ? "0 0 8px rgba(0, 201, 167, 0.5)"
                            : "0 0 8px rgba(255, 107, 107, 0.5)"
                    }}
                />
                <span className="task-status-text">
                    {task.done ? "Completado" : "Pendiente"}
                </span>
            </div>

            <div className="task-buttons">
                <button className="delete-button" onClick={() => Eliminar(task.id)}>Eliminar</button>
                <button className="edit-button" onClick={() => navegate("/task-edit/" + task.id)}>Editar</button>
            </div>

            <div id={"modal_eliminar_" + task.id} className="modal-eliminar">
                <h4> are you sure ? </h4>
                <button onClick={() => handleDelete(task.id)} className="boton_aceptar" id="boton_aceptar">Aceptar</button>
                <button onClick={() => {
                    document.getElementById("modal_eliminar_" + task.id).style.top = "220%" 
                    }}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

