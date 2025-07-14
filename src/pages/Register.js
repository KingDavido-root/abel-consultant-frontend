import { useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'  // default role
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      login(res.data.token, res.data.user);
      navigate('/');  // redirect home
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border w-full p-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input className="border w-full p-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="border w-full p-2" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
}
