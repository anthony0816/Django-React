import "./EditarUser.css"

export function EditarUser({ user , onClose} ) {
    
    function HandleSubmit(e){
        e.preventDefault();
        const user_id = user.id
        const username = document.querySelector(`[name="username${user.id}"]`);
        const email = document.querySelector(`[name="email${user.id}"]`);
        const is_staff = document.querySelector(`[name="is_staff${user.id}"]`);
        const is_superuser = document.querySelector(`[name="is_superuser${user.id}"]`);
        console.log("user",user_id, username.value,email.value,is_staff.checked,is_superuser.checked)
        const User = {

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

            <button type="button" className="delette-button" >
                Eliminar
            </button>

            <button type="button" className=" cancelar-button " onClick={onClose}>
                Cancelar
            </button>


        </form>
    );
}
