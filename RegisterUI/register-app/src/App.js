import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home'
import AddRegistry from './AddRegistry'
import EditRegistry from './EditRegistry';
import SpecificFunctions from './SpecificFunctions'
import AddSpecificFunction from './AddSpecificFunction';
import EditSF from './EditSpecificFunction';


function App() {
  return (
    <Router>

    <div className="App">
      <Routes>
      <Route path= '/' element={<Home/>}></Route>
      
      <Route path= '/specific-function' element={<SpecificFunctions/>}></Route>

      <Route path= '/add-registo' element={<AddRegistry />}></Route>
      <Route path= '/edit-registo/:id' element={<EditRegistry />}></Route>

      <Route path= '/add-specific-function' element={<AddSpecificFunction />}></Route>
      <Route path= '/edit-specific-function/:id' element={<EditSF />}></Route>
      

      </Routes>
    </div>

    </Router>
  );
}

export default App;
