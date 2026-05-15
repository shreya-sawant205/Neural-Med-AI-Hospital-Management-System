import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorProfile.css";

const DoctorProfile: React.FC = () => {
const navigate = useNavigate();
const [contactNo, setContactNo] = useState("");
const [dob, setDob] = useState("");
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [address, setAddress] = useState("");
const [gender, setGender] = useState("");

useEffect(() => {
  const storedContact = localStorage.getItem("contactNo");
  const storedDob = localStorage.getItem("dob");
  const storedFirstName = localStorage.getItem("firstName");
  const storedLastName = localStorage.getItem("lastName");
  const storedAddress = localStorage.getItem("address");
  const storedGender = localStorage.getItem("gender");


  if (storedContact) setContactNo(storedContact);
  if (storedFirstName) setFirstName(storedFirstName);
  if (storedLastName) setLastName(storedLastName);
  if (storedAddress) setAddress(storedAddress);
  if (storedDob) setDob(storedDob);
  if (storedGender) setGender(storedGender);
}, []);

const handleSave = () => {
    // Contact validation
if (contactNo.length !== 10) {
  alert("Contact number must be exactly 10 digits");
  return;
}

  const storedPassword = localStorage.getItem("password");

  // 🔐 Check current password
  if (newPassword || confirmPassword) {
    if (currentPassword !== storedPassword) {
      alert("Current password is incorrect!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    localStorage.setItem("password", newPassword);
  }

  // Save other details
  localStorage.setItem("contactNo", contactNo);
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("address", address);
  localStorage.setItem("dob", dob);
  localStorage.setItem("gender", gender);

  alert("Profile Updated Successfully!");

  // Clear password fields
  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
};


  return (
    <div className="doctor-profile">
      <div className="profile-header">
        <h2>Update Profile</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="profile-card">
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
<label>Date of Birth</label>
<input
 type="date"
 placeholder="Date of Birth"
 value={dob}
 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
 setDob(e.target.value)
}
/>
<label>Gender</label>
<select
  className="form-input"
  value={gender}
  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
    setGender(e.target.value)
  }
>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>

  <label>Contact Number</label>
<input
  type="text"
  value={contactNo}
  onChange={(e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setContactNo(value);
    }
  }}
  maxLength={10}
  placeholder="Enter 10-digit number"
/>
  <hr style={{ margin: "20px 0" }} />

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

export default DoctorProfile;
