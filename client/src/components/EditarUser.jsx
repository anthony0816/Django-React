import "./EditarUser.css"

export function EditarUser({ user , onClose} ) {
    
    
    return (
        <form className="user-form">
            <div className="form-row">
                <label className="form-label">Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    defaultValue={user.username} 
                    className="form-input"
                />
            </div>

            <div className="form-row">
                <label className="form-label">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    defaultValue={user.email} 
                    className="form-input"
                />
            </div>

            <div className="form-row checkbox-row">
                <label className="form-checkbox-label">
                    <input 
                        type="checkbox" 
                        name="is_staff" 
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
                        name="is_superuser" 
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

            <button type="button" className="delette-button" >
                Eliminar
            </button>

            <button type="button" className=" cancelar-button " onClick={onClose}>
                Cancelar
            </button>


        </form>
    );
}
