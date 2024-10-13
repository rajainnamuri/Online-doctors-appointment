import React from 'react';
import './DoctorAbout.css';  // Import the CSS file
import { formateDate } from '../../utils/formateDate';  // Import the corrected function

const DoctorAbout = () => {
  return (
    <div className="doctor-about-container">
      <div>
        <h3 className="heading">
          About of <span>Saturn Som</span>
        </h3>
        <p className="paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident id obcaecati nostrum. Doloremque natus provident blanditiis. Esse accusantium maxime ullam nemo deleniti asperiores eum nesciunt!
        </p>
      </div>

      <div className="education-section">
        <h3 className="education-heading">Education</h3>
        <ul className="education-list">
          <li className="education-item">
            <div>
              <span className="date">{formateDate('2014-09-13')} - {formateDate('2016-09-13')}</span>
              <p className="degree">PhD in Surgery</p>
              <p className="degree">Apollo Hospital, India</p>
            </div>
          </li>

          <li className="education-item">
            <div>
              <span className="date">{formateDate('2010-04-12')}</span>
              <p className="degree">PhD in Surgery</p>
              <p className="degree">Apollo Hospital, New York</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="experience-section">
        <h3 className="education-heading">Experience</h3>
        <ul className="experience-list">
          <li className="experience-item">
            <span className="role">Sr. Surgeon</span>
            <p className="degree">Apollo Hospital, New York</p>
          </li>
          <li className="experience-item">
            <span className="role">Sr. Surgeon</span>
            <p className="degree">Apollo Hospital, New York</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DoctorAbout;


