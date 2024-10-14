import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/hbm logo.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

// Styled Components
const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-block`;

export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

// Dropdown Menu for logged-in users
const DropdownMenu = styled.div`
  ${tw`absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
  z-index: 10;
`;

export const UserButton = styled.button`
  ${tw`relative px-4 py-2 rounded-full bg-gray-100 text-primary-500 font-semibold`}
  &:focus {
    ${tw`outline-none`}
  }
`;

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  // New state to hold user info
  const [user, setUser] = useState(null);

  // Check if user is logged in and retrieve info from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user'); // Get the user data from localStorage
    if (userData) {
      setUser(JSON.parse(userData)); // Parse and set the user data in state
    }
  }, []);

  // Default navigation links
  const defaultLinks = [
    <NavLinks key={1}>
      <NavLink href="/">Accueil</NavLink>
      <NavLink href="/Boutique">Boutique</NavLink>
      <NavLink href="/#">Conditions d'utilisation</NavLink>
      <NavLink href="/#">Contact Nous</NavLink>

      {user ? (
        // When user is logged in, display user's name with dropdown for Profile & Logout
        <div tw="relative inline-block">
          <UserButton onClick={() => setDropdownOpen(!dropdownOpen)}>
            {user.name} {/* Display the user's name */}
          </UserButton>
          {dropdownOpen && (
            <DropdownMenu>
              <NavLink href="/profile" tw="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Profile
              </NavLink>
              <NavLink
                href="/logout"
                onClick={() => {
                  localStorage.removeItem('user'); // Clear user data from localStorage on logout
                  setUser(null); // Reset the user state
                }}
                tw="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </NavLink>
            </DropdownMenu>
          )}
        </div>
      ) : (
        // If user is not logged in, display Login and Sign Up
        <>
          <NavLink href="/login" tw="lg:ml-12!">
            Login
          </NavLink>
          <PrimaryLink css={roundedHeaderButton && tw`rounded-full`} href="/signup">
            Sign Up
          </PrimaryLink>
        </>
      )}
    </NavLinks>,
  ];

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          css={collapseBreakpointCss.mobileNavLinks}
        >
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

// Breakpoint mappings for different screen sizes
const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};
