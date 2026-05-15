import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";

const MyProfile: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedContact = localStorage.getItem("contact");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedEmail = localStorage.getItem("email");
    const storedAddress = localStorage.getItem("address");
     let storedPatientId = localStorage.getItem("patientId");

  if (!storedPatientId) {
    storedPatientId = "PAT-" + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("patientId", storedPatientId);
  }

    if (storedUsername) setUsername(storedUsername);
    if (storedContact) setContact(storedContact);
    if (storedPatientId) setPatientId(storedPatientId);
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedEmail) setEmail(storedEmail);
    if (storedAddress) setAddress(storedAddress);
  }, []);

  const handleSave = () => {
    const storedPassword = localStorage.getItem("password");

    // 🔹 Contact validation
    if (contact.length !== 10) {
      alert("Contact number must be exactly 10 digits");
      return;
    }

    // 🔹 Password change validation
    if (newPassword || confirmPassword || currentPassword) {
      if (currentPassword !== storedPassword) {
        alert("Current password is incorrect");
        return;
      }

      if (newPassword.length < 4) {
        alert("New password must be at least 4 characters");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("New password and Confirm password do not match");
        return;
      }

    localStorage.setItem("password", newPassword);
    }
     localStorage.setItem("firstName", firstName);
     localStorage.setItem("lastName", lastName);
     localStorage.setItem("email", email);
     localStorage.setItem("address", address);
     localStorage.setItem("username", username);
     localStorage.setItem("contact", contact);

    alert("Profile Updated Successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="my-profile">
      <div className="page-header">
        <h2>My Profile</h2>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="profile-card">
        {/* Username */}
        <label>Patient ID</label>
      <input
         type="text"
        value={patientId}
        readOnly
     />

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
    <label>First Name</label>
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
     />
     <label>Last Name</label>
    <input
     type="text"
     value={lastName}
     onChange={(e) => setLastName(e.target.value)}
    />

    <label>Email ID</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
        {/* Contact */}
        <label>Contact Number</label>
        <input
          type="text"
          value={contact}
          maxLength={10}
          placeholder="Enter 10-digit number"
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setContact(value);
            }
          }}
        />
        <label>Address</label>
         <textarea
           value={address}
           onChange={(e) => setAddress(e.target.value)}
        />
        {/* Current Password */}
        <label>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        {/* New Password */}
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default MyProfile;















































