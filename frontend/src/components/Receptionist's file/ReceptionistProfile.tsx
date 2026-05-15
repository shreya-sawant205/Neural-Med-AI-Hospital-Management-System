import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReceptionistProfile.css";

const ReceptionistProfile: React.FC = () => {
  const navigate = useNavigate();

  const [contact, setContact] = useState("");

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers & max 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (contact.length !== 10) {
      alert("Contact number must be exactly 10 digits");
      return;
    }

    alert("Profile Updated Successfully ✅");
  };

  return (
    <div className="receptionist-profile-page">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>

      <h2>My Profile</h2>

      <form onSubmit={handleSubmit} className="profile-form">

        <label>Receptionist ID</label>
        <input type="text" value="REC-1001" readOnly />

        <label>Username</label>
        <input type="text" defaultValue="reception1" />

        <label>First Name</label>
        <input type="text" />

        <label>Last Name</label>
        <input type="text" />

        <label>Email ID</label>
        <input type="email" />

        <label>Contact Number</label>
        <input
          type="text"
          value={contact}
          onChange={handleContactChange}
          placeholder="Enter 10 digit number"
        />

        <label>Address</label>
        <textarea rows={3}></textarea>

        <label>Current Password</label>
        <input type="password" />

        <label>New Password</label>
        <input type="password" />

        <label>Confirm New Password</label>
        <input type="password" />

        <button type="submit" className="save-btn">
          Save Changes
        </button>

      </form>
    </div>
  );
};

export default ReceptionistProfile;