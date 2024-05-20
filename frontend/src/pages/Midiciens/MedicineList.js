import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import MedicineTable from "./MedicineTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";

function MedicineList() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const [medicines, setmedicine] = useState([]);

  useEffect(() => {
    getmedicines();
  }, []);

  const getmedicines = async () => {
    const response = await axios.get("api/medicines", {
      params: {
        name: name,
      },
    });
    setmedicine(response.data);
  };

  const deleteMedicine = async (id) => {
    try {
      await axios.delete(`api/medicines/${id}`);
      toast.success("Medicine deleted successfully");

      getmedicines();
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
              <Link
                to="/medicines/add"
                className="btn btn-primary float-right btn-rounded"
              >
                <i className="fa fa-plus"></i> Add Medicine
              </Link>
            </div>
          </div>
          <form action="/medicines" name="userFilter">
            <div className="row filter-row">
              <div className="col-sm-4 col-md-4">
                <div className="form-floating ">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Medicine Name"
                  />
                  <label className="focus-label">Medicine Name</label>
                </div>
              </div>

              <div className="col-sm-4 col-md-4">
                <button type="submit" className="btn btn-primary btn-block">
                  {" "}
                  Search{" "}
                </button>
              </div>
            </div>
          </form>
          <MedicineTable
            medicineList={medicines}
            deleteMedicine={deleteMedicine}
          />
        </div>
      </div>
    </Box>
    </Layout>
  );
}

export default MedicineList;
