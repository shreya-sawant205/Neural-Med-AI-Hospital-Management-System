import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Billing.css";

interface BillingRecord {
  appointmentId: string;
  patientName: string;
  amount: number;
  paymentMode: string;
  paymentDone: boolean;   // ⭐ ADD THIS
}

const Billing: React.FC = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [billingData, setBillingData] = useState<BillingRecord[]>([
  { appointmentId: "APT-1001", patientName: "Rahul Patil", amount: 1200, paymentMode: "", paymentDone: false },
  { appointmentId: "APT-1002", patientName: "Sneha Mehta", amount: 850, paymentMode: "", paymentDone: false },
  { appointmentId: "APT-1003", patientName: "Amit Sharma", amount: 1500, paymentMode: "", paymentDone: false },
]);

  const handlePaymentChange = (index: number, mode: string) => {
    const updatedData = [...billingData];
    updatedData[index].paymentMode = mode;
    setBillingData(updatedData);
  };
  
  const handlePayClick = (index: number) => {
  if (!billingData[index].paymentMode) {
    alert("Please select payment mode first");
    return;
  }

  const updatedData = [...billingData];
  updatedData[index].paymentDone = true;   // ⭐ mark payment done
  setBillingData(updatedData);

  setShowPopup(true);
};
  return (
    <div className="billing-page">
     <div className="billing-header">
      <h2>Patients Billing</h2>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
     </div>

      <table className="billing-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Total Billing Amount</th>
            <th>Mode of Payment</th>
          </tr>
        </thead>

        <tbody>
          {billingData.map((bill, index) => (
            <tr key={index}>
              <td>{bill.appointmentId}</td>
              <td>{bill.patientName}</td>
              <td>₹ {bill.amount}</td>

             <td>
  {bill.paymentDone ? (
    <span className="selected-payment">
      {bill.paymentMode} ✅
    </span>
  ) : (
    <div className="payment-action">
      <select
        value={bill.paymentMode}
        onChange={(e) =>
          handlePaymentChange(index, e.target.value)
        }
      >
        <option value="">Select</option>
        <option>Cash</option>
        <option>Cheque</option>
        <option>UPI</option>
        <option>GPay</option>
        <option>PhonePe</option>
      </select>

      <button
        className="pay-btn"
        onClick={() => handlePayClick(index)}
      >
        Pay
      </button>
      </div>
      )}
     </td>

            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup-box">
      <h3>Payment Successful ✅</h3>
      <button onClick={() => setShowPopup(false)}>OK</button>
    </div>
  </div>
)}
    </div>
  );
};

export default Billing;