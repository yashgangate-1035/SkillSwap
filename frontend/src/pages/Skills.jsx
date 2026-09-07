import { useState, useEffect } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await API.get('/api/skills');
        setSkills(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Skills to Swap</h2>
      
      {skills.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-sm">
          <p className="text-xl mb-4">No skills available yet.</p>
          <p>Be the first to offer a skill to the community!</p>
          <Link to="/add-skill" className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
            Offer a Skill
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(skill => (
            <div key={skill._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col h-full hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{skill.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{skill.description}</p>
              
              <div className="bg-gray-50 p-3 rounded-md mb-4 text-sm">
                <p className="mb-1"><span className="font-semibold text-gray-700">Offering:</span> {skill.offering}</p>
                <p><span className="font-semibold text-gray-700">Seeking:</span> {skill.seeking}</p>
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500 font-medium">{skill.user?.name || 'Unknown User'}</span>
                <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition text-sm font-medium">
                  Request Swap
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;
