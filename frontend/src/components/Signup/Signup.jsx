import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/Login.css';
import axios from 'axios'; // Make sure to install axios: npm install axios
import { registerUser } from '../../api';

const Signup = () => {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [err, setErr] = useState(""); // Error state for handling errors
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // For navigation after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr('');

    if (password !== confirmPassword) {
      setErr('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('role', role);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('contactNumber', contactNumber);
    formData.append('age', age);
    formData.append('gender', gender);
    if (image) {
      formData.append('image', image);
    }

    if (role === 'doctor') {
      formData.append('specialization', specialization);
      formData.append('hospitalName', hospitalName);
    } else {
      formData.append('address', address);
    }

    try {
      const response = await registerUser(formData);
      if (response.data.success) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        setErr(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data) {
        setErr(error.response.data.message || 'An error occurred during registration');
      } else {
        setErr('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="whole">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-heading">Register</h2>
          {err.length !== 0 && <p className="fs-2 text-danger text-center">{err}</p>}
          <div className="form-group">
            <label>Register as</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Profile Picture</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          {role === 'doctor' && (
            <>
              <div className="form-group">
                <label>Specialization</label>
                <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Hospital Name</label>
                <input type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required />
              </div>
            </>
          )}
          {role === 'patient' && (
            <div className="form-group">
              <label>Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
          )}
          <button type="submit" className="btn auth-btn" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
