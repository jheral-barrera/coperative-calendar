import { useAuthStore } from "../../hooks/useAuthStore"

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4 d-flex align-items-center">
        <span className="navbar-brand">
            <i className=" fas fa-calendar-days fa-lg"></i>
            &nbsp;
            {user.name}
        </span>

        <button className="btn btn-outline-danger" onClick={ startLogout }>
            <i className="fas fa-sign-out-alt"></i> 
            &nbsp;
            Logout
        </button>
    </div>
  )
}
