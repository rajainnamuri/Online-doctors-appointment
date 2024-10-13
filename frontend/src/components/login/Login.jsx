// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../login/Login.css';


// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
  
//   const [userType, setUserType] = useState('patient'); // Default to patient
//   const navigate = useNavigate();

//   const handleInputChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Login submitted', formData);

//     // Example: Logging in without backend logic
//     // Simulate successful login and redirect based on user type
//     if (userType === 'patient') {
//       navigate('/patient-dashboard');
//     } else {
//       navigate('/doctor-dashboard');
//     }
//     alert('Login successful!');
//   };

//   return (
//     <div className="whole">
//       <div className="auth-container">
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <h2 className="auth-heading">Login</h2>

//           <div className="form-group">
//             <label>User Type</label>
//             <select value={userType} onChange={(e) => setUserType(e.target.value)}>
//               <option value="patient">Patient</option>
//               <option value="doctor">Doctor</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input 
//               type="email" 
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input 
//               type="password" 
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <button type="submit" className="btn auth-btn">Login</button>
//           <p>
//             Don't have an account? <Link to="/Signup" className="auth-link">Register</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../login/Login.css';
// import { loginUser } from '../../api';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
  
//   const [role, setRole] = useState('patient');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleInputChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await loginUser({ ...formData, role });
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('userId', response.data.userId);
//       localStorage.setItem('role', response.data.role);

//       if (role === 'patient') {
//         navigate('/patient-dashboard');
//       } else {
//         navigate('/doctor-dashboard');
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || 'An error occurred during login');
//     }
//   };

//   return (
//     <div className="whole">
//       <div className="auth-container">
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <h2 className="auth-heading">Login</h2>
//           {error && <p className="error-message">{error}</p>}

//           <div className="form-group">
//             <label>User Type</label>
//             <select value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="patient">Patient</option>
//               <option value="doctor">Doctor</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input 
//               type="email" 
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input 
//               type="password" 
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <button type="submit" className="btn auth-btn">Login</button>
//           <p>
//             Don't have an account? <Link to="/Signup" className="auth-link">Register</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/Login.css';
import { loginUser } from '../../api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser({ ...formData, role });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('role', response.data.role);

      console.log('Login successful, token set:', response.data.token);
      console.log('User ID set:', response.data.userId);
      console.log('Role set:', response.data.role);
      console.log('localStorage after login:', JSON.stringify(localStorage));

      if (role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/doctor-dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="whole">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-heading">Login</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>User Type</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn auth-btn">Login</button>
          <p>
            Don't have an account? <Link to="/Signup" className="auth-link">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;