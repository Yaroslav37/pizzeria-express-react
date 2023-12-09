// src/UserForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post('/users', { name, email });
      getUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      getUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.user_id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add User</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        createUser();
        setName('');
        setEmail('');
      }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
