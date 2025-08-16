// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getUserDetails } from '../../../redux/userRelated/userHandle';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

// import Popup from '../../../components/Popup';
// import { BlueButton } from '../../../components/buttonStyles';
// import {
//     Box, InputLabel,
//     MenuItem, Select,
//     Typography, Stack,
//     TextField, CircularProgress, FormControl
// } from '@mui/material';

// const StudentExamMarks = ({ situation }) => {
//     const dispatch = useDispatch();
//     const { currentUser, userDetails, loading } = useSelector((state) => state.user);
//     const { subjectsList } = useSelector((state) => state.sclass);
//     const { response, error, statestatus } = useSelector((state) => state.student);
//     const params = useParams()

//     const [studentID, setStudentID] = useState("");
//     const [subjectName, setSubjectName] = useState("");
//     const [chosenSubName, setChosenSubName] = useState("");
//     const [marksObtained, setMarksObtained] = useState("");

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

//     const fields = { subName: chosenSubName, marksObtained }

//     const submitHandler = (event) => {
//         event.preventDefault()
//         setLoader(true)
//         dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
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
//                                             <InputLabel id="demo-simple-select-label">
//                                                 Select Subject
//                                             </InputLabel>
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
//                                                         Add Subjects For Marks
//                                                     </MenuItem>
//                                                 }
//                                             </Select>
//                                         </FormControl>
//                                     }
//                                     <FormControl>
//                                         <TextField type="number" label='Enter marks'
//                                             value={marksObtained} required
//                                             onChange={(e) => setMarksObtained(e.target.value)}
//                                             InputLabelProps={{
//                                                 shrink: true,
//                                             }}
//                                         />
//                                     </FormControl>
//                                 </Stack>
//                                 <BlueButton
//                                     fullWidth
//                                     size="large"
//                                     sx={{ mt: 3 }}
//                                     variant="contained"
//                                     type="submit"
//                                     disabled={loader}
//                                 >
//                                     {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                                 </BlueButton>
//                             </form>
//                         </Box>
//                     </Box>
//                     <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//                 </>
//             }
//         </>
//     )
// }

// export default StudentExamMarks
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getUserDetails } from '../../../redux/userRelated/userHandle';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
// import Popup from '../../../components/Popup';
// import { BlueButton } from '../../../components/buttonStyles';
// import {
//     Box, InputLabel,
//     MenuItem, Select,
//     Typography, Stack,
//     TextField, CircularProgress, FormControl
// } from '@mui/material';

// const StudentExamMarks = ({ situation }) => {
//     const dispatch = useDispatch();
//     const { currentUser, userDetails, loading } = useSelector((state) => state.user);
//     const { subjectsList } = useSelector((state) => state.sclass);
//     const { response, error, statestatus } = useSelector((state) => state.student);
//     const params = useParams()

//     const [studentID, setStudentID] = useState("");
//     const [subjectName, setSubjectName] = useState("");
//     const [chosenSubName, setChosenSubName] = useState("");
//     const [firstCA, setFirstCA] = useState("");
//     const [secondCA, setSecondCA] = useState("");
//     const [thirdCA, setThirdCA] = useState("");
//     const [test, setTest] = useState("");
//     const [exam, setExam] = useState("");

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

//     const fields = { subName: chosenSubName, firstCA, secondCA, thirdCA, test, exam }

//     const submitHandler = (event) => {
//         event.preventDefault()

//         // Client-side validation
//         if (firstCA > 10 || secondCA > 10 || thirdCA > 10 || test > 10 || exam > 70) {
//             setShowPopup(true);
//             setMessage("Marks exceed allowed limits");
//             return;
//         }

//         setLoader(true)
//         dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
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
//             setMessage("Error updating marks")
//         }
//         else if (statestatus === "added") {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("Done Successfully")
//         }
//     }, [response, statestatus, error])

//     return (
//         <>
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <Box sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
//                     <Box sx={{ maxWidth: 550, px: 3, py: '100px', width: '100%' }}>
//                         <Stack spacing={1} sx={{ mb: 3 }}>
//                             <Typography variant="h4">
//                                 Student Name: {userDetails.name}
//                             </Typography>
//                             {currentUser.teachSubject &&
//                                 <Typography variant="h4">
//                                     Subject Name: {currentUser.teachSubject?.subName}
//                                 </Typography>
//                             }
//                         </Stack>
//                         <form onSubmit={submitHandler}>
//                             <Stack spacing={3}>
//                                 {situation === "Student" &&
//                                     <FormControl fullWidth>
//                                         <InputLabel>Select Subject</InputLabel>
//                                         <Select
//                                             value={subjectName}
//                                             onChange={changeHandler}
//                                             required
//                                         >
//                                             {subjectsList?.length > 0 ? (
//                                                 subjectsList.map((subject, index) => (
//                                                     <MenuItem key={index} value={subject.subName}>
//                                                         {subject.subName}
//                                                     </MenuItem>
//                                                 ))
//                                             ) : (
//                                                 <MenuItem value="">No subjects</MenuItem>
//                                             )}
//                                         </Select>
//                                     </FormControl>
//                                 }

//                                 <TextField
//                                     type="number"
//                                     label="1st CA (Max 10)"
//                                     value={firstCA}
//                                     onChange={(e) => setFirstCA(e.target.value)}
//                                     inputProps={{ max: 10, min: 0 }}
//                                     required
//                                 />
//                                 <TextField
//                                     type="number"
//                                     label="2nd CA (Max 10)"
//                                     value={secondCA}
//                                     onChange={(e) => setSecondCA(e.target.value)}
//                                     inputProps={{ max: 10, min: 0 }}
//                                     required
//                                 />
//                                 <TextField
//                                     type="number"
//                                     label="3rd CA (Max 10)"
//                                     value={thirdCA}
//                                     onChange={(e) => setThirdCA(e.target.value)}
//                                     inputProps={{ max: 10, min: 0 }}
//                                     required
//                                 />
//                                 <TextField
//                                     type="number"
//                                     label="Test (Max 10)"
//                                     value={test}
//                                     onChange={(e) => setTest(e.target.value)}
//                                     inputProps={{ max: 10, min: 0 }}
//                                     required
//                                 />
//                                 <TextField
//                                     type="number"
//                                     label="Exam (Max 70)"
//                                     value={exam}
//                                     onChange={(e) => setExam(e.target.value)}
//                                     inputProps={{ max: 70, min: 0 }}
//                                     required
//                                 />
//                             </Stack>
//                             <BlueButton
//                                 fullWidth
//                                 size="large"
//                                 sx={{ mt: 3 }}
//                                 variant="contained"
//                                 type="submit"
//                                 disabled={loader}
//                             >
//                                 {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                             </BlueButton>
//                         </form>
//                     </Box>
//                 </Box>
//             )}
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     )
// }

// export default StudentExamMarks;
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getUserDetails } from '../../../redux/userRelated/userHandle';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
// import Popup from '../../../components/Popup';
// import { BlueButton } from '../../../components/buttonStyles';
// import {
//     Box, InputLabel,
//     MenuItem, Select,
//     Typography, Stack,
//     TextField, CircularProgress, FormControl
// } from '@mui/material';

// const StudentExamMarks = ({ situation }) => {
//     const dispatch = useDispatch();
//     const { currentUser, userDetails, loading } = useSelector((state) => state.user);
//     const { subjectsList } = useSelector((state) => state.sclass);
//     const { response, error, statestatus } = useSelector((state) => state.student);
//     const params = useParams()

//     const [studentID, setStudentID] = useState("");
//     const [subjectName, setSubjectName] = useState("");
//     const [chosenSubName, setChosenSubName] = useState("");
//     const [firstCA, setFirstCA] = useState("");
//     const [secondCA, setSecondCA] = useState("");
//     const [thirdCA, setThirdCA] = useState("");
//     const [test, setTest] = useState("");
//     const [exam, setExam] = useState("");

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [loader, setLoader] = useState(false)

//     // Load student + subject
//     useEffect(() => {
//         if (situation === "Student") {
//             setStudentID(params.id);
//             dispatch(getUserDetails(params.id, "Student"));
//         } else if (situation === "Subject") {
//             const { studentID, subjectID } = params
//             setStudentID(studentID);
//             dispatch(getUserDetails(studentID, "Student"));
//             setChosenSubName(subjectID);
//         }
//     }, [situation]);

//     // Load subjects if in Student mode
//     useEffect(() => {
//         if (userDetails && userDetails.sclassName && situation === "Student") {
//             dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
//         }
//     }, [dispatch, userDetails]);

//     // Pre-fill marks if existing record found
//     useEffect(() => {
//         if (userDetails && chosenSubName) {
//             const existing = userDetails.examResult?.find(
//                 (res) =>
//                     res.subName === chosenSubName || res.subName?._id === chosenSubName
//             );

//             if (existing) {
//                 setFirstCA(existing.firstCA || 0);
//                 setSecondCA(existing.secondCA || 0);
//                 setThirdCA(existing.thirdCA || 0);
//                 setTest(existing.test || 0);
//                 setExam(existing.exam || 0);
//             } else {
//                 setFirstCA("");
//                 setSecondCA("");
//                 setThirdCA("");
//                 setTest("");
//                 setExam("");
//             }
//         }
//     }, [userDetails, chosenSubName]);

//     const changeHandler = (event) => {
//         const selectedSubject = subjectsList.find(
//             (subject) => subject.subName === event.target.value
//         );
//         setSubjectName(selectedSubject.subName);
//         setChosenSubName(selectedSubject._id);
//     }

//     const fields = { subName: chosenSubName, firstCA, secondCA, thirdCA, test, exam }

//     const submitHandler = (event) => {
//         event.preventDefault()

//         // Client-side validation
//         if (firstCA > 10 || secondCA > 10 || thirdCA > 10 || test > 10 || exam > 70) {
//             setShowPopup(true);
//             setMessage("Marks exceed allowed limits");
//             return;
//         }

//         setLoader(true)
//         dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
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
//             setMessage("Error updating marks")
//         }
//         else if (statestatus === "added") {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("Done Successfully")
//         }
//     }, [response, statestatus, error])

//     return (
//         <>
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <Box sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
//                     <Box sx={{ maxWidth: 550, px: 3, py: '100px', width: '100%' }}>
//                         <Stack spacing={1} sx={{ mb: 3 }}>
//                             <Typography variant="h4">
//                                 Student Name: {userDetails?.name}
//                             </Typography>
//                             {currentUser.teachSubject &&
//                                 <Typography variant="h4">
//                                     Subject Name: {currentUser.teachSubject?.subName}
//                                 </Typography>
//                             }
//                         </Stack>
//                         <form onSubmit={submitHandler}>
//                             <Stack spacing={3}>
//                                 {situation === "Student" &&
//                                     <FormControl fullWidth>
//                                         <InputLabel>Select Subject</InputLabel>
//                                         <Select
//                                             value={subjectName}
//                                             onChange={changeHandler}
//                                             required
//                                         >
//                                             {subjectsList?.length > 0 ? (
//                                                 subjectsList.map((subject, index) => (
//                                                     <MenuItem key={index} value={subject.subName}>
//                                                         {subject.subName}
//                                                     </MenuItem>
//                                                 ))
//                                             ) : (
//                                                 <MenuItem value="">No subjects</MenuItem>
//                                             )}
//                                         </Select>
//                                     </FormControl>
//                                 }

//                                 <TextField
//                                     type="number"
//                                     label="1st CA (Max 10)"
//                                     value={firstCA}
//                                     onChange={(e) => setFirstCA(e.target.value)}
//                                     inputProps={{ max: 10, min: 0 }}
//                                     required
//                                 />
//                                 <TextField
//                                     type="number"
//                                     label="2nd CA (Max 10)"
//                                     value={secondCA}
//                                     onChange={(e) => setSecondCA(e.target.value)}
//                                     inputProps={{ max: 10, min: 0 }}
//                                     required
//                                 />
//                                 <TextField
//                                     type="number"
//                                     label="3rd CA (Max 10)"
//                                     value={thirdCA}
//                                     onChange={(e) => setThirdCA(e.target.value)}
//                                     inputProps={{ max: 10, min: 0 }}
//                                     required
//                                 />
//                                 <TextField
//                                     type="number"
//                                     label="Test (Max 10)"
//                                     value={test}
//                                     onChange={(e) => setTest(e.target.value)}
//                                     inputProps={{ max: 10, min: 0 }}
//                                     required
//                                 />
//                                 <TextField
//                                     type="number"
//                                     label="Exam (Max 70)"
//                                     value={exam}
//                                     onChange={(e) => setExam(e.target.value)}
//                                     inputProps={{ max: 70, min: 0 }}
//                                     required
//                                 />
//                             </Stack>
//                             <BlueButton
//                                 fullWidth
//                                 size="large"
//                                 sx={{ mt: 3 }}
//                                 variant="contained"
//                                 type="submit"
//                                 disabled={loader}
//                             >
//                                 {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                             </BlueButton>
//                         </form>
//                     </Box>
//                 </Box>
//             )}
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     )
// }

// export default StudentExamMarks;
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [firstCA, setFirstCA] = useState("");
    const [secondCA, setSecondCA] = useState("");
    const [thirdCA, setThirdCA] = useState("");
    const [test, setTest] = useState("");
    const [exam, setExam] = useState("");

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
            setChosenSubName(subjectID);
        }
    }, [situation]);

    // Load subjects if in Student mode
    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    // Pre-fill marks if existing record found
    useEffect(() => {
        if (userDetails && chosenSubName) {
            const existing = userDetails.examResult?.find(
                (res) =>
                    res.subName === chosenSubName || res.subName?._id === chosenSubName
            );

            if (existing) {
                setFirstCA(existing.firstCA || 0);
                setSecondCA(existing.secondCA || 0);
                setThirdCA(existing.thirdCA || 0);
                setTest(existing.test || 0);
                setExam(existing.exam || 0);
            } else {
                setFirstCA("");
                setSecondCA("");
                setThirdCA("");
                setTest("");
                setExam("");
            }
        }
    }, [userDetails, chosenSubName]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    };

    const fields = { subName: chosenSubName, firstCA, secondCA, thirdCA, test, exam };

    const submitHandler = (event) => {
        event.preventDefault();

        // Client-side validation
        if (firstCA > 10 || secondCA > 10 || thirdCA > 10 || test > 10 || exam > 70) {
            setShowPopup(true);
            setMessage("Marks exceed allowed limits");
            setSeverity("error");
            return;
        }

        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"));
    };

    useEffect(() => {
        if (response) {
            setLoader(false);
            setShowPopup(true);
            setMessage(response);
            setSeverity("success");
        }
        else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Error updating marks");
            setSeverity("error");
        }
        else if (statestatus === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Done Successfully");
            setSeverity("success");
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
                            <Typography variant="h4">
                                Student Name: {userDetails?.name}
                            </Typography>
                            {currentUser.teachSubject &&
                                <Typography variant="h4">
                                    Subject Name: {currentUser.teachSubject?.subName}
                                </Typography>
                            }
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                {situation === "Student" &&
                                    <FormControl fullWidth>
                                        <InputLabel>Select Subject</InputLabel>
                                        <Select
                                            value={subjectName}
                                            onChange={changeHandler}
                                            required
                                        >
                                            {subjectsList?.length > 0 ? (
                                                subjectsList.map((subject, index) => (
                                                    <MenuItem key={index} value={subject.subName}>
                                                        {subject.subName}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">No subjects</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                }

                                <TextField
                                    type="number"
                                    label="1st CA (Max 10)"
                                    value={firstCA}
                                    onChange={(e) => setFirstCA(e.target.value)}
                                    inputProps={{ max: 10, min: 0 }}
                                    required
                                />
                                <TextField
                                    type="number"
                                    label="2nd CA (Max 10)"
                                    value={secondCA}
                                    onChange={(e) => setSecondCA(e.target.value)}
                                    inputProps={{ max: 10, min: 0 }}
                                    required
                                />
                                <TextField
                                    type="number"
                                    label="3rd CA (Max 10)"
                                    value={thirdCA}
                                    onChange={(e) => setThirdCA(e.target.value)}
                                    inputProps={{ max: 10, min: 0 }}
                                    required
                                />
                                <TextField
                                    type="number"
                                    label="Test (Max 10)"
                                    value={test}
                                    onChange={(e) => setTest(e.target.value)}
                                    inputProps={{ max: 10, min: 0 }}
                                    required
                                />
                                <TextField
                                    type="number"
                                    label="Exam (Max 70)"
                                    value={exam}
                                    onChange={(e) => setExam(e.target.value)}
                                    inputProps={{ max: 70, min: 0 }}
                                    required
                                />
                            </Stack>
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                            </BlueButton>
                        </form>
                    </Box>
                </Box>
            )}
            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
                severity={severity} 
            />
        </>
    );
};

export default StudentExamMarks;
