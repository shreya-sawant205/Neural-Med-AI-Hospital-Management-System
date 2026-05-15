import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login: React.FC = () => {
  const navigate = useNavigate();


  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!role || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    axios.post("http://localhost:5000/api/auth/login", {
      role,
      email,
      password
    })
    .then(response => {
      if(response.data["response"]){
        let user = response.data["user"];

        if(user["role"]?.toLowerCase() === role?.toLowerCase()){
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", role);
            localStorage.setItem("user", JSON.stringify(response.data["user"]));
            if (role === "patient"){
              navigate("/patient-dashboard");
            } 
            else if (role === "doctor") navigate("/doctor-dashboard");
            else if (role === "admin") navigate("/admin-dashboard");
            else if (role === "receptionist") navigate("/receptionist-dashboard");
        }
        else{
          alert("Please select valid role!!")
        }
        
      }
      else{
        alert("Invalid user!!")
      }
    })
    .catch(error => {
      console.error(error);
      alert("Something went wrong, please try after sometime!!")
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>


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
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  setEmail(e.target.value)
}


          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setPassword(e.target.value)}
          />

          
        <div className="button-group">
          <button type="submit">Login</button>
          <button  type="button" onClick={() => navigate("/")}>Home</button>
        </div>
        </form>
         

        <p>
          New user?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};


export default Login;   





















































































