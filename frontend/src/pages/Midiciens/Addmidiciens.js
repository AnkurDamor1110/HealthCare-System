import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";

function Addmedicine() {
  // Using UseNavigate to navigate from one page to other
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");

  const addmedicine = async (event) => {
    event.preventDefault();
    const form = document.forms.addmedicineForm;
    let medicine = {
      name: form.name.value,
      description: form.description.value,
      price: form.price.value,
      company: form.company.value,
    };
    try {
      // Add Medicine using Axios Method
      const response = await fetch("/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicine),
      });
      toast.success("Medicine added successfully");
      navigate("/medicines");
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("Error adding medicine:", error);
    }
  };

  return (
    <Layout>
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="page-wrapper">
        <div className="content">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h4 className="page-title">Add Medicine</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form
                  id="addmedicineForm"
                  name="addmedicineForm"
                  onSubmit={addmedicine}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Brand <span className="text-danger">*</span>
                        </label>
                        <input
                          name="company"
                          className="form-control"
                          type="text"
                          required
                          value={company}
                          onChange={(event) => setCompany(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Medicine Name <span className="text-danger">*</span>
                        </label>
                        <input
                          name="name"
                          className="form-control"
                          type="text"
                          required
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          name="description"
                          className="form-control"
                          type="text"
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Price <span className="text-danger">*</span>
                        </label>
                        <input
                          name="price"
                          className="form-control"
                          type="number"
                          required
                          value={price}
                          onChange={(event) => setPrice(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="m-t-20 text-center">
                    <button
                      id="addmedicine"
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Create medicine
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
    </Layout>
  );
}

export default Addmedicine;
