// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getUserDetails } from '../../../redux/userRelated/userHandle';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

// import {
//     Box, InputLabel,
//     MenuItem, Select,
//     Typography, Stack,
//     TextField, CircularProgress, FormControl
// } from '@mui/material';
// import { PurpleButton } from '../../../components/buttonStyles';
// import Popup from '../../../components/Popup';

// const StudentAttendance = ({ situation }) => {
//     const dispatch = useDispatch();
//     const { currentUser, userDetails, loading } = useSelector((state) => state.user);
//     const { subjectsList } = useSelector((state) => state.sclass);
//     const { response, error, statestatus } = useSelector((state) => state.student);
//     const params = useParams()

//     const [studentID, setStudentID] = useState("");
//     const [subjectName, setSubjectName] = useState("");
//     const [chosenSubName, setChosenSubName] = useState("");
//     const [status, setStatus] = useState('');
//     const [date, setDate] = useState('');

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [loader, setLoader] = useState(false)

//     useEffect(() => {
//         if (situation === "Student") {
//             setStudentID(params.id);
//             const stdID = params.id
//             dispatch(getUserDetails(stdID, "Student"));
//         }
//         else if (situation === "Subject") {
//             const { studentID, subjectID } = params
//             setStudentID(studentID);
//             dispatch(getUserDetails(studentID, "Student"));
//             setChosenSubName(subjectID);
//         }
//     }, [situation]);

//     useEffect(() => {
//         if (userDetails && userDetails.sclassName && situation === "Student") {
//             dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
//         }
//     }, [dispatch, userDetails]);

//     const changeHandler = (event) => {
//         const selectedSubject = subjectsList.find(
//             (subject) => subject.subName === event.target.value
//         );
//         setSubjectName(selectedSubject.subName);
//         setChosenSubName(selectedSubject._id);
//     }

//     const fields = { subName: chosenSubName, status, date }

//     const submitHandler = (event) => {
//         event.preventDefault()
//         setLoader(true)
//         dispatch(updateStudentFields(studentID, fields, "StudentAttendance"))
//     }

//     useEffect(() => {
//         if (response) {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage(response)
//         }
//         else if (error) {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("error")
//         }
//         else if (statestatus === "added") {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("Done Successfully")
//         }
//     }, [response, statestatus, error])

//     return (
//         <>
//             {loading
//                 ?
//                 <>
//                     <div>Loading...</div>
//                 </>
//                 :
//                 <>
//                     <Box
//                         sx={{
//                             flex: '1 1 auto',
//                             alignItems: 'center',
//                             display: 'flex',
//                             justifyContent: 'center'
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 maxWidth: 550,
//                                 px: 3,
//                                 py: '100px',
//                                 width: '100%'
//                             }}
//                         >
//                             <Stack spacing={1} sx={{ mb: 3 }}>
//                                 <Typography variant="h4">
//                                     Student Name: {userDetails.name}
//                                 </Typography>
//                                 {currentUser.teachSubject &&
//                                     <Typography variant="h4">
//                                         Subject Name: {currentUser.teachSubject?.subName}
//                                     </Typography>
//                                 }
//                             </Stack>
//                             <form onSubmit={submitHandler}>
//                                 <Stack spacing={3}>
//                                     {
//                                         situation === "Student" &&
//                                         <FormControl fullWidth>
//                                             <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
//                                             <Select
//                                                 labelId="demo-simple-select-label"
//                                                 id="demo-simple-select"
//                                                 value={subjectName}
//                                                 label="Choose an option"
//                                                 onChange={changeHandler} required
//                                             >
//                                                 {subjectsList ?
//                                                     subjectsList.map((subject, index) => (
//                                                         <MenuItem key={index} value={subject.subName}>
//                                                             {subject.subName}
//                                                         </MenuItem>
//                                                     ))
//                                                     :
//                                                     <MenuItem value="Select Subject">
//                                                         Add Subjects For Attendance
//                                                     </MenuItem>
//                                                 }
//                                             </Select>
//                                         </FormControl>
//                                     }
//                                     <FormControl fullWidth>
//                                         <InputLabel id="demo-simple-select-label">Attendance Status</InputLabel>
//                                         <Select
//                                             labelId="demo-simple-select-label"
//                                             id="demo-simple-select"
//                                             value={status}
//                                             label="Choose an option"
//                                             onChange={(event) => setStatus(event.target.value)}
//                                             required
//                                         >
//                                             <MenuItem value="Present">Present</MenuItem>
//                                             <MenuItem value="Absent">Absent</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                     <FormControl>
//                                         <TextField
//                                             label="Select Date"
//                                             type="date"
//                                             value={date}
//                                             onChange={(event) => setDate(event.target.value)} required
//                                             InputLabelProps={{
//                                                 shrink: true,
//                                             }}
//                                         />
//                                     </FormControl>
//                                 </Stack>

//                                 <PurpleButton
//                                     fullWidth
//                                     size="large"
//                                     sx={{ mt: 3 }}
//                                     variant="contained"
//                                     type="submit"
//                                     disabled={loader}
//                                 >
//                                     {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                                 </PurpleButton>
//                             </form>
//                         </Box>
//                     </Box>
//                     <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//                 </>
//             }
//         </>
//     )
// }

// export default StudentAttendance
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getUserDetails } from '../../../redux/userRelated/userHandle';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

// import {
//     Box, InputLabel,
//     MenuItem, Select,
//     Typography, Stack,
//     TextField, CircularProgress, FormControl
// } from '@mui/material';
// import { PurpleButton } from '../../../components/buttonStyles';
// import Popup from '../../../components/Popup';

// const StudentAttendance = ({ situation }) => {
//     const dispatch = useDispatch();
//     const { currentUser, userDetails, loading } = useSelector((state) => state.user);
//     const { subjectsList } = useSelector((state) => state.sclass);
//     const { response, error, statestatus } = useSelector((state) => state.student);
//     const params = useParams();

//     const [studentID, setStudentID] = useState("");
//     const [subjectName, setSubjectName] = useState("");   // display string
//     const [subjectId, setSubjectId] = useState("");       // actual ObjectId
//     const [status, setStatus] = useState('');
//     const [date, setDate] = useState('');

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [loader, setLoader] = useState(false);

//     // Fetch student details
//     useEffect(() => {
//         if (situation === "Student") {
//             setStudentID(params.id);
//             dispatch(getUserDetails(params.id, "Student"));
//         } else if (situation === "Subject") {
//             const { studentID, subjectID } = params;
//             setStudentID(studentID);
//             dispatch(getUserDetails(studentID, "Student"));
//             setSubjectId(subjectID);
//         }
//     }, [situation, params, dispatch]);

//     // Fetch subject list for student’s class
//     useEffect(() => {
//         if (userDetails && userDetails.sclassName && situation === "Student") {
//             dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
//         }
//     }, [dispatch, userDetails, situation]);

//     // Handle subject change
//     const changeHandler = (event) => {
//         const selectedSubject = subjectsList.find(
//             (subject) => subject.subName === event.target.value
//         );
//         if (selectedSubject) {
//             setSubjectName(selectedSubject.subName); // string for UI
//             setSubjectId(selectedSubject._id);       // ObjectId for backend
//         }
//     };

//     // Fields for API
//     const fields = { subjectId, status, date };

//     const submitHandler = (event) => {
//         event.preventDefault();
//         setLoader(true);
//         dispatch(updateStudentFields(studentID, fields, "StudentAttendance"));
//     };

//     // Handle popup messages
//     useEffect(() => {
//         if (statestatus === "added") {
//             setMessage("Attendance marked successfully ✅");
//         } else if (error) {
//             setMessage("Error occurred ❌");
//         } else if (response) {
//             setMessage(response);
//         }

//         if (response || error || statestatus === "added") {
//             setLoader(false);
//             setShowPopup(true);
//         }
//     }, [response, statestatus, error]);

//     return (
//         <>
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <Box
//                     sx={{
//                         flex: '1 1 auto',
//                         alignItems: 'center',
//                         display: 'flex',
//                         justifyContent: 'center'
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             maxWidth: 550,
//                             px: 3,
//                             py: '100px',
//                             width: '100%'
//                         }}
//                     >
//                         <Stack spacing={1} sx={{ mb: 3 }}>
//                             <Typography variant="h4">
//                                 Student Name: {userDetails.name}
//                             </Typography>
//                             {currentUser.teachSubject && (
//                                 <Typography variant="h4">
//                                     Subject Name: {currentUser.teachSubject?.subName}
//                                 </Typography>
//                             )}
//                         </Stack>
//                         <form onSubmit={submitHandler}>
//                             <Stack spacing={3}>
//                                 {situation === "Student" && (
//                                     <FormControl fullWidth>
//                                         <InputLabel id="subject-select-label">Select Subject</InputLabel>
//                                         <Select
//                                             labelId="subject-select-label"
//                                             id="subject-select"
//                                             value={subjectName}
//                                             label="Choose an option"
//                                             onChange={changeHandler}
//                                             required
//                                         >
//                                             {subjectsList && subjectsList.length > 0 ? (
//                                                 subjectsList.map((subject, index) => (
//                                                     <MenuItem key={index} value={subject.subName}>
//                                                         {subject.subName}
//                                                     </MenuItem>
//                                                 ))
//                                             ) : (
//                                                 <MenuItem value="">
//                                                     Add Subjects For Attendance
//                                                 </MenuItem>
//                                             )}
//                                         </Select>
//                                     </FormControl>
//                                 )}
//                                 <FormControl fullWidth>
//                                     <InputLabel id="status-select-label">Attendance Status</InputLabel>
//                                     <Select
//                                         labelId="status-select-label"
//                                         id="status-select"
//                                         value={status}
//                                         label="Choose an option"
//                                         onChange={(event) => setStatus(event.target.value)}
//                                         required
//                                     >
//                                         <MenuItem value="Present">Present</MenuItem>
//                                         <MenuItem value="Absent">Absent</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                                 <FormControl>
//                                     <TextField
//                                         label="Select Date"
//                                         type="date"
//                                         value={date}
//                                         onChange={(event) => setDate(event.target.value)}
//                                         required
//                                         InputLabelProps={{
//                                             shrink: true,
//                                         }}
//                                     />
//                                 </FormControl>
//                             </Stack>

//                             <PurpleButton
//                                 fullWidth
//                                 size="large"
//                                 sx={{ mt: 3 }}
//                                 variant="contained"
//                                 type="submit"
//                                 disabled={loader}
//                             >
//                                 {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                             </PurpleButton>
//                         </form>
//                     </Box>
//                 </Box>
//             )}
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     );
// };

 import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import Popup from '../../../components/Popup';
import { PurpleButton } from '../../../components/buttonStyles';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");
    const [loader, setLoader] = useState(false);

    // Load student + subject
    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            dispatch(getUserDetails(params.id, "Student"));
        } else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setSubjectId(subjectID);
        }
    }, [situation, params.id, params.studentID, params.subjectID, dispatch]);

    // Load subjects if in Student mode
    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails, situation]);

    // Handle subject selection
    const changeHandler = (event) => {
        const selected = subjectsList.find(sub => sub.subName === event.target.value);
        if (selected) {
            setSubjectName(selected.subName);
            setSubjectId(selected._id);
        }
    };

    // Include teacherId since no auth middleware is used
    const fields = { subjectId, status, date, teacherId: currentUser?._id };

    const submitHandler = (e) => {
        e.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"));
    };

    // Show popup on response, error, or status change
    useEffect(() => {
        if (statestatus === "added") setMessage("Attendance marked successfully ✅");
        else if (error) setMessage("Error occurred ❌");
        else if (response) setMessage(response);

        if (response || error || statestatus === "added") {
            setLoader(false);
            setShowPopup(true);
            setSeverity(statestatus === "added" ? "success" : error ? "error" : "info");
        }
    }, [response, statestatus, error]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Box sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ maxWidth: 550, px: 3, py: '100px', width: '100%' }}>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4">Student Name: {userDetails?.name}</Typography>
                            {currentUser?.teachSubject && (
                                <Typography variant="h4">
                                    Subject Name: {currentUser.teachSubject.subName}
                                </Typography>
                            )}
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                {situation === "Student" && (
                                    <FormControl fullWidth>
                                        <InputLabel>Select Subject</InputLabel>
                                        <Select
                                            value={subjectName}
                                            onChange={changeHandler}
                                            required
                                        >
                                            {subjectsList?.length > 0 ? (
                                                subjectsList.map((sub, idx) => (
                                                    <MenuItem key={idx} value={sub.subName}>
                                                        {sub.subName}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">No subjects available</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                )}
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required
                                    >
                                        <MenuItem value="Present">Present</MenuItem>
                                        <MenuItem value="Absent">Absent</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                </FormControl>
                            </Stack>
                            <PurpleButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                            </PurpleButton>
                        </form>
                    </Box>
                </Box>
            )}
            <Popup 
                message={message} 
                showPopup={showPopup} 
                setShowPopup={setShowPopup} 
                severity={severity} 
            />
        </>
    );
};

export default StudentAttendance;
