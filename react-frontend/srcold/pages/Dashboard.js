import React from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';

const Dashboard = () => {
  const isSuperAdmin = useSelector((state) => state.auth.isSuperAdmin);
console.log("Wali isAdmin",isSuperAdmin);
  return (
    <div>
      <h1>Dashboard</h1>
      {isSuperAdmin ? <p>Welcome, Super Admin!</p> : <p>Welcome, User!</p>}

      {/* Logout Button */}
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
