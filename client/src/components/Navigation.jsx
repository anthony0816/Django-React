import { Link } from "react-router-dom";
import styles from "./Navigation.module.css"; 
import { AuthContext } from "./AuthProvider ";
import { useContext } from "react";

export function Navigation() {

        const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

        const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token')
    setIsAuthenticated(false);
    };
    console.log("estado de autenticacion", isAuthenticated)
    
    return (
        <nav className={styles.navContainer}>
            {isAuthenticated?(
                // SI  ESTAS AUTENTICADO
                <>
            
            <Link to={"/tasks"} className={styles.navLogo}>
                <h1>Task App</h1>
            </Link>
            <Link to={"/taskForm"} className={styles.navLink}>Create Task</Link>          
            <button onClick={()=>handleLogout()} className={styles.navLink} >Log out</button>
            
            </>):(
                // SI NO ESTAS AUTENTICADO
                <>
            
            <Link to={"/"} className={styles.navLink}> Log in  </Link>
            
            </>)}
            
            
        </nav>
    );
}