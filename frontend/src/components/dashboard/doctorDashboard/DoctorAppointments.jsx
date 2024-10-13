import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getDoctorAppointments } from '../../../api';
import './DoctorAppointments.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useOutletContext();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (user && user._id) {
          const response = await getDoctorAppointments(user._id);
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
        <p className="no-appointments">YOU HAVE NO SCHEDULED APPOINTMENTS</p>
      ) : (
        <div className="appointments-grid">
          {appointments.map(app => (
            <div key={app._id} className="appointment-card">
              <h3>{app.patientName}</h3>
              <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(app.date).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
