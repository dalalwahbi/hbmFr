import React from "react";
import GlobalStyles from 'styles/GlobalStyles';
import SignUp from './components/Signup.js';
import Login from './components/Login.js';
import RestaurantLandingPage from './components/RestaurantLandingPage.js';
import TermsOfService from './components/TermsOfService.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Boutique from "components/Boutique.js";
import './Boutique.css';
import './ProductDetails.css';
import './Checkout.css';

// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductDetails from "components/ProductDetails.js";
import CheckoutFrom from "components/CheckoutForm.js";
import ForgotPassword from "components/ForgotPassword.js";
import ResetPassword from "components/ResetPassword.js";

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
          <Route path="/checkout" element={<CheckoutFrom/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password" element={<ResetPassword />} />

        </Routes>
      </Router>
    </>
  );
}