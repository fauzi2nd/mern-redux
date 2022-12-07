import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser, reset } from "../../features/user/userSlice";

const UserFormAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confPassword: "",
    gender: "Male",
    phone: "",
    roles: "Admin",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, isCreated, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isCreated) {
      navigate("/users");
    }
  }, [users, isCreated, navigate, dispatch]);

  let load = "button is-info is-fullwidth ";

  const {
    name,
    email,
    username,
    password,
    confPassword,
    gender,
    phone,
    roles,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      username,
      password,
      confPassword,
      gender,
      phone,
      roles,
    };

    dispatch(createUser(userData));
  };

  if (isError) {
    load -= "is-loading";
    dispatch(reset());
    toast.error(message);
  }

  if (isLoading) {
    load += "is-loading";
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    id="name"
                    className="input"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Enter your name... "
                  />
                </div>
              </div>
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
                    placeholder="Enter your email..."
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    type="text"
                    id="username"
                    className="input"
                    name="username"
                    value={username}
                    onChange={onChange}
                    placeholder="Enter your username..."
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
                    placeholder="Enter your password..."
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    id="confPassword"
                    className="input"
                    name="confPassword"
                    value={confPassword}
                    onChange={onChange}
                    placeholder="Enter your confirm password..."
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Gender</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      id="gender"
                      name="gender"
                      value={gender}
                      style={{ color: gender ? "black" : "gray" }}
                      onChange={onChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                  <input
                    type="text"
                    id="phone"
                    className="input"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    placeholder="Enter your phone..."
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Roles</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      id="roles"
                      name="roles"
                      value={roles}
                      onChange={onChange}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className={load}>
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormAdd;
