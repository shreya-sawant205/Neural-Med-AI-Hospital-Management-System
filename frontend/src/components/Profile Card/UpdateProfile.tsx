import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";
import axios from "axios";

const UpdateProfile: React.FC = () => {
    const navigate = useNavigate();
    const [contactNo, setContactNo] = useState("");
    const [dob, setDob] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const formatDateForInput = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };

    useEffect(() => {
      if(!firstName){
         getProfile()
      }
    });

    const getProfile = () => {

        axios.get(`http://localhost:5000/api/auth/getuserdetails/${user["user_id"]}`).then(response=>{
           setFirstName(response.data["first_name"]);
           setLastName(response.data["last_name"]);
           setContactNo(response.data["contact"]);
           setAddress(response.data["address"])
           setGender(response.data["gender"])
           setDob(formatDateForInput(response.data["dob"]))
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    const handleSave = () => {
        // Contact validation
      if (contactNo.length !== 10) {
        alert("Contact number must be exactly 10 digits");
        return;
      }



      // 🔐 Check current password
      if (newPassword || confirmPassword) {

        if (newPassword !== confirmPassword) {
          alert("New password and confirm password do not match!");
          return;
        }
      }
      
      axios.post("http://localhost:5000/api/registration/updateprofile",{
        userId : user["user_id"],
        firstName,
        lastName,
        contactNo,
        address,
        gender,
        dob,
        newPassword
      }).then(response=>{
         if(response.data["response"]){
             // ✅ 1️⃣ Update localStorage manually
     const updatedUser = {
       ...user,
       first_name: firstName,
       last_name: lastName,
       contact: contactNo,
       address: address,
       gender: gender,
       dob: dob
     };

     localStorage.setItem("user", JSON.stringify(updatedUser));

     alert(response.data["message"])

     setNewPassword("")
     setConfirmPassword("")

     // ✅ 2️⃣ Go back to dashboard
     navigate(-1);
         }
         else{
            alert("Something went wrong!!")
         }
      }).catch(()=>{
        alert("Something went wrong!!")
      })
    };


      return (
        <div className="doctor-profile">
          <div className="page-header">
            <h2>Update Profile</h2>
            <button onClick={() => navigate(-1)}>Back</button>
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

export default UpdateProfile;
