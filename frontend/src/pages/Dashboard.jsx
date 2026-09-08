import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
      navigate('/login');
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const fetchDashboard = async () => {
      try {
        const [{ data: profile }, { data: userSkills }] = await Promise.all([
          API.get('/api/users/profile', config),
          API.get('/api/skills/my-skills', config),
        ]);
        setUser(profile);
        setSkills(userSkills);
      } catch (requestError) {
        console.error(requestError);
        localStorage.removeItem('userInfo');
        navigate('/login');
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleDelete = async (skillId) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    try {
      await API.delete(`/api/skills/${skillId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setSkills((currentSkills) => currentSkills.filter((skill) => skill._id !== skillId));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to delete skill');
    }
  };

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
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        {skills.length === 0 ? (
          <div className="bg-gray-50 border border-dashed border-gray-300 p-8 text-center rounded-lg">
            <p className="text-gray-500">You haven't added any skills to swap yet.</p>
            <button onClick={() => navigate('/add-skill')} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              Add a Skill
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill._id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-700">{skill.title}</h4>
                    <p className="text-gray-600">{skill.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Offering: {skill.offering} | Seeking: {skill.seeking}</p>
                  </div>
                  <button onClick={() => handleDelete(skill._id)} className="text-red-600 hover:text-red-800 font-medium">
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/add-skill')} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              Add a Skill
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
