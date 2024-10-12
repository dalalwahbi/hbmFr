import React from "react";
import GlobalStyles from 'styles/GlobalStyles';
import SignUp from './components/Signup.js';
import Login from './components/Login.js';
import RestaurantLandingPage from './components/RestaurantLandingPage.js';
import TermsOfService from './components/TermsOfService.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Boutique from "components/Boutique.js";
import './Boutique.css';
import ProductDetails from "components/ProductDetails.js";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<RestaurantLandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/Boutique" element={<Boutique />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />

        </Routes>
      </Router>
    </>
  );
}