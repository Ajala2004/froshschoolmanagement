import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Popup from '../components/Popup';

const ChooseUser = () => {
  const navigate = useNavigate();
  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") navigate('/Adminlogin');
    else if (user === "Student") navigate('/Studentlogin');
    else if (user === "Teacher") navigate('/Teacherlogin');
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <PageWrapper>
      <Container>
        <Title>Choose Your Role</Title>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <RoleCard onClick={() => navigateHandler("Admin")}>
              <IconCircle bg="#ffb3ba">
                <AccountCircle fontSize="large" />
              </IconCircle>
              <h2>Admin</h2>
              <p>Manage the entire FroshAcademy system, users, and content with ease.</p>
            </RoleCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RoleCard onClick={() => navigateHandler("Student")}>
              <IconCircle bg="#bae1ff">
                <School fontSize="large" />
              </IconCircle>
              <h2>Student</h2>
              <p>Access your courses, assignments, and grades — all in one place.</p>
            </RoleCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RoleCard onClick={() => navigateHandler("Teacher")}>
              <IconCircle bg="#baffc9">
                <Group fontSize="large" />
              </IconCircle>
              <h2>Teacher</h2>
              <p>Create lessons, manage classes, and track student progress easily.</p>
            </RoleCard>
          </Grid>
        </Grid>
      </Container>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageWrapper>
  );
};

export default ChooseUser;

// 🌸 Styled Components
const PageWrapper = styled.div`
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  align-items: flex-start;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 2rem;
  color: #333;
`;

const RoleCard = styled(Paper)`
  padding: 25px;
  text-align: center;
  border-radius: 20px !important;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;

  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 10px;
    color: #222;
  }

  p {
    font-size: 0.95rem;
    color: #666;
    margin-top: 8px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.12);
  }
`;

const IconCircle = styled(Box)`
  background-color: ${(props) => props.bg};
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #333;
  }
`;
