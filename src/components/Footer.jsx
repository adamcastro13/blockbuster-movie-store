import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(180deg, #1a1a1a 0%, #09034aff 100%);
  color: #ccc;
  padding: 2rem 0;
  animation: ${fadeInUp} 0.5s ease-out;
  border-top: 1px solid #333;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;
  text-align: center;
`;

const Logo = styled.h3`
  font-family: 'ITC Machine Medium', sans-serif;
  color: #f4d421ff;
  margin-bottom: 0.5rem;
`;

const NavLinks = styled.div`
  margin: 1rem 0;
  a {
    color: #f4d421ff;
    margin: 0 1rem;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.75;
    }
  }
`;

const SocialIcons = styled.div`
  margin: 1rem 0;
  a {
    color: #fff;
    margin: 0 0.5rem;
    font-size: 1.2rem;
    transition: color 0.3s ease;
    &:hover {
      color: #f4d421ff;
    }
  }
`;

const Copy = styled.p`
  font-size: 0.85rem;
  color: #888;
  margin-top: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>BLOCKBUSTER 🎬</Logo>
        <NavLinks>
          <Link to="/movies">Inicio</Link>
          <Link to="/movies">Películas</Link>
        </NavLinks>
        <SocialIcons>
          <a href="https://www.facebook.com/adam.castro13" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://x.com/AdamCas13" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com/adamcastro13/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://github.com/adamcastro13/" target="_blank" rel="noopener noreferrer" aria-label="Github">
            <FaGithub />
          </a>
        </SocialIcons>
        <Copy>© {new Date().getFullYear()} Blockbuster. Todos los derechos reservados.</Copy>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
