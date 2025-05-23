import { useEffect, useState } from "react";
import { getAllTask } from "../api/task.api";
import { TaskCard } from "./TaskCard";
import { getUserTasks } from "../api/task.api";

export function TaskList(){
    const [tasks, setTasks] = useState([])
    
    useEffect(()=>{
        async function LoadTasks(){
            const res = await getUserTasks()
            setTasks(res.data);
            
            
        }
        LoadTasks();
    },[]);

    async function refreshDeleteTask(){
        const res = await getUserTasks()
        setTasks(res.data)
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
                padding: "20px"
            }}
        >
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} onTaskDeleted={refreshDeleteTask}/>
            ))}
        </div>
    );
    
    
}
