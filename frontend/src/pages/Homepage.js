 import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
  return (
    <HeroSection>
      <Container maxWidth="lg">
        <HeroContent>
          <HeroText>
            <h1>Welcome to <span>FroshAcademy</span></h1>
            <p>
              Your all-in-one smart school platform.  
              Manage classes, track progress, connect with teachers,  
              and unlock the future of learning — all in one place.
            </p>
            <ButtonGroup>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained" fullWidth>
                  Login
                </LightPurpleButton>
              </StyledLink>
              
              {/* <p className="signup-text">
                New here?{" "}
                <Link to="/Adminregister" style={{ color: "#550080", fontWeight: "bold" }}>
                  Sign Up
                </Link>
              </p> */}
            </ButtonGroup>
          </HeroText>
          <HeroImage>
            <img src={Students} alt="Students learning" />
          </HeroImage>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Homepage;

// 🌸 Styled Components
const HeroSection = styled.section`
  background: linear-gradient(135deg, #f9f5ff, #e0c3fc, #c0c0fc);
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 40px 0;
`;

const HeroContent = styled(Box)`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  text-align: center;
  gap: 30px;

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const HeroText = styled(Box)`
  max-width: 500px;

  h1 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #252525;
    line-height: 1.2;

    span {
      color: #7f56da;
    }
  }

  p {
    margin-top: 15px;
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }

  .signup-text {
    margin-top: 15px;
    font-size: 0.9rem;
  }
`;

const ButtonGroup = styled(Box)`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HeroImage = styled(Box)`
  img {
    max-width: 320px;
    width: 100%;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
