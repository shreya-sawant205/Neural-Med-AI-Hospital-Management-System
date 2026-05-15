import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MedicalRecords.css";
import axios from "axios";

const MedicalRecords: React.FC = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [records, setRecords] = useState<any[]>([]);

  useEffect(()=>{
    if(!records.length){
      getMedicalRecordsByPatientId();
    }
  });

  const getMedicalRecordsByPatientId = ()=>{
      const patient = JSON.parse(localStorage.getItem("user") || "");

      const patientId = patient["user_id"];

      axios.get(`http://localhost:5000/api/medicalrecords/getmedicalrecordsbypatientid/${patientId}`)
      .then(response => {
            setRecords(response.data)
      })
      .catch(error => {
          console.error(error);
          alert("Something went wrong, please try after sometime!!")
      });
  }

  const formatDate = (dateString:string) => {
     const date = new Date(dateString);
     return date.toDateString();
  }

  const handleFileChange = (e: React.     ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !file) {
      alert("Please fill all fields");
      return;
    }

    const patient = JSON.parse(localStorage.getItem("user") || "");

    const patientId = patient["user_id"];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", patientId);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("comment", comment);

    axios.post("http://localhost:5000/api/medicalrecords/savemedicalrecord",formData)
    .then(response => {
        if(response.data["response"]){
          getMedicalRecordsByPatientId();
          alert("Medical Record Uploaded Successfully!");
          setFile(null);
          setComment("");
          setTitle("");
          setDescription("");
        }
        else{
          alert("Something went wrong, please try after sometime!!")
        }
      })
      .catch(error => {
        console.error(error);
        alert("Something went wrong, please try after sometime!!")
      });
  };

  return (
  <div className="medical-page">

    {/* HEADER */}
    <div className="medical-header">
      <h2>MEDICAL RECORDS</h2>

      <button
        className="medical-back-btn"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>

    {/* CONTENT */}
    <div className="medical-content">
      <form className="medical-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />

        <textarea
          placeholder="Add Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />

        <label className="file-label">
          Upload Medical Record
        </label>

        <input
          type="file"
          accept=".pdf, .png, .jpg, .jpeg"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="save-btn">
          Upload Record
        </button>

      </form>
<div className="records-section">
  <div className="records-container"></div>

  <h3>Your Uploaded Records</h3>

  {records.length === 0 ? (
    <p className="no-records">No records uploaded yet</p>
  ) : (
    <div className="records-list">
      {records.map((rec, index) => (
        <div key={index} className="record-card">

          <p><strong>Title:</strong> {rec.title}</p>
          <p><strong>Description:</strong> {rec.description}</p>
          <p><strong>Comment:</strong> {rec.comment}</p>
          <p><strong>Date:</strong> {formatDate(rec.uploadedAt)}</p>

          <p><strong>File Name:</strong> {rec.fileName}</p>

          <a href={rec.fileURL} download={rec.fileName}>
            <button className="download-btn"> Download</button>
          </a>

        </div>
      ))}
    </div>
  )}
</div>
    </div>

  </div>
); 
};

export default MedicalRecords;
















