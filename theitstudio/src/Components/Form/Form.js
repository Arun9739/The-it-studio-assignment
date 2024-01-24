// Form.js
import React, { useState } from "react";
import axios from "axios";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";

export const Form = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };


  const handleClick = () => {
    // Replace the API endpoint with your actual backend endpoint
    axios
      .post("https://the-it-studio-server.onrender.com/api/data", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <div className={`popup-form ${isOpen ? "open" : ""}`}>
      {/* <div className="form-container">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Phone number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Hobbies:
          <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} />
        </label>
        
        <button onClick={handleClick}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div> */}

      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Enter the name here"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phoneNumber" value="Your phone number" />
          </div>
          <TextInput
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block bg-red">
            <Label htmlFor="hobbies" value="Your hobbies" />
          </div>
          <TextInput
            id="hobbies"
            type="text"
            value={formData.hobbies}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" onClick={handleClick}>
          Save
        </Button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};
