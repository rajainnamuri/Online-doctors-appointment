// import React, { useState } from 'react';
// import { Outlet, Link, useLocation } from 'react-router-dom';
// import Logout from './Logout';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="doctor-dashboard">
//       <header className="dashboard-header">
//         <div className="hamburger" onClick={toggleMenu}>
//           <div className="line"></div>
//           <div className="line"></div>
//           <div className="line"></div>
//         </div>
//         <h1>Doctor Dashboard</h1>
//         <Logout />
//       </header>
//       <div className="dashboard-content">
//         <aside className={`dashboard-sidebar ${isMenuOpen ? 'open' : ''}`}>
//           <nav>
//             <ul>
//               <li>
//                 <Link 
//                   to="/doctor-dashboard/profile" 
//                   className={location.pathname.includes('/profile') ? 'active' : ''}
//                 >
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/doctor-dashboard/appointments" 
//                   className={location.pathname.includes('/appointments') ? 'active' : ''}
//                 >
//                   Appointments
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </aside>
//         <main className="dashboard-main">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;



import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import Logout from './Logout';
import { getUserDetails } from '../../../api';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        console.log('Dashboard mounted. UserId:', userId, 'Token:', token, 'Role:', role);
        
        if (!userId || !token || !role) {
          throw new Error('Missing user information in localStorage');
        }

        const response = await getUserDetails(userId);
        console.log('User details response:', response);
        setUser(response);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError(`Failed to fetch user details: ${error.message}`);
        // Redirect to login if there's an authentication error
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
        <div className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <h1 className='hh1'>Doctor Dashboard</h1>
        <Logout user={user} />
      </header>
      <div className="dashboard-content">
        <aside className={`dashboard-sidebar ${isMenuOpen ? 'open' : ''}`}>
          <nav>
            <ul>
              <li>
                <Link 
                  to="/doctor-dashboard/profile" 
                  className={location.pathname.includes('/profile') ? 'active' : ''}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/doctor-dashboard/appointments" 
                  className={location.pathname.includes('/appointments') ? 'active' : ''}
                >
                  Appointments
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="dashboard-main">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
