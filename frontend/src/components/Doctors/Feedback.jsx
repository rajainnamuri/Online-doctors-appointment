// import React, { useState } from 'react';
// import AV from '../../assets/images/AV.png';
// import { formateDate } from '../../utils/formateDate';
// import { AiFillStar } from 'react-icons/ai'; // Import AiFillStar from React Icons
// import './Feedback.css'; // Import the CSS file
// import FeedbackForm from './FeedbackForm';
// import SidePanel from './SidePanel';

// const Feedback = () => {
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);

//   return (
//     <div className='feedback-container'>
//       <h4 className='feedback-heading'>
//         All Reviews (264)
//       </h4>

//       <div className='feedback-item'>
//         <div className='feedback-avatar'>
//           <figure>
//             <img src={AV} alt="Reviewer" className='feedback-avatar-img' />
//           </figure>
          
//           <div className='feedback-info'>
//             <h5 className='feedback-name'>
//               Alizeh Ahmed
//             </h5>
//             <p className='feedback-date'>
//               {formateDate("02-14-2023")}
//             </p>
//             <p className='feedback-comment'>
//               Good services, Highly recommended
//             </p>
//           </div>
//         </div>

//         <div className='feedback-stars'>
//           {
//             [...Array(5).keys()].map(index => (
//               <AiFillStar key={index} className='feedback-star' />
//             ))
//           }
//         </div>
//       </div>

//       {!showFeedbackForm && (
//         <div className='feedback-form-toggle'>
//           <button className='btn' onClick={() => setShowFeedbackForm(true)}>
//             Give Feedback
//           </button>
//         </div>
//       )}

//       {showFeedbackForm && <FeedbackForm />}
//       <div><SidePanel/></div>
      
//     </div>
//   );
// };

// export default Feedback;



// import React, { useState } from 'react';
// import AV from '../../assets/images/AV.png';
// import { formateDate } from '../../utils/formateDate';
// import { AiFillStar } from 'react-icons/ai';
// import './Feedback.css';
// import FeedbackForm from './FeedbackForm';
// import SidePanel from './SidePanel';

// const Feedback = () => {
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);

//   return (
//     <div className='feedback-container'>
//       <div className='feedback-content'>
//         <h4 className='feedback-heading'>All Reviews (264)</h4>

//         <div className='feedback-item'>
//           <div className='feedback-avatar'>
//             <figure>
//               <img src={AV} alt="Reviewer" className='feedback-avatar-img' />
//             </figure>
            
//             <div className='feedback-info'>
//               <h5 className='feedback-name'>Alizeh Ahmed</h5>
//               <p className='feedback-date'>{formateDate("02-14-2023")}</p>
//               <p className='feedback-comment'>Good services, Highly recommended</p>
//             </div>
//           </div>

          
//         </div>

//         {!showFeedbackForm && (
//           <div className='feedback-form-toggle'>
//             <button className='btn' onClick={() => setShowFeedbackForm(true)}>
//               Give Feedback
//             </button>
//           </div>
//         )}

//         {showFeedbackForm && <FeedbackForm />}
//       </div>
      
//       <div className='side-panel-container'>
//         <SidePanel />
//       </div>
//     </div>
//   );
// };

// export default Feedback;



// import React, { useState } from 'react';
// import AV from '../../assets/images/AV.png';
// import { formateDate } from '../../utils/formateDate';
// import { AiFillStar } from 'react-icons/ai';
// import './Feedback.css';
// import FeedbackForm from './FeedbackForm';
// import SidePanel from './SidePanel';

// const Feedback = () => {
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);

//   return (
//     <div className='feedback-container'>
//       <div className='feedback-content'>
//         <h4 className='feedback-heading'>All Reviews (264)</h4>

//         <div className='feedback-item'>
//           <div className='feedback-avatar'>
//             <figure>
//               <img src={AV} alt="Reviewer" className='feedback-avatar-img' />
//             </figure>
            
//             <div className='feedback-info'>
//               <h5 className='feedback-name'>Alizeh Ahmed</h5>
//               <p className='feedback-date'>{formateDate("02-14-2023")}</p>
//               <p className='feedback-comment'>Good services, Highly recommended</p>
//             </div>
//           </div>

          
//         </div>

//         {!showFeedbackForm && (
//           <div className='feedback-form-toggle'>
//             <button className='btn' onClick={() => setShowFeedbackForm(true)}>
//               Give Feedback
//             </button>
//           </div>
//         )}

//         {showFeedbackForm && <FeedbackForm />}
//       </div>
      
//       <div className='side-panel-container'>
//         <SidePanel />
//       </div>
//     </div>
//   );
// };

// export default Feedback;



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AV from '../../assets/images/AV.png';
import { formateDate } from '../../utils/formateDate';
import { AiFillStar } from 'react-icons/ai';
import './Feedback.css';
import FeedbackForm from './FeedbackForm';
import SidePanel from './SidePanel';

const Feedback = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('doctorName');
    if (name) {
      setDoctorName(decodeURIComponent(name));
    }
  }, [location]);

  // Get current date
  const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  return (
    <div className='feedback-container'>
      <div className='feedback-content'>
        <h4 className='feedback-heading'>All Reviews (264)</h4>
        {doctorName && <h3>Book Appointment with Dr. {doctorName}</h3>}

        <div className='feedback-item'>
          <div className='feedback-avatar'>
            <figure>
              <img src={AV} alt="Reviewer" className='feedback-avatar-img' />
            </figure>
            
            <div className='feedback-info'>
              <h5 className='feedback-name'>Dr. {doctorName}</h5>
              <p className='feedback-date'>{formateDate(currentDate)}</p>
              <p className='feedback-comment'>Appointment booking available</p>
            </div>
          </div>
        </div>

        {!showFeedbackForm && (
          <div className='feedback-form-toggle'>
            <button className='btn' onClick={() => setShowFeedbackForm(true)}>
              GIVE FEEDBACK
            </button>
          </div>
        )}

        {showFeedbackForm && <FeedbackForm doctorName={doctorName} />}
      </div>
      
      <div className='side-panel-container'>
        <SidePanel doctorName={doctorName} />
      </div>
    </div>
  );
};

export default Feedback;