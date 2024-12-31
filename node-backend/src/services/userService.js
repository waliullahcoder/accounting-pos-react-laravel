const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userModel = require('../models/userModel');

exports.register = async ({ first_name, last_name, phone_number, zip_code, is_superadmin, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return userModel.createUser(first_name, last_name, phone_number, zip_code, is_superadmin, email, hashedPassword);
};

exports.login = async ({ email, password }) => {
  const user = await userModel.findUserByemail(email);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: '1h',
  });
  console.log("WALIPAPPU",token);
 
  return {
    "access_token": token,
    "token_type": "bearer",
    "is_superadmin": user.is_superadmin || 0,
    "expires_in": 2073600
  }
  
};


exports.getUserList = async () => {
  try {
    const users = await userModel.getUserList();
    return users;
  } catch (error) {
    throw new Error('Failed to retrieve users');
  }
};


