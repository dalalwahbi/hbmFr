import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import axios from 'axios';
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { useNavigate } from "react-router-dom";
import { css } from "styled-components/macro"; // eslint-disable-line
import illustration from "images/login-illustration.svg";
import logo from "images/hbm logo.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import Light from "./headers/light";
const Form = tw.form`mx-auto max-w-xs`; // This defines the Form styled component

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center`}
`;

const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const Signup = ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Créer un compte",
  submitButtonText = "Se connecter",
  signupUrl = "signup",
  tosUrl = "#",
  privacyPolicyUrl = "#"
}) => {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Check if passwords match
    if (password !== c_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
  
    // Prepare user data
    const userData = {
      name,
      email,
      phone,
      address,
      password
    };
  
    try {
      // Attempt to register the user
      const response = await axios.post('http://127.0.0.1:8000/api/register', userData);
  
      // Check if the response status is 201 (created)
      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        // Store token and user info in localStorage
        const token = response.data.token; // Adjust based on your API response
        const user = response.data.user; // Adjust based on your API response
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user)); // Storing user as JSON string
        
        // Navigate to home page upon successful registration
        navigate("/login");
      } else {
        setError("Unexpected response from server");
      }
    } catch (error) {
      // Handle errors during registration
      if (error.response) {
        console.error('Error registering:', error.response.data);
        setError(error.response.data.message || "Registration failed");
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError("No response from server");
      } else {
        console.error('Error registering:', error.message);
        setError("An unexpected error occurred");
      }
    } finally {
      // Stop loading state regardless of success or failure
      setLoading(false);
    }
  };
  
  return (
    <>
      <Light />
      <AnimationRevealPage>
        <Container>
          <Content>
            <MainContainer>
              <LogoLink href={logoLinkUrl}>
                <LogoImage src={logo} />
              </LogoLink>
              <MainContent>
                <Heading>{headingText}</Heading>
                <FormContainer>
                  <Form onSubmit={handleSubmit}>
                    <Input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom Complet" />
                    <Input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <Input type="tel" id="phone" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numéro de Téléphone" />
                    <Input type="text" id="address" name="address" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" />
                    <Input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
                    <Input type="password" id="password_confirmation" name="password_confirmation" required value={c_password} onChange={(e) => setC_password(e.target.value)} placeholder="Confirmer le mot de passe" />
                    {error && <p tw="mt-4 text-red-600 text-center">{error}</p>} {/* Display error message */}
                    <SubmitButton type="submit">
                      <span className="text">{loading ? "Loading..." : submitButtonText}</span>
                    </SubmitButton>
                  </Form>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by the terms of service and privacy policy.
                  </p>
                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Avez-vous un compte ?{" "}
                    <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                      Se connecter
                    </a>
                  </p>
                </FormContainer>
              </MainContent>
            </MainContainer>
            <IllustrationContainer>
              <IllustrationImage imageSrc={illustrationImageSrc} />
            </IllustrationContainer>
          </Content>
        </Container>
        <Footer />
      </AnimationRevealPage>
    </>
  );
};

export default Signup;
