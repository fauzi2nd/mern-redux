import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../pages/Layout'
import Home from '../components/Home'

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {

    if (!user) {
      navigate('/login');
    }

  }, [user, navigate]);

  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
}

export default Dashboard;
