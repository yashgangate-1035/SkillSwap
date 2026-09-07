import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function AddSkill() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [offering, setOffering] = useState('');
  const [seeking, setSeeking] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo) {
      navigate('/login');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await API.post('/api/skills', { title, description, offering, seeking }, config);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add skill');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Offer a Skill</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Listing Title</label>
          <input 
            type="text" 
            placeholder="e.g., Learn conversational Spanish with a native"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea 
            rows="4"
            placeholder="Describe what you can teach and your experience level..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Skill You Offer</label>
            <input 
              type="text" 
              placeholder="e.g., Spanish Language"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={offering}
              onChange={(e) => setOffering(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Skill You Seek</label>
            <input 
              type="text" 
              placeholder="e.g., Python Programming"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={seeking}
              onChange={(e) => setSeeking(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button type="button" onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-gray-800 font-medium">
            Cancel
          </button>
          <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-6 rounded hover:bg-indigo-700 transition">
            Publish Skill
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSkill;
