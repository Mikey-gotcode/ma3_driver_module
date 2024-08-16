import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/views/Home';  // Ensure the path is correct
import LoginPage from '../src/views/LoginForm';
import SignupPage from '../src/views/SignUpForm';
import MapComponent from '../src/views/MapComponent'

const App = () => {
  return (
    <Router>
      
        <Routes>
          <Route path="/mapcomponent" element={<MapComponent/>}/>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      
    </Router>
  );
}

export default App;
