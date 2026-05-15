import React from "react";
import { useNavigate } from "react-router-dom";
import "./Help.css";   
import help_guide from "../../assets/help_guide.mp4";
import blackbook from "../../assets/BlackBook 1.22.pdf";

const Help: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="help-container">

      <div className="help-header">
        <h1>HELP & SUPPORT</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          BACK
        </button>
      </div>

      <div className="help-content">

        <h2>How to Use the System</h2>
        <p>
          This Hospital Management System helps patients, doctors,
          administrators and receptionists manage hospital activities
          efficiently.
        </p>

        <h3>Patient Help</h3>
        <ul>
          <li>Register and login to your account.</li>
          <li>Book appointments with available doctors.</li>
          <li>View your prescriptions and medical records.</li>
          <li>Check appointment history.</li>
        </ul>

        <h3>Doctor Help</h3>
        <ul>
          <li>View scheduled appointments.</li>
          <li>Access patient records.</li>
          <li>Provide prescriptions to patients.</li>
        </ul>

        <h3>Receptionist Help</h3>
        <ul>
          <li>View patient prescriptions.</li>
          <li>Manage billing details.</li>
          <li>Assist patients with appointments.</li>
        </ul>

        <h3>Admin Help</h3>
        <ul>
          <li>Manage doctors and receptionists.</li>
          <li>Monitor hospital activities.</li>
          <li>Update system details.</li>
        </ul>

        <h3>Contact Support</h3>
        <p>
          If you face any issues while using the system, please contact
          the hospital administration or technical support team.
        </p>

        <p> Contact Us: 2665-3445-3445 </p>
        <p> Email:neuralmed@gmail.com </p>
         <p> You can also refer to the video guide below for a walkthrough of the system's features and functionalities.</p>  

         <h3>Project Documentation</h3>
       <p>
        You can view the complete Black Book for detailed project information:
       </p>

       <div className="blackbook-section">
       <a href={blackbook} target="_blank" rel="noopener noreferrer">
       <button className="view-btn">📄 View Black Book</button>
      </a>
     </div>

      </div>
     <div className="ppt-container">
    <video controls width="80%">
    <source src={help_guide} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
    </div>
  );
};

export default Help;