import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';

function AddPrescriptionForm() {
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [prescribedMed, setPrescribedMed] = useState([{ medicineId: '', dosage: '', qty: '' }]);
  const [remarks, setRemarks] = useState('');

  
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppointmentData= async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/doctor/get-appointments-by-doctor-id', {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading());
            if(response.data.success){
                setAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

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

    getAppointmentData();
    fetchMedicines();
  }, []);

  const handleAddMedicine = () => {
    setPrescribedMed([...prescribedMed, { medicineId: '', dosage: '', qty: '' }]);
  };

  const handleRemoveMedicine = (index) => {
    const newPrescribedMed = prescribedMed.filter((_, idx) => idx !== index);
    setPrescribedMed(newPrescribedMed);
  };

  const handleChangeMedicine = (index, field, value) => {
    const newPrescribedMed = prescribedMed.map((med, idx) => (idx === index ? { ...med, [field]: value } : med));
    setPrescribedMed(newPrescribedMed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      appointmentId: selectedAppointment,
      prescribedMed,
      remarks,
      paid: false, // Default value
    };

    try {
      const response = await axios.post('/api/prescriptions', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.message === 'success') {
        // Handle successful submission, e.g., show a success message or redirect
        alert('Prescription added successfully');
      }
    } catch (error) {
      console.error('Error adding prescription:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Appointment</InputLabel>
        <Select
          value={selectedAppointment}
          onChange={(e) => setSelectedAppointment(e.target.value)}
          label="Appointment"
          required
        >
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <MenuItem key={appointment._id} value={appointment._id}>
                {appointment.date} - {appointment.userInfo.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No appointments available</MenuItem>
          )}
        </Select>
      </FormControl>

      {prescribedMed.map((med, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Medicine</InputLabel>
            <Select
              value={med.medicineId}
              onChange={(e) => handleChangeMedicine(index, 'medicineId', e.target.value)}
              label="Medicine"
              required
            >
              {medicines.length > 0 ? (
                medicines.map((medicine) => (
                  <MenuItem key={medicine._id} value={medicine._id}>
                    {medicine.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No medicines available</MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            label="Dosage"
            value={med.dosage}
            onChange={(e) => handleChangeMedicine(index, 'dosage', e.target.value)}
            required
          />
          <TextField
            label="Quantity"
            type="number"
            value={med.qty}
            onChange={(e) => handleChangeMedicine(index, 'qty', e.target.value)}
            required
          />
          <Button onClick={() => handleRemoveMedicine(index)} variant="outlined" color="error">
            Remove
          </Button>
        </Box>
      ))}

      <Button onClick={handleAddMedicine} variant="contained" color="primary" sx={{ mb: 2 }}>
        Add Another Medicine
      </Button>

      <TextField
        label="Remarks"
        fullWidth
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        margin="normal"
        multiline
      />

      <Button type="submit" variant="contained" color="primary">
        Submit Prescription
      </Button>
    </Box>
  );
}

export default AddPrescriptionForm;
