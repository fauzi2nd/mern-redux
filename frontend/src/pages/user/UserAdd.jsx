import React, { useEffect } from "react";
import Layout from "../Layout";
import UserFormAdd from "../../components/user/UserFormAdd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserAdd = () => {
  const navigate = useNavigate();
  const { user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if(user && user.roles !== 'Super Admin') {
        navigate('/dashborad')
    }
  }, [user, isError, message, navigate]);
  return (
    <Layout>
      <UserFormAdd />
    </Layout>
  );
};

export default UserAdd;
