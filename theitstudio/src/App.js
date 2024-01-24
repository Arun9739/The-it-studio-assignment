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
    <div className="App bg-blue mr-5 ml-5">
      <h1 className="text-4xl text-center text-blue-500 font-bold">The IT Studio</h1>
      <Dashboard />
      
    </div>
  );
} 

export default App;
