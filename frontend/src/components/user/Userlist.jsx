import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUsers, deleteUser } from "../../features/user/userSlice";

const Userlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, isDeleted, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (users.length === 0) {
      dispatch(getUsers());
    }

    if (isDeleted) {
      toast.success(message);
    }
  }, [users, navigate, isDeleted, isLoading, isError, message, dispatch]);

  if (isDeleted) {
    toast.success(message);
  }

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>
                <td>
                  <Link
                    to={`/users/edit/${user._id}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => dispatch(deleteUser(user._id))}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
