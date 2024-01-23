import logo from './logo.svg';
import './App.css';
import { Table } from './Components/Table/Table';
import { ReactDOM } from 'react';
import React from "react"
import  Dashboard  from './Components/Dashboard/Dashboard';
import './styles.css';
import { Button } from 'flowbite-react';

function App() {  
  return (
    <div className="App bg-blue">
      <Dashboard />
      <Button className="bg-blue-500 text-white px-2 py-1 mr-2">
        Add
      </Button>
    </div>
  );
} 

export default App;
