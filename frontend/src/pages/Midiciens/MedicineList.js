import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import MedicineTable from "./MedicineTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";

function MedicineList() {
  const apiUrl = process.env.REACT_APP_API_URL; 
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const [medicines, setMedicines] = useState([]);

  const getMedicines = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/medicines`, {
        params: { name },
      });
      setMedicines(response.data);
    } catch (error) {
      toast.error("Error fetching medicines");
      console.error("Error fetching medicines:", error);
    }
  }, [name, apiUrl]);

  useEffect(() => {
    getMedicines();
  }, [getMedicines]);

  const deleteMedicine = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/medicines/${id}`);
      toast.success("Medicine deleted successfully");
      getMedicines(); // Refresh the list
    } catch (error) {
      toast.error("Error deleting medicine");
      console.error("Error deleting medicine:", error);
    }
  };

  return (
    <Layout>
      <Box component="main" sx={{ flexGrow: 1, p: 11 }}>
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-sm-4 col-3">
                <h4 className="page-title">Medicine</h4>
              </div>
              <div className="col-sm-8 col-9 text-right m-b-20">
                <Link to="/medicines/add" className="btn btn-primary float-right btn-rounded">
                  <i className="fa fa-plus"></i> Add Medicine
                </Link>
              </div>
            </div>
            <form action="/medicines" name="userFilter">
              <div className="row filter-row">
                <div className="col-sm-4 col-md-4 flex items-center">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Medicine Name"
                    />
                    <label className="focus-label">Medicine Name</label>
                  </div>
                  <div className="col-sm-4 col-md-4 ml-5 mb-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <MedicineTable medicineList={medicines} deleteMedicine={deleteMedicine} />
          </div>
        </div>
      </Box>
    </Layout>
  );
}

export default MedicineList;
