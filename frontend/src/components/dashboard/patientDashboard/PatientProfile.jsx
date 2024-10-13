// import React from 'react';
// import './PatientProfile.css'; // Create the corresponding CSS file

// const PatientProfile = () => {
//   const profile = {
//     name: 'John Doe',
//     age: '30',
//     medicalHistory: 'No known allergies, previous surgery in 2020...',
//     bio: 'John is an avid traveler and fitness enthusiast...',
//   };

//   return (
//     <div className="profile-card-container">
//       <div className="profile-card">
//         <div className="profile-info">
//           <h2>Profile</h2>
//           <p><strong>Name:</strong> {profile.name}</p>
//           <p><strong>Age:</strong> {profile.age}</p>
//           <p><strong>Medical History:</strong> {profile.medicalHistory}</p>
//           <p><strong>Bio:</strong> {profile.bio}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientProfile;





import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './PatientProfile.css';

const PatientProfile = () => {
  const { user } = useOutletContext();

  if (!user) {
    return <div>Loading...NOT FOUND</div>;
  }

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        {/* <div className="profile-image">
          {user.imagePath ? (
            <img src={`http://localhost:5000/${user.imagePath}`} alt="Profile Image" />
          ) : (
            <div className="default-avatar">{user.name.charAt(0)}</div>
          )}
        </div> */}
        <div className="profile-info">
          <h2>Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Contact Number:</strong> {user.contactNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
