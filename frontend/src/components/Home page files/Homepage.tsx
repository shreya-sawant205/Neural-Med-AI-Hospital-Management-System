import React from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="navbar">
        <h1>NeuralMed</h1>
        <nav>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/help")}>Help</button>
          <button onClick={() => navigate("/about")}>About Us</button>
          <button
            className="nav-login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </nav>
      </header>

      <section className="hero">
        <h2>AI Powered Hospital Management System</h2>
        <p>Smarter Healthcare • Better Decisions • Faster Service</p>
        <button onClick={() => navigate("/login")}>
          Start The Process
        </button>
      </section>
    
    <section className="info-cards">

  <Link to="/help" className="about-card-link">
    <div className="about-card">
      <h3>Help</h3>
      <p>
        Learn how to use NeuralMed and get assistance with the hospital
        management system.
      </p>
    </div>
  </Link>

  <Link to="/about" className="about-card-link">
    <div className="about-card">
      <h3>About Us</h3>
      <p>
        NeuralMed is an AI-enabled hospital management system built to improve
        healthcare workflows and patient experience.
      </p>
    </div>
  </Link>

</section>
    </>
  );
};

export default HomePage;










































