import "./UserCard.css"
export function UserCard({ user }) {
    return (
<div className="user-card">
    <div className="user-card-header">
        <h2 className="user-name">{user.username}</h2>
    </div>
    <div className="user-info">
        <div className="user-id"> {user.id}</div>
        <div className="user-email">{user.email? user.email : "No Disponible"}</div>
        <div className={`user-staff ${user.is_staff ? "staff-yes" : "staff-no"}`}>
            Staff: {user.is_staff ? "Sí" : "No"}
        </div>
        <div className={`user-superuser ${user.is_superuser ? "superuser-yes" : "superuser-no"}`}>
            Admin: {user.is_superuser ? "Sí" : "No"}
        </div>
    </div>
</div>
    );
}