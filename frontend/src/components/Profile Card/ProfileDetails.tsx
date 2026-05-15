import React, { useEffect, useState } from "react";
import "./ProfileDetails.css";
import axios from "axios";

interface Props {
  userImg: string;
}

interface Profile {
  user_id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  contact:string;
  address:string;
  gender:string;
  dob:Date
}

const ProfileDetails: React.FC<Props> = ({userImg}) => {

  const [profile, setProfile] = useState<Profile>()

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(()=>{

     if(!profile){
      axios.get(`http://localhost:5000/api/auth/getuserdetails/${user["user_id"]}`).then((response)=>{
          setProfile(response.data);
      })
      .catch((e)=>{
          console.log(e);
      })
     }

  })

 

  return (


  <div className="profile-section">

    <div className="patient-profile-card">

      <img src={userImg} alt="User" className="profile-img" />

      <div className="profile-info">
        <h3>{profile?.first_name} {profile?.last_name}</h3>
        <p><strong>User_id:</strong> {profile?.user_id}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Contact:</strong> {profile?.contact}</p>
        <p><strong>Address:</strong> {profile?.address}</p>
        <p><strong>Gender:</strong> {profile?.gender}</p>
        {/* <p><strong>DOB:</strong> {profile?.dob}</p> */}
      </div>

    </div>
    </div>
  
  );
};

export default ProfileDetails;
