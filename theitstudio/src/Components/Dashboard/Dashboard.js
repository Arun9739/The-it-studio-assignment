// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "../Table/Table";
import { Form } from "../Form/Form";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const openPopup = () => {
    setIsOpen(true);
  }

  const onClose = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    // Replace the API endpoint with your actual backend endpoint
    axios
      .get("https://the-it-studio-server.onrender.com/api/data")
      .then((response) => {
        setData(response.data); // Assuming the API response is an array of objects
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div className="dashboard">
      <DataTable/>
      <div>
        <button onClick={openPopup} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
          Add
        </button>
        <Form 
          isOpen={isOpen}
          onClose={onClose}
        />
      </div>
      
    </div>
  ); 
};

export default Dashboard;