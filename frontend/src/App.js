import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Create from './components/create';
import NavBar from './components/navbar';
import Inventory from './components/inventory';
import Update from './components/update';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const App = () => {
  return(
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element = {<Inventory />} />
        <Route path = "/update/:id" element = {<Update />} />
        <Route path = "/add" element = {<Create />} />
      </Routes>
    </div>
  );
};

export default App;
