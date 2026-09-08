import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import AddSkill from './pages/AddSkill';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="bg-indigo-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">SkillSwap</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-indigo-200">Home</Link>
              <Link to="/skills" className="hover:text-indigo-200">Skills</Link>
              <Link to="/login" className="hover:text-indigo-200">Login</Link>
              <Link to="/register" className="hover:text-indigo-200">Register</Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/add-skill" element={<AddSkill />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
