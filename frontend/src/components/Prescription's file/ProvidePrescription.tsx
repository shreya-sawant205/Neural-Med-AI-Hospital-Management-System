import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProvidePrescription.css";

interface Appointment {
  appointmentId: string;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
}

interface Prescription {
  appointmentId: string;
  patientName: string;
  doctor: string;
  medicines: string;
  instructions: string;
}

const ProvidePrescription: React.FC = () => {
  const navigate = useNavigate();

  const [appointmentId, setAppointmentId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [medicines, setMedicines] = useState("");
  const [instructions, setInstructions] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const storedAppointments =
      JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(storedAppointments);
  }, []);

  const handleSearch = () => {
    const found = appointments.find(
      (appt) => appt.appointmentId === appointmentId
    );

    if (found) {
      setPatientName(found.patientName);
    } else {
      alert("Appointment not found!");
      setPatientName("");
    }
  };

  const handleSubmit = () => {
    if (!appointmentId || !medicines || !instructions) {
      alert("Please fill all fields");
      return;
    }

    const doctorName = localStorage.getItem("doctorName");

    const newPrescription: Prescription = {
      appointmentId,
      patientName,
      doctor: doctorName || "Unknown Doctor",
      medicines,
      instructions,
    };

    const existingPrescriptions =
      JSON.parse(localStorage.getItem("prescriptions") || "[]");

    existingPrescriptions.push(newPrescription);

    localStorage.setItem(
      "prescriptions",
      JSON.stringify(existingPrescriptions)
    );

    alert("Prescription Saved Successfully!");

    setAppointmentId("");
    setPatientName("");
    setMedicines("");
    setInstructions("");
  };

  return (
    <div className="provide-prescription">
      <div className="page-header">
        <h2>Provide Prescription</h2>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="prescription-card">
        <input
          type="text"
          placeholder="Enter Appointment ID"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          readOnly
        />

        <textarea
          placeholder="Medicines"
          value={medicines}
          onChange={(e) => setMedicines(e.target.value)}
        />

        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <button onClick={handleSubmit}>Save Prescription</button>
      </div>
    </div>
  );
};

export default ProvidePrescription;
