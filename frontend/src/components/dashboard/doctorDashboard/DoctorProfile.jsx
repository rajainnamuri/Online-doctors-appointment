
// import React from 'react';
// import './DoctorProfile.css'; // Ensure this is linked

// const DoctorProfile = () => {
//   // Replace with actual profile fetching logic
//   const profile = {
//     name: 'Dr. John Doe',
//     specialization: 'Cardiology',
//     experience: '10 years',
//     bio: 'Dr. John Doe is a renowned cardiologist...',
//     personalLife: {
//       dateOfBirth: '1980-01-01',
//       education: 'MBBS, MD Cardiology',
//       hobbies: 'Reading, Traveling, and Cooking',
//       description: 'Dr. John Doe has a deep passion for helping others, not just in his professional life as a cardiologist but also in his personal life. He enjoys reading various literature that expands his horizons and takes pleasure in traveling to explore new cultures and cuisines. Cooking is another passion of his, where he loves experimenting with new recipes and sharing delightful meals with friends and family. He believes in maintaining a balanced life, which reflects in his commitment to his health and well-being.'
//     }
//   };

//   return (
//     <div className="profile-card-container">
//       <div className="profile-card">
//         <div className="profile-image">
//           <img src="path_to_doctor_image.jpg" alt="Doctor" /> {/* Replace with actual image path */}
//         </div>
//         <div className="profile-info">
//           <h2>Profile</h2>
//           <p><strong>Name:</strong> {profile.name}</p>
//           <p><strong>Specialization:</strong> {profile.specialization}</p>
//           <p><strong>Experience:</strong> {profile.experience}</p>
//           <p><strong>Bio:</strong> {profile.bio}</p>
//         </div>
//       </div>
//       <div className="personal-info">
//         <h3>Personal Life</h3>
//         <p><strong>Date of Birth:</strong> {profile.personalLife.dateOfBirth}</p>
//         <p><strong>Education:</strong> {profile.personalLife.education}</p>
//         <p><strong>Hobbies:</strong> {profile.personalLife.hobbies}</p>
//         <p>{profile.personalLife.description}</p> {/* Description here */}
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;





import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const { user } = useOutletContext();

  if (!user) {
    return <div>Loading...NOT FOUND</div>;
  }

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <div className="profile-info">
          <h2>Profile</h2>
          <p><strong>Name:</strong> Dr. {user.data.name}</p>
          <p><strong>Email:</strong> {user.data.email}</p>
          <p><strong>Specialization:</strong> {user.data.specialization}</p>
          <p><strong>Hospital name:</strong> {user.data.hospitalName} </p>
          <p><strong>Contact Number:</strong> {user.data.contactNumber}</p>
          {/* <p><strong>Bio:</strong> {doctor.bio}</p> */}
        </div>
      </div>
      {/* {doctor.personalLife && (
        <div className="personal-info">
          <h3>Personal Life</h3>
          <p><strong>Date of Birth:</strong> {doctor.personalLife.dateOfBirth || 'N/A'}</p>
          <p><strong>Education:</strong> {doctor.personalLife.education || 'N/A'}</p>
          <p><strong>Hobbies:</strong> {doctor.personalLife.hobbies || 'N/A'}</p>
          <p>{doctor.personalLife.description || 'No personal description available.'}</p>
        </div>
      )} */}
    </div>
  );
};

export default DoctorProfile;
