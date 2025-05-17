import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider ';
import "./Presentación.css"
import { login } from "../api/authService";
import { useEffect } from 'react';

export function Presentacion(){
    
    
    const { isAuthenticated,setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated){
        navigate("/tasks");
        
    }
    },[])
    

    const handleSubmit = async(e)=>{
        let usuario = document.getElementById("usuario").value
        let contraseña = document.getElementById("contraseña").value
        e.preventDefault();
        
        try{
            const respuesta = await login( usuario, contraseña )
        console.log("respuesta de loging", respuesta)

        const access = respuesta.data.access
        const refresh = respuesta.data.refresh
        
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token',refresh)
        setIsAuthenticated(true)
            navigate("/tasks")
        } catch (error){
            
            const root = document.documentElement;
            let color = getComputedStyle(root).getPropertyValue('--red');

            let etiqueta = document.getElementById("respuesta")
            etiqueta.style.backgroundColor = color
            etiqueta.textContent="Credenciales incorrectas"

            const inputUsername = document.getElementById("labelUsuario")
            const inputContraseña = document.getElementById("labelContraseña")

            inputUsername.style.color = "red"
            inputContraseña.style.color = "red" 
        }
        

        

    }

    const handleRegister = (e)=>{
    e.preventDefault()
    navigate("/register-form");
    }


    return(
        <div className="presentacion-container">
            <form onSubmit={handleSubmit} className="presentacion-form">
                <h1 className="presentacion-title">Autenticarse</h1>
                
                <div className="presentacion-group">
                    <label  id='labelUsuario' className="presentacion-label"> Usuario
                        <input type="text" id="usuario" className="presentacion-input"/>
                    </label>
                    <label id='labelContraseña' className="presentacion-label"> Contraseña
                        <input type="password" id="contraseña" className="presentacion-input"/>
                    </label>
                </div>
                <div className="presentacion-actions">
                    <button type='submit' className="presentacion-button">Submit</button>
                    <div id="respuesta" className="presentacion-response"></div>
                    
                    <div className='register-continer'>
                        <button className=' register-button presentacion-button' onClick={handleRegister}>Registrarse</button>
                    </div>
                </div>
            </form>
        </div>
    );
}




