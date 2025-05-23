import "./EditarUser.css"
import { uptadeUser } from "../api/User.api";
import { ModalUserEliminar } from "./ModalUserEliminar";
import { useState } from "react";
import { DeleteUser } from "../api/User.api";

export function EditarUser({ user , onClose, onRefresh} ) {
    const [estado,setEstado] = useState(false)

    function HandleSubmit(e){
        e.preventDefault();
        const user_id = user.id
        const username = document.querySelector(`[name="username${user.id}"]`);
        const email = document.querySelector(`[name="email${user.id}"]`);
        const is_staff = document.querySelector(`[name="is_staff${user.id}"]`);
        const is_superuser = document.querySelector(`[name="is_superuser${user.id}"]`);

        const newUser = {
            id:user_id,
            username: username.value,
            email:email.value,
            is_staff:is_staff.checked,
            is_superuser:is_superuser.checked
        }
        console.log("usuario de la card", user)
        console.log("nuevo usuario", newUser)
        async function loadUpdate(){
            const res = await uptadeUser(newUser);
            
            if(res)onRefresh(onClose);
            if(!res){
                console.log("error")
            }
            
        }
        loadUpdate();
    }

    function CloseState(){
        return(
            setEstado(!estado)
        )
    }

    async function onDelete(){
        const res = await DeleteUser(user.id)
        if(res.status == 204){
            onRefresh(onClose)
            CloseState()
        }   
    }
    
    return (
        <form className="user-form" onSubmit={HandleSubmit}>
            <div className="form-row">
                <label className="form-label">Username:</label>
                <input 
                    type="text" 
                    name= {`username${user.id}`} 
                    defaultValue={user.username} 
                    className="form-input"
                />
            </div>

            <div className="form-row">
                <label className="form-label">Email:</label>
                <input 
                    type="email" 
                    name={`email${user.id}`} 
                    defaultValue={user.email} 
                    className="form-input"
                />
            </div>

            <div className="form-row checkbox-row">
                <label className="form-checkbox-label">
                    <input 
                        type="checkbox" 
                        name={`is_staff${user.id}`} 
                        defaultChecked={user.is_staff} 
                        className="form-checkbox"
                    />
                    <span className={`staff-tag ${user.is_staff ? "staff-yes" : "staff-no"}`}>
                        Staff
                    </span>
                </label>

                <label className="form-checkbox-label">
                    <input 
                        type="checkbox" 
                        name={`is_superuser${user.id}`} 
                        defaultChecked={user.is_superuser} 
                        className="form-checkbox"
                    />
                    <span className={`superuser-tag ${user.is_superuser ? "superuser-yes" : "superuser-no"}`}>
                        Admin
                    </span>
                </label>
            </div>

            <button type="submit" className="form-submit">
                Guardar Cambios
            </button>

            <button type="button" className="delette-button" onClick={CloseState} >
                Eliminar
            </button>

            <button type="button" className=" cancelar-button " onClick={onClose}>
                Cancelar
            </button>

        {estado && <ModalUserEliminar onCancel={CloseState} onConfirm={onDelete} />}
        </form>
    );
}
