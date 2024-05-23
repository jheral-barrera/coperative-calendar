export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4 d-flex align-items-center">
        <span className="navbar-brand">
            <i className=" fas fa-calendar-days fa-lg"></i>
            &nbsp;
            Pequita
        </span>

        <button className="btn btn-outline-danger">
            <i className="fas fa-sign-out-alt"></i> 
            &nbsp;
            Logout
        </button>
    </div>
  )
}
