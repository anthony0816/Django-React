import "./RegisterForm.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { AutenticarUsuario } from "../api/task.api"
import { CrearUsuario } from "../api/task.api"

export function RegisterForm(){
    
    const navegate = useNavigate()
    const [username, setUsername] = useState("");
    let primaryColor = getComputedStyle(root).getPropertyValue('--primary');
    let red = getComputedStyle(root).getPropertyValue('--red');

    async function loadAutenticarUsuario(){
        const res = await (await AutenticarUsuario(username)).data.mensaje
        const alerta = document.getElementById("usuario-valido-estado")
        const button_submit = document.getElementById("button-submit")
        const root = document.documentElement;
        
        if (res == "no valido"){
            button_submit.type = "button"
            alerta.style.color= red
            alerta.textContent = "No valido, Ya existe ese usuario"
        }
        else if(res == "valido"){
            let username_sin_espacios = username.trim()
            
            if(username_sin_espacios.length <= 5){
                button_submit.type = "button"
                alerta.style.color= red
                alerta.textContent = "Caracteres insuficientes"
            }
            else if(/\s/.test(username.trim())){
                button_submit.type = "button"
                alerta.style.color= red
                alerta.textContent = "No debe contener espacios"
            }
            else{
                button_submit.type = "submit"
                alerta.style.color = primaryColor
                alerta.textContent="valido"
            }
        }
        else if(res == "vacio"){
            alerta.textContent=""
        }
    }
    loadAutenticarUsuario()

    async function HandleSubmit(e){
        e.preventDefault()
        // Campos de Contraseña y confirmar contraseña
        const pas1 = document.getElementById("registerUser-contraseña").value
        const pas2 = document.getElementById("registerUser-confirmar-contraseña").value
        const alertp1p2 = document.querySelectorAll(".pasword_alert")
        alertp1p2[0].style.color= red
        alertp1p2[1].style.color= red

        if (pas1 != pas2){
            alertp1p2[0].textContent = "No coinciden"
            alertp1p2[1].textContent = "No coinciden"
        }
        else if(pas1.length <= 4 || pas2 <= 4){
            alertp1p2[0].textContent = "Más de 4 caracteres"
            alertp1p2[1].textContent = "Más de 4 caracteres"
        }
        else{
            const res = await CrearUsuario(username,pas1);
            console.log("bienvenido",res.data)
            navegate("/")
        }

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
                <div><strong id="usuario-valido-estado" ></strong></div>
            </label>

            <div className="registerUser-labelContraseña-container">
                
                <div className="pas_continer">
                    <label id="registerUser-labelContraseña" className="registerUser-label"> Contraseña
                    <input required type="password" id="registerUser-contraseña" className="registerUser-input"/>
                    </label> <div><strong className="pasword_alert" ></strong></div>
                </div>
                <div className="pas_continer">    
                    <label id="registerUser-labelContraseña" className="registerUser-label">Confirmar Contraseña
                    <input required type="password" id="registerUser-confirmar-contraseña" className="registerUser-input"/>
                    </label> <div><strong className="pasword_alert" ></strong></div>
                </div>
            
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