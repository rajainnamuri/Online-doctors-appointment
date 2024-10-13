// import React from 'react';
// import './PatientAppointments.css'; // Create the corresponding CSS file

// const PatientAppointments = () => {
//   const appointments = [
//     { id: 1, doctorName: 'Dr. John Doe', date: '2024-10-10', time: '10:00 AM' },
//     { id: 2, doctorName: 'Dr. Jane Smith', date: '2024-10-11', time: '11:00 AM' },
//     // Add more appointment data as needed
//   ];

//   return (
//     <div className="appointments">
//       <h2>Your Appointments</h2>
//       <div className="appointments-grid">
//         {appointments.map(app => (
//           <div key={app.id} className="appointment-card">
//             <h3>{app.doctorName}</h3>
//             <p><strong>Date:</strong> {app.date}</p>
//             <p><strong>Time:</strong> {app.time}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PatientAppointments;





import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getPatientAppointments } from '../../../api';
import './PatientAppointments.css';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useOutletContext();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (user && user._id) {
          const response = await getPatientAppointments(user._id);
          setAppointments(response.data);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div className="appointments">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="no-appointments">YOU DID NOT BOOK ANY APPOINTMENTS</p>
      ) : (
        <div className="appointments-grid">
          {appointments.map(app => (
            <div key={app._id} className="appointment-card">
              <h3>{app.doctorName}</h3>
              <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(app.date).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
