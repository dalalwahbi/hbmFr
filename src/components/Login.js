import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
const Input = styled.input`
  ${tw`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`}
  ${props => props.hasError && tw`border-red-500`}
`;
const ErrorMessage = tw.p`text-red-500 text-xs mt-1`;

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
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const Login = ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Se connecter",
  submitButtonText = "Se connecter",
  SubmitButtonIcon = LoginIcon,
  signInUrl = "login",
  forgotPasswordUrl = "/forgot-password"
}) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        { identifier, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
  
        navigate("/");
      }
  
    } catch (error) {
      if (error.response) {
        const serverError = error.response.data;
        setError(serverError.message || "An unknown error occurred. Please try again.");
        if (serverError.errors) {
          setFieldErrors(serverError.errors);
        }
      } else {
        setError("Unable to connect to the server. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
                <SocialButtonsContainer>
                  <SocialButton href="https://google.com">
                    <span className="iconContainer">
                      <img src={googleIconImageSrc} className="icon" alt="Google icon" />
                    </span>
                    <span className="text">Sign Up With Google</span>
                  </SocialButton>
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>Ou connectez-vous avec votre e-mail ou votre identifiant</DividerText>
                </DividerTextContainer>
                <Form onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    id="identifier"
                    name="identifier"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Identifiant ou email"
                    hasError={fieldErrors.identifier}
                  />
                  {fieldErrors.identifier && <ErrorMessage>{fieldErrors.identifier[0]}</ErrorMessage>}
                  
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    hasError={fieldErrors.password}
                  />
                  {fieldErrors.password && <ErrorMessage>{fieldErrors.password[0]}</ErrorMessage>}

                  {error && <ErrorMessage>{error}</ErrorMessage>}
                  
                  <SubmitButton type="submit" disabled={loading}>
                    {loading ? "Connexion..." : <>
                      <SubmitButtonIcon className="icon" />
                      <span className="text">{submitButtonText}</span>
                    </>}
                  </SubmitButton>
                </Form>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Vous n'avez pas de compte ?{" "}
                  <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                    Inscrivez-vous
                  </a>
                </p>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                    Mot de passe oublié ?
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
    </AnimationRevealPage>
  );
};

export default Login;
