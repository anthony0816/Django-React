

export function Eliminar(id) {
    const modal = document.getElementById(`modal_eliminar_${id}`);
    const taskCard = document.getElementById("task-card"+id)
    if (modal) {
        modal.style.top = "100%";
        
    } else {
        console.error(`No se encontró el modal con id: modal_eliminar_${id}`);
    }
}
