import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const navigate = useNavigate(); 
  const [role, setRole] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
    
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!role || !firstName || !lastName ||!email || !contact || !address || !gender || !dob || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    // 10 digit contact validation
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
      alert("Contact number must be exactly 10 digits");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios.post("http://localhost:5000/api/registration/register", {
      role,
      firstName,
      lastName,
      email,
      contact,
      address,
      gender,
      dob,
      password
    })
    .then(response => {
        alert("Registered successfully! Please login.");
        navigate("/login");
        return;
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={role}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setRole(e.target.value)
            }
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
            <option value="receptionist">Receptionist</option>
          </select>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* 🔹 Gender field */}
         <select
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

       {/* 🔹 DOB field */}
        <input
         type="date"
         placeholder="Date of Birth"
         value={dob}
         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
         setDob(e.target.value)
        }
        />


          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />

          
          <div className="button-group">
          <button type="submit">Register</button>
          <button  type="button" onClick={() => navigate("/")}>Home</button>
        </div>
        </form>
        <p className="login-link">
           Already have an account?{" "}
           <span onClick={() => navigate("/login")}>Login</span>
        </p>
       </div>
     </div>
  );
}
export default Register;   // 🔥 THIS LINE IS REQUIRED
