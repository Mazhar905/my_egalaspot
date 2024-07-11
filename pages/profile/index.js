import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const res = await axios.get('/api/profile', {
          headers: { Authorization: token }
        });

        setUser(res.data.user);
        setName(res.data.user.name);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setRole(res.data.user.role);
      } catch (error) {
        console.error(error);
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/profile', { name, username, email, password, role }, {
        headers: { Authorization: token }
      });

      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-6">Profile</h1>
      <div className="mb-4">
        <label className="block">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
    </div>
  );
};

export default Profile;
