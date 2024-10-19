// import React from 'react';
// import './Doctors.css';
// import DoctorCard from "./../../components/theDoctors/DoctorCard";
// import { doctors } from '../../assets/data/doctors';

// const Doctors = () => {
//   return (
//     <>
//       <div className="doctor-section">
//         <div className="container">
//           <h2 className="heading">Find a Doctor</h2>
//           <div className="search-container">
//             <input id="search-box" type="search" className="search-input" placeholder="Search for doctors..." />
//             <button className="search-button">Search</button>
//           </div>
//         </div>
//       </div>

// <section>
//   <div className="container">
//   <div className='doctor-list'>
//       {doctors.map(doctor => (
//         <DoctorCard key={doctor.id} doctor={doctor} />
//       ))}
//     </div>
//   </div>
// </section>
//     </>
//   );
// };

// export default Doctors;



// import React, { useState } from 'react';
// import './Doctors.css';
// import DoctorCard from "./../../components/theDoctors/DoctorCard";
// import { searchDoctors } from '../../api';
// import { doctors as defaultDoctors } from '../../assets/data/doctors';

// const Doctors = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = () => {
//     if (!searchTerm.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     searchDoctors(searchTerm)
//       .then(results => {
//         console.log('Search results:', results);
//         setSearchResults(results);
//       })
//       .catch(err => {
//         console.error('Error in handleSearch:', err);
//         setError('Failed to fetch doctor details. Please try again.');
//         setSearchResults([]);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const displayDoctors = searchResults || defaultDoctors;

//   return (
//     <>
//       <div className="doctor-section">
//         <div className="container">
//           <h2 className="heading">Find a Doctor</h2>
//           <div className="search-container">
//             <input 
//               id="search-box" 
//               type="search" 
//               className="search-input" 
//               placeholder="Search for a doctor by name..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="search-button" onClick={handleSearch}>Search</button>
//           </div>
//         </div>
//       </div>

//       <section>
//         <div className="container">
//           {isLoading && <p>Loading...</p>}
//           {error && <p className="error-message">{error}</p>}
//           <div className='doctor-list'>
//             {displayDoctors.map(doctor => (
//               <DoctorCard key={doctor.id || doctor._id} doctor={doctor} />
//             ))}
//           </div>
//           {searchResults && searchResults.length === 0 && !isLoading && !error && (
//             <p>No doctors found. Try a different name.</p>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Doctors;



//WAD LAB


import React, { useState } from 'react';
import './Doctors.css';
import DoctorCard from "./../../components/theDoctors/DoctorCard";
import { searchDoctors } from '../../api';
import { doctors as defaultDoctors } from '../../assets/data/doctors';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    searchDoctors(searchTerm)
      .then(results => {
        console.log('Search results:', results);
        setSearchResults(results);
      })
      .catch(err => {
        console.error('Error in handleSearch:', err);
        setError('Failed to fetch doctor details. Please try again.');
        setSearchResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const displayDoctors = searchResults || defaultDoctors;

  return (
    <>
      <div className="doctor-section">
        <div className="container">
          <h2 className="heading">Find a Doctor by Specialization</h2>
          <div className="search-container">
            <input 
              id="search-box" 
              type="search" 
              className="search-input" 
              placeholder="Search for a doctor by Specialization..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      <section>
        <div className="container">
          {isLoading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          <div className='doctor-list'>
            {displayDoctors.map(doctor => (
              <DoctorCard key={doctor.id || doctor._id} doctor={doctor} />
            ))}
          </div>
          {searchResults && searchResults.length === 0 && !isLoading && !error && (
            <p>No doctors found. Try a different name.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
