import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import TableCell from "@mui/material/TableCell";
// import moment from "moment";

// const { RangePicker } = TimePicker;

function ApprovedDoctorHome({ initialValues = {} }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [doctors, setDoctors] = useState([]);
  const [originalDoctors, setOriginalDoctors] = useState([]);
  const dispatch = useDispatch();
  const [change, setChange] = useState("");
//   const [time, setTime] = useState(null);
  const [priceRange, setPriceRange] = useState("none");

  

  const handleChange = (e) => {
    setChange(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (change.trim()) {
      const filtered = originalDoctors.filter(
        (doctor) =>
          doctor.firstName.toLowerCase().includes(change.toLowerCase()) || 
          doctor.specialization.toLowerCase().includes(change.toLowerCase())
      );
      setDoctors(filtered);
    } else {
      setDoctors(originalDoctors);
    }
  };

  const handlePrice = (e) => {
    const selectedPriceRange = e.target.value;
    setPriceRange(selectedPriceRange);

    let filteredDoctors = [];
    switch (selectedPriceRange) {
      case "none":
        filteredDoctors = originalDoctors;
        break;
      case "0-500":
        filteredDoctors = originalDoctors.filter(
          (doctor) => doctor.feesPerConsultation >= 0 && doctor.feesPerConsultation <= 500
        );
        break;
      case "500-1000":
        filteredDoctors = originalDoctors.filter(
          (doctor) => doctor.feesPerConsultation >= 500 && doctor.feesPerConsultation <= 1000
        );
        break;
      case "1000-1500":
        filteredDoctors = originalDoctors.filter(
          (doctor) => doctor.feesPerConsultation >= 1000 && doctor.feesPerConsultation <= 1500
        );
        break;
      case "1500-2000":
        filteredDoctors = originalDoctors.filter(
          (doctor) => doctor.feesPerConsultation >= 1500 && doctor.feesPerConsultation <= 2000
        );
        break;
      case "2000-2500":
        filteredDoctors = originalDoctors.filter(
          (doctor) => doctor.feesPerConsultation >= 2000 && doctor.feesPerConsultation <= 2500
        );
        break;
      case "2500-3000":
        filteredDoctors = originalDoctors.filter(
          (doctor) => doctor.feesPerConsultation >= 2500 && doctor.feesPerConsultation <= 3000
        );
        break;
      case "3000+":
      filteredDoctors = originalDoctors.filter(
        (doctor) => doctor.feesPerConsultation >= 3000
      );
        break;
      default:
        filteredDoctors = originalDoctors;
        break;
    }
    setDoctors(filteredDoctors);
  };

//   const handleTime = (value) => {
//     const filtered = originalDoctors.filter(
//       (doctor) => doctor.time[0] === value[0] || doctor.time[1] === value[1]
//     );
//     setDoctors(filtered);
//   };

  useEffect(() => {

    const getData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(`${apiUrl}/api/user/get-all-approved-doctors`, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        });
        dispatch(hideLoading());
        if (response.data.success) {
          setDoctors(response.data.data);
          setOriginalDoctors(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };

    getData();
  }, [dispatch]);

  return (
    <Layout>
      <div className="ml-3">
        <form onSubmit={handleSearch}>
          <div className="flex justify-between">
            <div>
              <input
                onChange={handleChange}
                type="text"
                className="bg-white rounded-2xl w-72 py-1.5 px-2.5 shadow-md focus:outline-slate-400 outline-1"
                placeholder="Search Doctor or Category"
                value={change}
              />
              <button className="bg-white mx-3 py-1.5 px-2.5 rounded-3xl shadow-md hover:bg-gray-100 active:bg-gray-200">
                <i className="fa-solid fa-search"></i>
              </button>
            </div>
            <div>
              <div className="flex">
                <label htmlFor="price" className="mr-2 text-lg font-semibold">
                  Price:
                </label>
                <select
                  onChange={handlePrice}
                  name="price"
                  id="price"
                  className="flex justify-center"
                  value={priceRange}
                >
                  <option className="mr-2 text-md" value="none">
                    None
                  </option>
                  <option className="mr-2 text-md" value="0-500">
                    0-500
                  </option>
                  <option className="mr-2 text-md" value="500-1000">
                    500-1000
                  </option>
                  <option className="mr-2 text-md" value="1000-1500">
                    1000-1500
                  </option>
                  <option className="mr-2 text-md" value="1500-2000">
                    1500-2000
                  </option>
                  <option className="mr-2 text-md" value="2000-2500">
                    2000-2500
                  </option>
                  <option className="mr-2 text-md" value="2500-3000">
                    2500-3000
                  </option>
                  <option className="mr-2 text-md" value="3000+">
                    3000+
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div bg-white>
          {doctors.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth, fontWeight: "bold" }}
            >
              {column.label}
            </TableCell>
          ))}
        </div>
      </div>

      <Row>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default ApprovedDoctorHome;
