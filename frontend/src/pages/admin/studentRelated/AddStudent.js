import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Grid
} from '@mui/material';

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { status, currentUser, response, error } = useSelector(state => state.user);
  const { sclassesList } = useSelector(state => state.sclass);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [className, setClassName] = useState('');
  const [sclassName, setSclassName] = useState('');

  const adminID = currentUser._id;
  const role = "Student";
  const attendance = [];

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const changeHandler = (event) => {
    if (event.target.value === 'Select Class') {
      setClassName('Select Class');
      setSclassName('');
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      );
      setClassName(selectedClass.sclassName);
      setSclassName(selectedClass._id);
    }
  };

  const fields = { name, email, parentEmail, rollNum, password, sclassName, adminID, role, attendance };

  const submitHandler = (event) => {
    event.preventDefault();
    if (sclassName === "") {
      setMessage("Please select a classname");
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate(-1);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      bgcolor: '#f4f6f8',
      padding: 2
    }}>
      <Card sx={{ width: '100%', maxWidth: 600, borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Add New Student
          </Typography>

          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Student Email"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Parent Email"
                  fullWidth
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  required
                />
              </Grid>

              {situation === "Student" && (
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Class"
                    fullWidth
                    value={className}
                    onChange={changeHandler}
                    required
                  >
                    <MenuItem value="Select Class">Select Class</MenuItem>
                    {sclassesList.map((classItem, index) => (
                      <MenuItem key={index} value={classItem.sclassName}>
                        {classItem.sclassName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Roll Number"
                  type="number"
                  fullWidth
                  value={rollNum}
                  onChange={(e) => setRollNum(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loader}
                  sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
                >
                  {loader ? <CircularProgress size={26} color="inherit" /> : 'Add Student'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default AddStudent;
