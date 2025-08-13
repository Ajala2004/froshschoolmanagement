import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';

import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teachersList } = useSelector((state) => state.teacher);
  const { currentUser } = useSelector(state => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudents(adminID));
    dispatch(getAllSclasses(adminID, "Sclass"));
    dispatch(getAllTeachers(adminID));
  }, [adminID, dispatch]);

  const numberOfStudents = studentsList?.length || 0;
  const numberOfClasses = sclassesList?.length || 0;
  const numberOfTeachers = teachersList?.length || 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        
        <Grid item xs={12} md={4}>
          <StatCard bg="#FFE5EC">
            <img src={Students} alt="Students" className="icon" />
            <h3>Total Students</h3>
            <StatNumber start={0} end={numberOfStudents} duration={2.5} />
          </StatCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard bg="#E0F7FA">
            <img src={Classes} alt="Classes" className="icon" />
            <h3>Total Classes</h3>
            <StatNumber start={0} end={numberOfClasses} duration={2.5} />
          </StatCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard bg="#E8F5E9">
            <img src={Teachers} alt="Teachers" className="icon" />
            <h3>Total Teachers</h3>
            <StatNumber start={0} end={numberOfTeachers} duration={2.5} />
          </StatCard>
        </Grid>

        <Grid item xs={12}>
          <NoticeWrapper>
            <SeeNotice />
          </NoticeWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

const StatCard = styled(Paper)`
  padding: 24px;
  border-radius: 20px !important;
  text-align: center;
  background: ${(props) => props.bg};
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.15);
  }

  .icon {
    width: 60px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 1.3rem;
    color: #444;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

const StatNumber = styled(CountUp)`
  font-size: 2rem;
  font-weight: bold;
  color: #FF6F91;
`;

const NoticeWrapper = styled(Paper)`
  padding: 20px;
  border-radius: 16px !important;
  background: #FFF3E0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export default AdminHomePage;
