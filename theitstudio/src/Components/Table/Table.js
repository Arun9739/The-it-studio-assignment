import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';
import UpdateForm from '../Form/UpdateForm';

export const DataTable = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    hobbies: '',
  });

  const handleUpdateClick = (id) => {
    const selectedRow = data.find((row) => row._id === id);
  setUpdateFormData(selectedRow);
  setShowUpdateForm(true);
  };

  const handleUpdate = (id, updatedData) => {
    // Update the data in the local state
    setData((prevData) =>
      prevData.map((row) => (row._id === id ? { ...row, ...updatedData } : row))
    );
  };

  useEffect(() => {
    // Replace the API endpoint with your actual backend endpoint
    axios
      .get('https://the-it-studio-server.onrender.com/api/data')
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
      const response = await axios.delete(`https://the-it-studio-server.onrender.com/api/data/${id}`);
      console.log(response); // Log the delete response

      // After deleting, fetch the data again to reflect changes
      window.location.reload()
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSend = async () => {
    try {
      const response = await axios.post('https://the-it-studio-server.onrender.com/api/send-email', {
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
                <button className="bg-blue-500 text-white px-2 py-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={() => handleUpdateClick(row._id)}>
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={() => handleDelete(row._id)}>
                  Delete
                </button> 
              </td>
            </tr>
           ))}
        </tbody>
      </table>

      {showUpdateForm && (
        <UpdateForm
          onUpdate={handleUpdate}
          onClose={() => setShowUpdateForm(false)}
          initialData={updateFormData}
        />
      )}

      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" onClick={handleSend}>
        Send
      </button>

    </div>
  );
};
