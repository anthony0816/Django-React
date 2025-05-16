import { TaskList } from "../components/TaskList"
import { deleteALL, deshacer } from "../api/task.api"
import "./TasksPage.css"

export function TasksPage(){
    return( <div className="cont0">
            <div className="cont1">
            <button id="deleteAllTask" onClick={()=>deleteALL()}>Delete All</button> 
            <button id="deshacer" onClick={()=>deshacer()} >Deshacer</button>      
            </div>
        <div className="cont3">
            <TaskList/>
        </div>
    </div>
        
    
    )
}