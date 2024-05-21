import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';

function PrescriptionView() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state) => state.user);
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('/api/medicines', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (Array.isArray(response.data)) {
        setMedicines(response.data);
      } else {
        setMedicines([]);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setMedicines([]);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/user/get-appointments-by-user-id', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get('/api/get-prescriptions-by-user-id', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setPrescriptions(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchMedicines();
    fetchAppointments();
    fetchPrescriptions();
  }, [user._id]);

  return (
    <Layout>
      <div className="prescriptions">
        <h1>Your Prescriptions</h1>
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment._id}>
              <h2>Prescription from Dr. {appointment.doctorInfo?.firstName}</h2>
              <p>Date: {appointment.date && new Date(appointment.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : null}

        <hr/>
        {medicines && medicines.length > 0 ? (
          medicines.map((medicines) => (
            <div key={medicines._id}>
              <h2>Medicine Name :{medicines.name}</h2>
              <h2>Medicine Discription : {medicines.description}</h2>
              
            </div>
          ))
        ) : null}

        <hr/>
        {prescriptions && prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <div key={prescription._id} className="prescription-card">
              <h3>Prescribed Medicines:</h3>
              <ul>
                {prescription.prescribedMed.map((medicine) => (
                  <li key={medicine._id}>
                    <strong>Medicine:</strong> {medicine.medicineId} <br />
                    <strong>Dosage:</strong> {medicine.dosage} <br />
                    <strong>Quantity:</strong> {medicine.qty}
                  </li>
                ))}
              </ul>
              <p>Remarks: {prescription.remarks}</p>
              <p>Paid: {prescription.paid ? 'Yes' : 'No'}</p>
            </div>
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
    </Layout>
  );
}

export default PrescriptionView;
