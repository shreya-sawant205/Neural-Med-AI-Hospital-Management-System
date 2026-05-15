import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientRecords.css";
import axios from "axios";

interface MedicalRecord {
  recordId:number;
  patientId:string;
  patientName: string;
  title: string;
  description: string;
  comment: string;
  fileName: string;
  fileURL: string;
  uploadedAt:string;
}

const PatientRecords: React.FC = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
   if(!records.length){
      const doctor = JSON.parse(localStorage.getItem("user") || "");

      const doctorId = doctor["user_id"];

      axios.get(`http://localhost:5000/api/medicalrecords/getmedicalrecordsbydoctorid/${doctorId}`)
      .then(response => {
            setRecords(response.data)
      })
      .catch(error => {
          console.error(error);
          alert("Something went wrong, please try after sometime!!")
      });
    }
  });

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  const formatDate = (dateString:string) => {
     const date = new Date(dateString);
     return date.toDateString();
  }

  return (
    <div className="doctor-medical-page">

      {/* HEADER */}
      <div className="doctor-medical-header">
        <h2>Patient Medical Records</h2>

        <button onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      {/* RECORD LIST */}
      {records.length === 0 ? (
        <p className="no-record">No medical records available</p>
      ) : (
        <div className="record-list">
          {records.map((rec, index) => (
            <div className="record-card" key={index}>
              
              <p><strong>Patient Name:</strong> {rec.patientName}</p>
              <p><strong>Title:</strong> {rec.title}</p>
              <p><strong>Description:</strong> {rec.description}</p>
              <p><strong>Comment:</strong> {rec.comment}</p>
              <p><strong>Uploaded Date:</strong> {formatDate(rec.uploadedAt)}</p>

              <p><strong>File Name:</strong> {rec.fileName}</p>

              <button
                className="download-btn"
                onClick={() => handleDownload(rec.fileURL, rec.fileName)}
              >
                Download File
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default PatientRecords;



































































