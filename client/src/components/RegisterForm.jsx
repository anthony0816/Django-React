import "./RegisterForm.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { AutenticarUsuario } from "../api/task.api"

export function RegisterForm(){
    
    const navegate = useNavigate()
    const [username, setUsername] = useState("");
    

    async function loadAutenticarUsuario(){
        const res = await (await AutenticarUsuario(username)).data.mensaje
        const alerta = document.getElementById("usuario-valido-estado")
        const button_submit = document.getElementById("button-submit")

        if (res == "no valido"){
            button_submit.type = "button"
            alerta.style.color="red"
            alerta.textContent = "No valido, Ya existe ese usuario"
        }
        if(res=="valido"){
            button_submit.type = "submit"
            alerta.textContent=""
        }
    }
    loadAutenticarUsuario()

    function HandleSubmit(e){
        

        const contraseña = document.getElementById("registerUser-contraseña").value
        const confirmar_contraseña = document.getElementById("registerUser-confirmar-contraseña").value


    }   

    return( <div className="registerUser-container">
    <form className="registerUser-form" onSubmit={HandleSubmit}>
        <h1 className="registerUser-title">Registrarse</h1>
        
        <div className="registerUser-group">
            <label id="registerUser-labelUsuario" className="registerUser-label"> Nombre de Usuario
                <input type="text" id="registerUser-usuario" className="registerUser-input"
                required
                onChange={(e)=>setUsername(e.target.value)}
                />
                <div id="usuario-valido-estado"></div>
            </label>

            <div className="registerUser-labelContraseña-container">
                
                <label id="registerUser-labelContraseña" className="registerUser-label"> Contraseña
                <input required type="password" id="registerUser-contraseña" className="registerUser-input"/>
            </label>

            <label id="registerUser-labelContraseña" className="registerUser-label">Confirmar Contraseña
                <input required type="password" id="registerUser-confirmar-contraseña" className="registerUser-input"/>
            </label>
            
            </div>
        </div>
        <div className="registerUser-actions">
            <button id="button-submit" type="submit" className="registerUser-button">Aceptar</button>
            <div id="registerUser-respuesta" className="registerUser-response"></div>
            
            <div className="registerUser-container">
                <button className="registerUser-button" onClick={(e)=>{ 
                    e.preventDefault();
                    navegate("/");
                }}
                    >Cancelar</button>
            </div>
        </div>
    </form>
</div>


)
}