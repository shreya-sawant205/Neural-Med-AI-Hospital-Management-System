import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";   // SAME CSS

const AdminProfile: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [adminId, setAdminId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("adminUsername");
    const storedContact = localStorage.getItem("adminContact");
    const storedFirstName = localStorage.getItem("adminFirstName");
    const storedLastName = localStorage.getItem("adminLastName");
    const storedEmail = localStorage.getItem("adminEmail");
    const storedAddress = localStorage.getItem("adminAddress");

    let storedAdminId = localStorage.getItem("adminId");

    if (!storedAdminId) {
      storedAdminId = "ADM-" + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem("adminId", storedAdminId);
    }

    if (storedUsername) setUsername(storedUsername);
    if (storedContact) setContact(storedContact);
    if (storedAdminId) setAdminId(storedAdminId);
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedEmail) setEmail(storedEmail);
    if (storedAddress) setAddress(storedAddress);

  }, []);

  const handleSave = () => {
    const storedPassword = localStorage.getItem("adminPassword");

    if (contact.length !== 10) {
      alert("Contact number must be exactly 10 digits");
      return;
    }

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
        alert("New password & Confirm password do not match");
        return;
      }

      localStorage.setItem("adminPassword", newPassword);
    }

    localStorage.setItem("adminUsername", username);
    localStorage.setItem("adminContact", contact);
    localStorage.setItem("adminFirstName", firstName);
    localStorage.setItem("adminLastName", lastName);
    localStorage.setItem("adminEmail", email);
    localStorage.setItem("adminAddress", address);

    alert("Admin Profile Updated Successfully!");

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

        <label>Admin ID</label>
        <input type="text" value={adminId} readOnly />

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

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contact Number</label>
        <input
          type="text"
          value={contact}
          maxLength={10}
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

        <label>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

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

export default AdminProfile;
