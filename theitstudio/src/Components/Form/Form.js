// Form.js
import React, { useState } from "react";
import axios from "axios";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";

export const Form = ({ isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });

  const [isOpens, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateClick = () => {
    // Call the onUpdate prop with the current form data
    onUpdate(formData);
  };

  const handleClick = () => {
    // Replace the API endpoint with your actual backend endpoint
    axios
      .post("http://localhost:5000/api/data", formData)
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
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Your phone" />
          </div>
          <TextInput id="phone" type="phone" required value={formData.phoneNumber} onChange={handleChange}/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput id="email" type="email" required value={formData.email} onChange={handleChange}/>
        </div>
        <div>
          <div className="mb-2 block bg-red">
            <Label htmlFor="hobbies" value="Your hobbies" />
          </div>
          <TextInput id="hobbies" type="text" required value={formData.hobbies} onChange={handleChange}/>
        </div>
        
        <Button type="submit" onClick={handleClick}>Save</Button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};
