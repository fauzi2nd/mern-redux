import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </Link>
        <Link
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item">Home</Link>
          <Link className="navbar-item">Documentation</Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link">More</Link>
            <div className="navbar-dropdown">
              <Link className="navbar-item">About</Link>
              <Link className="navbar-item">Jobs</Link>
              <Link className="navbar-item">Contact</Link>
              <hr className="navbar-divider" />
              <Link className="navbar-item">Report an issue</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          {user ? (
            <div className="buttons">
              <button className="button is-light" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <>
              <div className="buttons">
                <Link className="button is-info" to="/register">
                  <FaSignInAlt /><strong> Sign up</strong>
                </Link>
                <Link className="button is-light" to="/login">
                  <FaUser /> Log in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
