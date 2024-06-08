import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function PrescriptionView() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  useEffect(() => {
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

    const fetchMedicines = async () => {
      try {
        const response = await axios.get('/api/medicines', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
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

    fetchAppointments();
    fetchPrescriptions();
    fetchMedicines();
  }, [user._id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAppointmentById = (appointmentId) => {
    return appointments.find((appointment) => appointment._id === appointmentId) || {};
  };

  const getMedicineById = (medicineId) => {
    return medicines.find((medicine) => medicine._id === medicineId) || {};
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const appointment = getAppointmentById(prescription.appointmentId);
    return !selectedDoctor || appointment.doctorInfo?.firstName === selectedDoctor;
  });

  const uniqueDoctors = [...new Set(appointments.map(appointment => appointment.doctorInfo?.firstName))];

  const columns = [
    { id: 'medicineName', label: 'Medicine Name', minWidth: 170 },
    { id: 'description', label: 'Medicine Description', minWidth: 170 },
    { id: 'dosage', label: 'Dosage', minWidth: 100 },
    { id: 'quantity', label: 'Quantity', minWidth: 100 },
  ];

  return (
    <Layout>
      <div className="prescriptions">
        <h1>Your Prescriptions</h1>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            select
            label="Select Doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            style={{ minWidth: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueDoctors.map((doctorName, index) => (
              <MenuItem key={index} value={doctorName}>
                Dr. {doctorName}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map((prescription) => {
            const appointment = getAppointmentById(prescription.appointmentId);
            const doctorInfo = appointment.doctorInfo || {};
            return (
              <Paper
                key={prescription._id}
                sx={{
                  width: '95%',
                  overflow: 'hidden',
                  marginTop: 2,
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2) ',
                }}
              >
                <h2>Prescription from Dr. {doctorInfo.firstName}</h2>
                <p>Date: {prescription.createdAt && new Date(prescription.createdAt).toLocaleDateString()}</p>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Remarks
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Paid
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {prescription.prescribedMed.map((medicine) => {
                        const medDetails = getMedicineById(medicine.medicineId);
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={medicine._id}>
                            <TableCell>{medDetails.name || medicine.medicineId}</TableCell>
                            <TableCell>{medDetails.description}</TableCell>
                            <TableCell>{medicine.dosage}</TableCell>
                            <TableCell>{medicine.qty}</TableCell>
                            <TableCell align="right">{prescription.remarks}</TableCell>
                            <TableCell align="right">{prescription.paid ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={filteredPrescriptions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    '& p': {
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    },
                  }}
                />
              </Paper>
            );
          })
        ) : (
          <p>You have no prescriptions from any doctor yet.</p>
        )}
      </div>
    </Layout>
  );
}
