 // src/pages/Homepage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import Students from "../assets/students.svg";
import { LightPurpleButton } from "../components/buttonStyles";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Homepage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setDrawerOpen(open);
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar role="navigation" aria-label="Main navigation">
        <NavInner>
          <NavLogo to="/">FroshAcademy</NavLogo>

          <DesktopNav>
            {NAV_ITEMS.map((i) => (
              <NavLink key={i.to} to={i.to}>
                {i.label}
              </NavLink>
            ))}
          </DesktopNav>

          <Actions>
            <StyledLink to="/choose" aria-label="Login">
              <Button variant="contained" sx={{ background: "#7f56da", textTransform: "none" }}>
                Login
              </Button>
            </StyledLink>

            <MobileMenuButton
              aria-label="open menu"
              onClick={toggleDrawer(true)}
              size="large"
            >
              <MenuIcon />
            </MobileMenuButton>
          </Actions>
        </NavInner>
      </Navbar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DrawerHeader>
          <CloseButton onClick={toggleDrawer(false)} aria-label="close menu">
            <CloseIcon />
          </CloseButton>
        </DrawerHeader>

        <List sx={{ width: 260 }}>
          {NAV_ITEMS.map((i) => (
            <ListItem key={i.to} disablePadding>
              <ListItemButton component={Link} to={i.to} onClick={toggleDrawer(false)}>
                <ListItemText primary={i.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/choose" onClick={toggleDrawer(false)}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* HERO */}
      <HeroSection>
        <Container maxWidth="lg">
          <HeroContent>
            <HeroText>
              <h1>
                Unlock Smarter Learning with <span>FroshAcademy</span>
              </h1>
              <p>
                A modern school platform for students, teachers and parents —
                manage classes, track progress, and communicate in one place.
              </p>

              <ButtonGroup>
                <StyledLink to="/choose">
                  <LightPurpleButton variant="contained">Get Started</LightPurpleButton>
                </StyledLink>

                <StyledLink to="/about">
                  <Button variant="outlined" sx={{ borderColor: "#7f56da", color: "#7f56da", textTransform: "none" }}>
                    Learn More
                  </Button>
                </StyledLink>
              </ButtonGroup>
            </HeroText>

            <HeroImage>
              <img src={Students} alt="Students learning" />
            </HeroImage>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* FEATURES */}
      <FeaturesSection id="features">
        <Container maxWidth="lg">
          <h2>Why Choose FroshAcademy?</h2>
          <FeaturesGrid>
            <FeatureCard>
              <h3>📚 Smart Classes</h3>
              <p>Organize lessons and manage subjects effortlessly.</p>
            </FeatureCard>

            <FeatureCard>
              <h3>📊 Progress Tracking</h3>
              <p>Monitor student performance with real-time analytics.</p>
            </FeatureCard>

            <FeatureCard>
              <h3>💬 Teacher-Student Chat</h3>
              <p>Stay connected through interactive discussions.</p>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      {/* FOOTER */}
      <Footer>
        <Container maxWidth="lg">
          <FooterContent>
            <p>© {new Date().getFullYear()} FroshAcademy. All rights reserved.</p>
            <FooterLinks>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Support</a>
            </FooterLinks>
          </FooterContent>
        </Container>
      </Footer>
    </>
  );
};

export default Homepage;

/* ======================
   Styled components
   ====================== */

const Navbar = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(6px);
  z-index: 200;
  box-shadow: 0 6px 18px rgba(15, 15, 15, 0.06);
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 12px 20px;
`;

const NavLogo = styled(Link)`
  font-weight: 800;
  color: #7f56da;
  text-decoration: none;
  font-size: 1.05rem;
  letter-spacing: -0.2px;
`;

const DesktopNav = styled.nav`
  display: none;
  gap: 20px;
  align-items: center;

  @media (min-width: 900px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 0.95rem;

  &:hover { background: rgba(127,86,218,0.06); color: #7f56da; }
`;

const Actions = styled.div`
  display:flex;
  align-items:center;
  gap: 10px;
`;

/* Mobile menu button (hidden on desktop) */
const MobileMenuButton = styled(IconButton)`
  display: inline-flex;
  margin-left: 6px;

  @media (min-width: 900px) {
    display: none;
  }
`;

/* Drawer close button row */
const DrawerHeader = styled.div`
  display:flex;
  align-items:center;
  justify-content: flex-end;
  padding: 8px 8px 0 8px;
`;

const CloseButton = styled(IconButton)`
  margin-right: 6px;
`;

/* HERO */
const HeroSection = styled.section`
  background: linear-gradient(135deg, #f9f5ff, #e0c3fc);
  min-height: 100vh;
  display:flex;
  align-items:center;
  padding: 110px 0 60px; /* account for fixed navbar */
`;

const HeroContent = styled(Box)`
  display:flex;
  flex-direction: column-reverse; /* mobile: image above text */
  align-items:center;
  text-align:center;
  gap: 28px;

  @media (min-width:900px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    align-items: center;
    gap: 48px;
  }
`;

const HeroText = styled(Box)`
  max-width: 560px;
  animation: fadeInUp .9s ease both;

  h1 {
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    font-weight: 800;
    color:#222;
    line-height: 1.12;

    span { color: #7f56da; }
  }

  p {
    margin-top: 12px;
    color: #444;
    font-size: clamp(0.95rem, 2.4vw, 1.05rem);
    line-height: 1.6;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

/* Buttons: full-width on phones, inline on larger screens */
const ButtonGroup = styled(Box)`
  margin-top: 20px;
  display:flex;
  flex-direction: column;
  gap: 12px;

  button {
    width: 100%;
    padding: 10px 16px;
    font-weight: 700;
  }

  @media (min-width: 600px) {
    flex-direction: row;
    button { width: auto; min-width: 150px; }
  }
`;

const HeroImage = styled(Box)`
  img {
    width: 88%;
    max-width: 420px;
    height: auto;
    display:block;
    margin: 0 auto;
    animation: float 3.2s ease-in-out infinite;
  }

  @media (min-width: 900px) {
    img { width: 100%; max-width: 420px; }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

/* FEATURES */
const FeaturesSection = styled.section`
  padding: 60px 20px;
  background: #fff;

  h2 {
    text-align:center;
    font-size: 1.6rem;
    color:#222;
    margin-bottom: 32px;
  }
`;

const FeaturesGrid = styled.div`
  display:grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
`;

const FeatureCard = styled.div`
  background: rgba(249,245,255,0.9);
  padding: 20px;
  border-radius: 12px;
  text-align:center;
  transition: transform .25s ease, box-shadow .25s ease;

  h3 { color: #7f56da; margin-bottom: 8px; }
  p { color:#444; font-size: 0.98rem; }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(17, 17, 17, 0.06);
  }
`;

/* FOOTER */
const Footer = styled.footer`
  background: #7f56da;
  color: #fff;
  padding: 22px 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
  flex-wrap:wrap;
  text-align:center;

  p { margin: 6px 0; }
`;

const FooterLinks = styled.div`
  display:flex;
  gap: 16px;
  align-items:center;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 0.95rem;
    opacity: 0.95;
  }

  @media (max-width:520px) {
    width:100%;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
