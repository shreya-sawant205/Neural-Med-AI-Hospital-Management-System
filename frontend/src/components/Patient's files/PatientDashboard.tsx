import React from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";
import ProfileDetails from "../Profile Card/ProfileDetails";

import userImg from "../../../src/assets/patient.jpg";

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = React.useState<any>({});

React.useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  setPatient(storedUser);
}, []);

  const handleLogout = (): void => {
    localStorage.clear();   // remove login info
    navigate("/login");     // redirect to login
  };

  return (
    <div className="patient-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Patient Dashboard</h2>
      <div className="header-right">
          <span className="name">{`${patient["first_name"]} ${patient["last_name"]}`}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <div
          className="card"
          onClick={() => navigate("/book-appointment")}
        >
          Book Appointment
        </div>

        <div
          className="card"
          onClick={() => navigate("/my-appointments")}
        >
          My Appointments
        </div>

       <div
  className="card"
  onClick={() => navigate("/prescriptions")}
>
  Prescriptions
</div>
       <div
  className="card"
  onClick={() => navigate("/medical-records")}
>
  Medical Records
</div>
        <div
  className="card"
  onClick={() => navigate("/update-profile")}
>
  Update Profile
</div>

      </div>
      <ProfileDetails userImg={userImg}></ProfileDetails>
    </div>
  );
};

export default PatientDashboard;





































