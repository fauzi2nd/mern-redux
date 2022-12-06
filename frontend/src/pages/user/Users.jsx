import React, { useEffect } from "react";
import Layout from "../Layout";
import Userlist from "../../components/user/Userlist";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
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
