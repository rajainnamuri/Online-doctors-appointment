// import React, { useState } from 'react';
// import { Outlet, Link, useLocation } from 'react-router-dom';
// import Logout from './PatientLogout';
// import './PatientDashboard.css';

// const PatientDashboard = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="patient-dashboard">
//       <header className="dashboard-header">
//         <div className="hamburger" onClick={toggleMenu}>
//           <div className="line"></div>
//           <div className="line"></div>
//           <div className="line"></div>
//         </div>
//         <h1>Patient Dashboard</h1>
//         <Logout />
//       </header>
//       <div className="dashboard-content">
//         <aside className={`dashboard-sidebar ${isMenuOpen ? 'open' : ''}`}>
//           <nav>
//             <ul>
//               <li>
//                 <Link 
//                   to="/patient-dashboard/profile" 
//                   className={location.pathname.includes('/profile') ? 'active' : ''}
//                 >
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link 
//                   to="/patient-dashboard/appointments" 
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

// export default PatientDashboard;















import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Logout from './PatientLogout';
import { getUserDetails } from '../../../api';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log('Fetching user details for ID:', userId);
        const response = await getUserDetails(userId);
        console.log('User details response:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details. Please try again later.');
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    // checkUser(userId)
    //   .then(response => console.log('User check result:', response.data))
    //   .catch(error => console.error('Error checking user:', error));
  }, []);

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
    <div className="patient-dashboard">
      <header className="dashboard-header">
        <div className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <h1 className='hh1'>Patient Dashboard</h1>
        <Logout user={user} />
      </header>
      <div className="dashboard-content">
        <aside className={`dashboard-sidebar ${isMenuOpen ? 'open' : ''}`}>
          <nav>
            <ul>
              <li>
                <Link 
                  to="/patient-dashboard/profile" 
                  className={location.pathname.includes('/profile') ? 'active' : ''}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/patient-dashboard/appointments" 
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

export default PatientDashboard;
