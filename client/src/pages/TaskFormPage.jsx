import { createTask } from "../api/task.api"
import styles from "./TaskFormPage.module.css";
import { jwtDecode } from "jwt-decode";

export function TaskFormPage() {
    
    function BuildTask(event) {
    
    event.preventDefault(); // Evita la recarga del formulario
    let title = document.getElementById("title_input").value;
    let description = document.getElementById("description_input").value;
    let done = document.getElementById("checkbox_input").checked;
    const token = localStorage.getItem('access_token')
    const token_decodificado = jwtDecode(token)
    const user_id = token_decodificado.user_id
    
    const task = {
        user_id: user_id,
        title: title,        
        description: description, 
        done: done        
    };
    console.log("Enviando tarea:", task);
    createTask(task);
        
}

    
    return (
        <div className={styles.container}>
                <form onSubmit={BuildTask} className={styles.form}>
                <h1 className={styles.h1}>Crear Tarea</h1>
                <label htmlFor="title_input" className={styles.label}> Titulo</label>
                <input type="text" placeholder="title" id="title_input" className={styles.input} />
                <label htmlFor="description_input" className={styles.label}> Description</label>
                <textarea rows="3" id="description_input" className={styles.textarea}></textarea>
                <label className={styles.checkboxContainer}>
                    Hecho
                    <input id="checkbox_input" type="checkbox" className={styles.checkbox} />
                </label>
                <button type="submit" className={styles.button}>Save</button>
            </form>
        </div>
    );
}



