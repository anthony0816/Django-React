import "./UserCard.css"
import { EditarUser } from "./EditarUser"
import { useState } from "react"
export function UserCard({ user , Refresh}) {
    const[estado,setEstado] = useState(false)
    
    
    
    function handleClick(){
        
        let card = document.querySelector(`.card${user.id}`)
        let cards = document.querySelectorAll(".user-card")
        let data = document.querySelector(`.user-data${user.id}`)
        let datas = document.querySelectorAll(".user-data")
        let form = document.querySelector(`.editar-user-continer${user.id}`)
        let forms = document.querySelectorAll(".editar-user-continer")
        
        datas.forEach((data)=>{
        data.classList.remove("user-data-hidden")
        })
        cards.forEach((card)=>{
        card.classList.remove("onTouch-Card")
        })
        forms.forEach((form)=>{
            form.classList.remove("editar-user-continer-active")
        })
        card.classList.add("onTouch-Card")
        data.classList.add("user-data-hidden")
        form.classList.add("editar-user-continer-active")
    }
    
    function centrar() {
        const div = document.querySelector(`.card${user.id}`);
        if (!div) return; 
        
        const posicion = div.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 5);

        window.scrollTo({ top: posicion, behavior: "smooth" });
    }

    function cerrar(){
        let card = document.querySelector(`.card${user.id}`)
        let data = document.querySelector(`.user-data${user.id}`)
        let form = document.querySelector(`.editar-user-continer${user.id}`)

        card.classList.remove("onTouch-Card")
        data.classList.remove("user-data-hidden")
        form.classList.remove("editar-user-continer-active")
        
    }
    
    return (
    
        <div className= {`user-card card${user.id} `}  onClick={centrar}  >
            <h2 className="user-name">{user.username}</h2>
            <div className={` user-data user-data${user.id} `}>
                <div className="user-card-header">
            
            </div>
            <div className="user-info">
                <div className="user-id"> {user.id}</div>
                <div className="user-email">{user.email? user.email : "No Disponible"}</div>
                <div className={`user-staff ${user.is_staff ? "staff-yes" : "staff-no"}`}>
                    Staff: {user.is_staff ? "Sí" : "No"}
                </div>
                <div className={`user-superuser ${user.is_superuser ? "superuser-yes" :      "superuser-no"}`}>
                Admin: {user.is_superuser ? "Sí" : "No"}
                </div>
                <div onClick={handleClick} className="user-editar" >Editar</div>
                
            </div>
            </div>
            <div className= {`editar-user-continer editar-user-continer${user.id}`} >
            <EditarUser user ={user} onClose= {cerrar} onRefresh={Refresh} />
            </div>
        </div>
        
    
    );
}