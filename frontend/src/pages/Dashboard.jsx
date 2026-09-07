import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        };
        const { data } = await API.get('/api/users/profile', config);
        setUser(data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('userInfo');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!user) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
      <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
        <h3 className="text-xl font-semibold mb-4 text-indigo-800">Welcome, {user.name}!</h3>
        <p className="text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Skills</h3>
        <div className="bg-gray-50 border border-dashed border-gray-300 p-8 text-center rounded-lg">
          <p className="text-gray-500">You haven't added any skills to swap yet.</p>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            Add a Skill
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
