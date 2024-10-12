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
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import Light from "./headers/light";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
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
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com"
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign In With Twitter",
      url: "https://twitter.com"
    }
  ],
  submitButtonText = "Se connecter",
  SubmitButtonIcon = SignUpIcon,
  forgotPasswordUrl = "#",
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

    if (password !== c_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const userData = {
      name,
      email,
      phone,
      address,
      password
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', userData);
      console.log('Registration successful:', response.data);
      navigate("/");
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Light/>
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
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{loading ? "Loading..." : submitButtonText}</span>
                  </SubmitButton>
                </Form>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Treact's{" "}
                  <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                    Mot de passe oublié ?
                  </a>
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

    </AnimationRevealPage></>

  );
};

export default Signup;
