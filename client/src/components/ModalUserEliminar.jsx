
import "./ModalUserEliminar.css";

export function ModalUserEliminar({ onConfirm, onCancel }) {
    

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-content">
                    <h3 className="modal-title">Confirmar Eliminación</h3>
                    <p className="modal-message">
                        ¿Estás seguro que deseas eliminar el usuario ? 
                    </p>
                    
                    
                    <div className="modal-buttons">
                        <button 
                            className="modal-button modal-button-cancel"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                        <button 
                            className="modal-button modal-button-confirm"
                            onClick={onConfirm}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
