import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { Rate } from "antd";

function Doctor({ doctor }) {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const getRating = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        `${apiUrl}/api/user/get-reviews-rating?doctorId=${doctor._id}`,
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setRating(response.data.averageRating);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Failed to fetch rating:", error);
    }
  };

  useEffect(() => {
    getRating();
    // eslint-disable-next-line
  }, [doctor._id]);

  return (
    <div
      className=" flex flex-col mx-2 my-3 cursor-pointer bg-white shadow-md rounded-lg h-96 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      onClick={() =>
        navigate(`/approved-doctor/book-appointment/${doctor._id}`)
      }
    >
      <div className=" h-28 flex justify-center bg-green-300 rounded-lg">
        <img
          className="my-1 h-32 w-32 object-cover rounded-full mt-3 p-1 bg-white"
          src={doctor.photo}
          alt={`${doctor.firstName} ${doctor.lastName}`}
        />
      </div>
      <div className="flex justify-center mt-7">
        <h1 className="card-title text-black">
          {doctor.firstName} {doctor.lastName}
        </h1>
      </div>
      <div className="flex justify-center">
        <p className="text-md text-gray-600 font-semibold">
          {doctor.specialization}
        </p>
      </div>
      <div>
        <div className=" flex flex-col justify-end">
          <div className="flex justify-center mt-2">
            <p className="font-semibold text-gray-700 flex">
              Consulting Fee:
              <i className="fa-solid fa-indian-rupee-sign fa-sm px-1 pt-2.5"></i>
              <p className="text-black">{doctor.feesPerConsultation}</p>
            </p>
          </div>
          <div className="flex items-center justify-center mt-2">
            <i className="fa-solid fa-clock pr-1 text-gray-600"></i>
            <p className="text-gray-600 font-semibold flex">
              Timings: <p className="text-black pl-1">{doctor.timings[0]} - {doctor.timings[1]}</p>
            </p>
          </div>
          <div className="flex justify-center mt-2">
            <p className="font-semibold text-gray-700">
              Rating: <Rate allowHalf value={rating} disabled />
            </p>
          </div>
        </div>
        <div className="flex flex-col bottom-0">
          <div className="flex flex-col my-3 pl-3">
            <p className="my-1 text-md text-gray-700 flex">
              <i className="fa-solid fa-phone pr-2 pt-1"></i>
              <div className="text-sm font-semibold">{doctor.phoneNumber}</div>
            </p>
            <p className="text-md text-gray-700 flex">
              <i className="fa-solid fa-location-dot pr-3 pt-1"></i>
              <div className="text-sm font-semibold text-gray-600">
                {doctor.address}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
