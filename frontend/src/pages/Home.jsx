import { useState, useEffect } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

function Home() {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    // Testing API connection
    API.get('/api/test')
      .then(response => {
        setApiMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error connecting to API:', error);
        setApiMessage('Failed to connect to backend API');
      });
  }, []);

  return (
    <div className="text-center mt-20">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to SkillSwap</h2>
      <p className="text-xl text-gray-600 mb-8">Exchange skills, learn together, grow faster.</p>
      
      <div className="bg-white p-6 rounded-lg shadow-md inline-block mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Backend Connection Status:</h3>
        <p className={`font-medium ${apiMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
          {apiMessage || 'Connecting...'}
        </p>
      </div>

      <div className="space-x-4">
        <Link to="/register" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition inline-block">Get Started</Link>
        <Link to="/login" className="bg-white text-indigo-600 border border-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition inline-block">Log In</Link>
      </div>
    </div>
  );
}

export default Home;
