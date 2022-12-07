import React, { useEffect } from "react";
import Layout from "../Layout";
import Userlist from "../../components/user/Userlist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user.token) {
      navigate("/login");
    }

    if(user && user.roles === 'User') {
        navigate('/dashborad')
    }
  }, [user, isError, message, navigate]);

  return (
    <Layout>
      <Userlist />
    </Layout>
  );
};

export default Users;
