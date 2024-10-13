// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './PatientLogout.css';

// const PatientLogout = () => {
//   const navigate = useNavigate();
  
//   const handleLogout = () => {
//     // Perform logout logic here
//     navigate('/login');
//   };

//   return (
//     <div className="logout">
//       <div className="logout-info">
//         <img src="/path/to/patient-profile-image.jpg" alt="Profile" className="profile-image" />
//         <div className="user-details">
//           <p className="username">John Doe</p> {/* Replace with patient's name */}
//           <p className="user-role">Patient</p>  {/* Replace with patient role */}
//         </div>
//       </div>
//       <button onClick={handleLogout} className="logout-button">
//         <i className="fas fa-sign-out-alt"></i> Logout
//       </button>
//     </div>
//   );
// };

// export default PatientLogout;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientLogout.css';

const PatientLogout = ({ user }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="logout">
      <div className="logout-info">
        {user && user.imagePath ? (
          <img src={`http://localhost:5000/${user.imagePath}`} alt="Profile" className="profile-image" />
        ) : (
          <div className="default-avatar">{user ? user.name.charAt(0) : ''}</div>
        )}
        <div className="user-details">
          <p className="username">{user ? user.name : 'Loading...'}</p>
          <p className="user-role">Patient</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-button">
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
  );
};

export default PatientLogout;
