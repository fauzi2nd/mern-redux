import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  let load = "button is-info is-fullwidth ";

  if (isLoading) {
    load += "is-loading";
  }

  return (
    <>
      <section className="hero is-fullheight is-fullwidth is-info">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5">
                <p className="title">
                  <FaSignInAlt /> Login
                </p>
                <p className="subtitle">
                  Enter with your accout to acces this site
                </p>
                <form onSubmit={onSubmit} className="box">
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="email"
                        id="email"
                        className="input"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Enter your email."
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        type="password"
                        id="password"
                        className="input"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Enter your password."
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button type="submit" className={load}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
