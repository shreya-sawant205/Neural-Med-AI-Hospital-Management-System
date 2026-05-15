import React from "react";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";
import teamIntro from "../../assets/team_intro.mp4";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
    <div className="about-top-bar">
      <h2>About NeuralMed</h2>

     <button
       className="back-btn"
       onClick={() => navigate(-1)}
      >
        Back
       </button>
       </div>

       <div className="about-content">

        <p>
          NeuralMed is an AI-powered Hospital Management System developed as a
          collaborative team project.
        </p>

        <p>
          Our goal is to simplify hospital workflows by integrating smart
          technology into operations like patient management, appointments,
          prescriptions and billing.
        </p>

        <p>
          Below is the introduction of our project and team.
        </p>
      </div>

      <div className="ppt-container">
        <video controls width="80%">
          <source src={teamIntro} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

    </div>
  );
};

export default AboutUs;