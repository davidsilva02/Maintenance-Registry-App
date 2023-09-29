import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home'
import AddRegistry from './AddRegistry'
import EditRegistry from './EditRegistry';


function App() {
  return (
    <Router>

    <div className="App">
      <Routes>
      <Route path= '/' element={<Home/>}></Route>
      <Route path= '/add-registo' element={<AddRegistry />}></Route>
      <Route path= '/edit-registo/:id' element={<EditRegistry />}></Route>

      </Routes>
    </div>

    </Router>
  );
}

export default App;
