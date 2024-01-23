import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';

export const DataTable = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [updatedData, setUpdatedData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });

  const handleUpdateClick = (id) => {
    handleUpdate(id, updatedData);
  };

  useEffect(() => {
    // Replace the API endpoint with your actual backend endpoint
    axios
      .get('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data); // Assuming the API response is an array of objects
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      // Replace the API endpoint with your actual backend endpoint for deleting
      const response = await axios.delete(`http://localhost:5000/api/data/${id}`);
      console.log(response); // Log the delete response

      // After deleting, fetch the data again to reflect changes
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      // Replace the API endpoint with your actual backend endpoint for updating
      const response = await axios.put(`http://localhost:5000/api/data/${id}`, {
        updatedData
      });
      console.log(response); // Log the update response

      // After updating, fetch the data again to reflect changes
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSend = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-email', {
        selectedRows,
      });
      console.log(response); // Log the send email response
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    const newSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(newSelectedRows);
  };

  return (
    <div className="container mx-auto mt-8">
    
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-r">Select</th>
            <th className="py-2 px-4 border-r">ID</th>
            <th className="py-2 px-4 border-r">Name</th>
            <th className="py-2 px-4 border-r">Phone Number</th>
            <th className="py-2 px-4 border-r">Email</th>
            <th className="py-2 px-4 border-r">Hobbies</th>
            <th className="py-2 px-4">Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) =>  (
            <tr key={row.id} className="border-t">
              <td className="py-2 px-4 border-r">
                <input type="checkbox" checked={selectedRows.includes(row._id)}
                  onChange={() => handleCheckboxChange(row._id)}/>
              </td>
              <td className="py-2 px-4 border-r">{row._id}</td>
              <td className="py-2 px-4 border-r">{row.name}</td>
              <td className="py-2 px-4 border-r">{row.phoneNumber}</td>
              <td className="py-2 px-4 border-r">{row.email}</td>
              <td className="py-2 px-4 border-r">{row.hobbies}</td>
              <td className="py-2 px-4">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2" onClick={() => handleUpdate(row._id)}>
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1" onClick={() => handleDelete(row._id)}>
                  Delete
                </button> 
              </td>
            </tr>
           ))}
        </tbody>
      </table>

      <button className="bg-green-500 text-white px-2 py-1 mt-4" onClick={handleSend}>
        Send
      </button>

    </div>
  );
};
