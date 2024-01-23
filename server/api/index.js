const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Data = require('../Models/dataModel');
require('dotenv').config();

const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Get all data from the database
app.get('/api/data', async (req, res) => {
    try {
      const data = await Data.find();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Add new data to the database
app.post('/api/data', async (req, res) => {
    const newData = new Data(req.body);
    try {
      const savedData = await newData.save();
      res.json(savedData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.put('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const updatedData = await Data.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// Delete data from the database
app.delete('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Data.findByIdAndDelete(id);
      res.send('Data deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
    

  app.post('/api/send-email', async (req, res) => {
    const selectedRows = req.body.selectedRows;
    
    console.log("This is API " + process.env.SENDGRID_API_KEY);
  
    // Validate that selectedRows is an array of data IDs
    if (!Array.isArray(selectedRows)) {
      return res.status(400).json({ error: 'Invalid input for selectedRows' });
    }
  
    try {
      const dataToSend = await Data.find({ _id: { $in: selectedRows } });
  
      // Prepare data for email 
      const emailContent = dataToSend.map(data => `
        Name: ${data.name}
        Phone Number: ${data.phoneNumber}
        Email: ${data.email}
        Hobbies: ${data.hobbies}
        ------------------------
      `).join('');
  
      // Send email using SendGrid
      const msg = {
        to: 'arunnayakg7@gmail.com',
        from: 'nayakarun02@gmail.com',
        subject: 'Data from Selected Rows',
        text: emailContent,
      };
  
      await sgMail.send(msg);
  
      res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
