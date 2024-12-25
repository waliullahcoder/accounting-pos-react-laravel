import React from 'react';
import { Link } from 'react-router-dom';

const LogoutButton = () => (
  <Link to="/logout">
    <button>Logout</button>
  </Link>
);

export default LogoutButton;
