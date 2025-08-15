//  import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Grid,
//   Button,
//   Switch,
//   FormControlLabel,
//   Card,
//   CardContent,
//   Divider,
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   IconButton,
//   Modal,
// } from "@mui/material";
// import PreviewIcon from "@mui/icons-material/Preview";

// const TeacherSetExam = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const subject = currentUser?.teachSubject;

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({
//     question: "",
//     options: ["", "", "", ""],
//     answer: "",
//     time: 5,
//     marks: 1,
//     attempts: 1,
//   });
//   const [editIndex, setEditIndex] = useState(null);
//   const [examSaved, setExamSaved] = useState(false);
//   const [available, setAvailable] = useState(false);
//   const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
//   const [previewOpen, setPreviewOpen] = useState(false);

//   if (!subject) {
//     return (
//       <Box sx={{ p: 5, textAlign: "center" }}>
//         <Typography variant="h5" color="error">
//           You have no assigned subject, so you cannot set an exam.
//         </Typography>
//       </Box>
//     );
//   }

//   const handleQuestionChange = (value) => {
//     setCurrentQuestion({ ...currentQuestion, question: value?.toUpperCase() || "" });
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...currentQuestion.options];
//     newOptions[index] = value?.toUpperCase() || "";
//     setCurrentQuestion({ ...currentQuestion, options: newOptions });
//   };

//   const handleAnswerChange = (value) => {
//     setCurrentQuestion({ ...currentQuestion, answer: value?.toUpperCase() || "" });
//   };

//   const handleAddOrUpdateQuestion = () => {
//     if (
//       !currentQuestion.question ||
//       !currentQuestion.answer ||
//       currentQuestion.options.some((opt) => !opt)
//     ) {
//       alert("Please fill in the question, all options, and select the answer.");
//       return;
//     }

//     if (!currentQuestion.options.includes(currentQuestion.answer)) {
//       alert("Correct answer must match one of the options!");
//       return;
//     }

//     if (editIndex !== null) {
//       const updatedQuestions = [...questions];
//       updatedQuestions[editIndex] = currentQuestion;
//       setQuestions(updatedQuestions);
//       setEditIndex(null);
//     } else {
//       setQuestions([...questions, currentQuestion]);
//     }

//     setCurrentQuestion({
//       question: "",
//       options: ["", "", "", ""],
//       answer: "",
//       time: 5,
//       marks: 1,
//       attempts: 1,
//     });
//   };

//   const handleEdit = (index) => {
//     setCurrentQuestion(questions[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const updatedQuestions = questions.filter((_, i) => i !== index);
//     setQuestions(updatedQuestions);
//   };

//   const handleSaveExam = () => {
//     if (questions.length === 0) {
//       alert("Add at least one question before saving.");
//       return;
//     }
//     setExamSaved(true);
//     alert("Exam saved! Now you can make it available to students.");
//   };

//   const handleToggleChange = () => {
//     if (available) {
//       setToggleDialogOpen(true);
//     } else {
//       setAvailable(true);
//     }
//   };

//   const confirmToggleOff = () => {
//     setAvailable(false);
//     setToggleDialogOpen(false);
//   };

//   const cancelToggle = () => {
//     setToggleDialogOpen(false);
//   };

//   return (
//     <Box sx={{ p: 5, maxWidth: 1000, mx: "auto" }}>
//       {/* Top Summary Bar */}
//       {examSaved && (
//         <Paper sx={{ p: 2, mb: 4, display: "flex", justifyContent: "space-between" }}>
//           <Typography>Total Questions: {questions.length}</Typography>
//           <Typography>Available: {available ? "Yes" : "No"}</Typography>
//           <IconButton onClick={() => setPreviewOpen(true)} color="primary">
//             <PreviewIcon />
//           </IconButton>
//         </Paper>
//       )}

//       <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" sx={{ color: "#1976d2" }}>
//         Set Exam for {subject?.name?.toUpperCase() || "UNKNOWN SUBJECT"}
//       </Typography>

//       {/* Add / Edit Question Form */}
//       <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
//         <Typography variant="h6" gutterBottom fontWeight="bold">
//           Add / Edit Question
//         </Typography>

//         <TextField
//           fullWidth
//           label="Question"
//           value={currentQuestion.question}
//           onChange={(e) => handleQuestionChange(e.target.value)}
//           sx={{ mb: 2 }}
//         />

//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           {currentQuestion.options.map((opt, idx) => (
//             <Grid item xs={6} key={idx}>
//               <TextField
//                 fullWidth
//                 label={`Option ${idx + 1}`}
//                 value={opt}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//               />
//             </Grid>
//           ))}
//         </Grid>

//         <TextField
//           fullWidth
//           label="Correct Answer"
//           value={currentQuestion.answer}
//           onChange={(e) => handleAnswerChange(e.target.value)}
//           sx={{ mb: 2 }}
//         />

//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Time (minutes)"
//               value={currentQuestion.time}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, time: e.target.value })
//               }
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Marks"
//               value={currentQuestion.marks}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, marks: e.target.value })
//               }
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Attempts"
//               value={currentQuestion.attempts}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, attempts: e.target.value })
//               }
//             />
//           </Grid>
//         </Grid>

//         <Box sx={{ mt: 2 }}>
//           <Button variant="contained" color="primary" onClick={handleAddOrUpdateQuestion}>
//             {editIndex !== null ? "Update Question" : "Add Question"}
//           </Button>
//         </Box>
//       </Paper>

//       {/* Questions List */}
//       {questions.length > 0 && (
//         <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
//           {questions.map((q, index) => (
//             <Card key={index} sx={{ mb: 2, borderRadius: 2, backgroundColor: "#f0f8ff" }}>
//               <CardContent>
//                 <Typography>
//                   <strong>Q{index + 1}:</strong> {q.question}
//                 </Typography>
//                 <Typography variant="body2">Options: {q.options.join(", ")}</Typography>
//                 <Typography variant="body2">Answer: {q.answer}</Typography>
//                 <Typography variant="body2">
//                   Time: {q.time} mins | Marks: {q.marks} | Attempts: {q.attempts}
//                 </Typography>
//                 <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
//                   <Button variant="outlined" color="secondary" onClick={() => handleEdit(index)}>
//                     Edit
//                   </Button>
//                   <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>
//                     Delete
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}

//           <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
//             <Button variant="contained" color="success" onClick={handleSaveExam}>
//               Save Exam
//             </Button>

//             {/* Global Available Toggle */}
//             {examSaved && (
//               <FormControlLabel
//                 control={<Switch checked={available} onChange={handleToggleChange} color="primary" />}
//                 label="Available to Students"
//               />
//             )}
//           </Box>
//         </Paper>
//       )}

//       {/* Toggle OFF Confirmation Dialog */}
//       <Dialog open={toggleDialogOpen} onClose={cancelToggle}>
//         <DialogTitle>
//           Once you turn this off, all questions will be removed from the database and scores will be generated.
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={cancelToggle} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={confirmToggleOff} color="error">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Exam Preview Modal */}
//       <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
//         <Box sx={{ p: 4, mx: "auto", mt: 10, width: 600, bgcolor: "white", borderRadius: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             Exam Preview
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           {questions.map((q, i) => (
//             <Box key={i} sx={{ mb: 2, p: 2, border: "1px solid #1976d2", borderRadius: 2 }}>
//               <Typography>
//                 <strong>Q{i + 1}:</strong> {q.question}
//               </Typography>
//               <Typography variant="body2">Options: {q.options.join(", ")}</Typography>
//               <Typography variant="body2">Answer: {q.answer}</Typography>
//             </Box>
//           ))}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default TeacherSetExam;
//  import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Grid,
//   Button,
//   Switch,
//   FormControlLabel,
//   Card,
//   CardContent,
//   Divider,
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   IconButton,
//   Modal,
// } from "@mui/material";
// import PreviewIcon from "@mui/icons-material/Preview";

// const TeacherSetExam = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const subject = currentUser?.teachSubject;
//   const token = currentUser?.token;

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({
//     question: "",
//     options: ["", "", "", ""],
//     answer: "",
//     time: 5,
//     marks: 1,
//     attempts: 1,
//   });
//   const [editIndex, setEditIndex] = useState(null);
//   const [examSaved, setExamSaved] = useState(false);
//   const [available, setAvailable] = useState(false);
//   const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
//   const [previewOpen, setPreviewOpen] = useState(false);

//   const API_BASE = `${process.env.REACT_APP_BASE_URL}`;

//   useEffect(() => {
//     const fetchExam = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/${subject?._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         if (res.data) {
//           setQuestions(res.data.questions || []);
//           setExamSaved((res.data.questions || []).length > 0);
//           setAvailable(res.data.available || false);
//         }
//       } catch (err) {
//         console.error("Failed to fetch exam:", err);
//       }
//     };
//     if (subject?._id) fetchExam();
//   }, [API_BASE, subject, token]);

//   if (!subject) {
//     return (
//       <Box sx={{ p: 5, textAlign: "center" }}>
//         <Typography variant="h5" color="error">
//           You have no assigned subject, so you cannot set an exam.
//         </Typography>
//       </Box>
//     );
//   }

//   const handleQuestionChange = (value) => {
//     setCurrentQuestion({ ...currentQuestion, question: value?.toUpperCase() || "" });
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...currentQuestion.options];
//     newOptions[index] = value?.toUpperCase() || "";
//     setCurrentQuestion({ ...currentQuestion, options: newOptions });
//   };

//   const handleAnswerChange = (value) => {
//     setCurrentQuestion({ ...currentQuestion, answer: value?.toUpperCase() || "" });
//   };

//   const handleAddOrUpdateQuestion = () => {
//     if (!currentQuestion.question || !currentQuestion.answer || currentQuestion.options.some((opt) => !opt)) {
//       alert("Please fill in the question, all options, and select the answer.");
//       return;
//     }
//     if (!currentQuestion.options.includes(currentQuestion.answer)) {
//       alert("Correct answer must match one of the options!");
//       return;
//     }
//     if (editIndex !== null) {
//       const updatedQuestions = [...questions];
//       updatedQuestions[editIndex] = currentQuestion;
//       setQuestions(updatedQuestions);
//       setEditIndex(null);
//     } else {
//       setQuestions([...questions, currentQuestion]);
//     }
//     setCurrentQuestion({
//       question: "",
//       options: ["", "", "", ""],
//       answer: "",
//       time: 5,
//       marks: 1,
//       attempts: 1,
//     });
//   };

//   const handleEdit = (index) => {
//     setCurrentQuestion(questions[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const handleSaveExam = async () => {
//     if (questions.length === 0) {
//       alert("Add at least one question before saving.");
//       return;
//     }
//     try {
//       await axios.post(
//         `${API_BASE}/save`,
//         {
//           teacherId: currentUser._id,
//           subjectId: subject._id,
//           questions,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       setExamSaved(true);
//       alert("Exam saved successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Error saving exam");
//     }
//   };

//   const handleToggleChange = async () => {
//     try {
//       if (!available) {
//         await axios.patch(
//           `${API_BASE}//toggle`,
//           { subjectId: subject._id, available: true },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setAvailable(true);
//       } else {
//         setToggleDialogOpen(true);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error updating availability");
//     }
//   };

//   const confirmToggleOff = async () => {
//     try {
//       await axios.patch(
//         `${API_BASE}/toggle`,
//         { subjectId: subject._id, available: false },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       setAvailable(false);
//       setToggleDialogOpen(false);
//     } catch (err) {
//       console.error(err);
//       alert("Error disabling exam");
//     }
//   };

//   return (
//     <Box sx={{ p: 5, maxWidth: 1000, mx: "auto" }}>
//       {examSaved && (
//         <Paper sx={{ p: 2, mb: 4, display: "flex", justifyContent: "space-between" }}>
//           <Typography>Total Questions: {questions.length}</Typography>
//           <Typography>Available: {available ? "Yes" : "No"}</Typography>
//           <IconButton onClick={() => setPreviewOpen(true)} color="primary">
//             <PreviewIcon />
//           </IconButton>
//         </Paper>
//       )}
//       <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" sx={{ color: "#1976d2" }}>
//         Set Exam for {subject?.name?.toUpperCase() || "UNKNOWN SUBJECT"}
//       </Typography>

//       {/* Add / Edit Question Form */}
//       <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
//         <Typography variant="h6" gutterBottom fontWeight="bold">
//           Add / Edit Question
//         </Typography>
//         <TextField
//           fullWidth
//           label="Question"
//           value={currentQuestion.question}
//           onChange={(e) => handleQuestionChange(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           {currentQuestion.options.map((opt, idx) => (
//             <Grid item xs={6} key={idx}>
//               <TextField
//                 fullWidth
//                 label={`Option ${idx + 1}`}
//                 value={opt}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//               />
//             </Grid>
//           ))}
//         </Grid>
//         <TextField
//           fullWidth
//           label="Correct Answer"
//           value={currentQuestion.answer}
//           onChange={(e) => handleAnswerChange(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Time (minutes)"
//               value={currentQuestion.time}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, time: e.target.value })
//               }
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Marks"
//               value={currentQuestion.marks}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, marks: e.target.value })
//               }
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Attempts"
//               value={currentQuestion.attempts}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, attempts: e.target.value })
//               }
//             />
//           </Grid>
//         </Grid>
//         <Box sx={{ mt: 2 }}>
//           <Button variant="contained" color="primary" onClick={handleAddOrUpdateQuestion}>
//             {editIndex !== null ? "Update Question" : "Add Question"}
//           </Button>
//         </Box>
//       </Paper>

//       {/* Questions List */}
//       {questions.length > 0 && (
//         <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
//           {questions.map((q, index) => (
//             <Card key={index} sx={{ mb: 2, borderRadius: 2, backgroundColor: "#f0f8ff" }}>
//               <CardContent>
//                 <Typography><strong>Q{index + 1}:</strong> {q.question}</Typography>
//                 <Typography variant="body2">Options: {q.options.join(", ")}</Typography>
//                 <Typography variant="body2">Answer: {q.answer}</Typography>
//                 <Typography variant="body2">
//                   Time: {q.time} mins | Marks: {q.marks} | Attempts: {q.attempts}
//                 </Typography>
//                 <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
//                   <Button variant="outlined" color="secondary" onClick={() => handleEdit(index)}>Edit</Button>
//                   <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>Delete</Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//           <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
//             <Button variant="contained" color="success" onClick={handleSaveExam}>Save Exam</Button>
//             {examSaved && (
//               <FormControlLabel
//                 control={<Switch checked={available} onChange={handleToggleChange} color="primary" />}
//                 label="Available to Students"
//               />
//             )}
//           </Box>
//         </Paper>
//       )}

//       {/* Toggle OFF Confirmation Dialog */}
//       <Dialog open={toggleDialogOpen} onClose={() => setToggleDialogOpen(false)}>
//         <DialogTitle>
//           Once you turn this off, all questions will be removed from the database and scores will be generated.
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={() => setToggleDialogOpen(false)} color="secondary">Cancel</Button>
//           <Button onClick={confirmToggleOff} color="error">Confirm</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Exam Preview Modal */}
//       <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
//         <Box sx={{ p: 4, mx: "auto", mt: 10, width: 600, bgcolor: "white", borderRadius: 3 }}>
//           <Typography variant="h5" gutterBottom>Exam Preview</Typography>
//           <Divider sx={{ mb: 2 }} />
//           {questions.map((q, i) => (
//             <Box key={i} sx={{ mb: 2, p: 2, border: "1px solid #1976d2", borderRadius: 2 }}>
//               <Typography><strong>Q{i + 1}:</strong> {q.question}</Typography>
//               <Typography variant="body2">Options: {q.options.join(", ")}</Typography>
//               <Typography variant="body2">Answer: {q.answer}</Typography>
//             </Box>
//           ))}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default TeacherSetExam;
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Grid,
//   Button,
//   Switch,
//   FormControlLabel,
//   Card,
//   CardContent,
//   Divider,
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   IconButton,
//   Modal,
// } from "@mui/material";
// import PreviewIcon from "@mui/icons-material/Preview";

// const TeacherSetExam = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const subject = currentUser?.teachSubject;

//   // 🔹 FIX: Get token from localStorage if not in Redux
//   const token =
//     currentUser?.token || localStorage.getItem("token") || "";

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({
//     question: "",
//     options: ["", "", "", ""],
//     answer: "",
//     time: 5,
//     marks: 1,
//     attempts: 1,
//   });
//   const [editIndex, setEditIndex] = useState(null);
//   const [examSaved, setExamSaved] = useState(false);
//   const [available, setAvailable] = useState(false);
//   const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
//   const [previewOpen, setPreviewOpen] = useState(false);

//   const API_BASE = process.env.REACT_APP_BASE_URL;

//   useEffect(() => {
//     const fetchExam = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/${subject?._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         if (res.data) {
//           setQuestions(res.data.questions || []);
//           setExamSaved((res.data.questions || []).length > 0);
//           setAvailable(res.data.available || false);
//         }
//       } catch (err) {
//         console.error("Failed to fetch exam:", err);
//       }
//     };
//     if (subject?._id && token) fetchExam();
//   }, [API_BASE, subject, token]);

//   if (!subject) {
//     return (
//       <Box sx={{ p: 5, textAlign: "center" }}>
//         <Typography variant="h5" color="error">
//           You have no assigned subject, so you cannot set an exam.
//         </Typography>
//       </Box>
//     );
//   }

//   const handleQuestionChange = (value) => {
//     setCurrentQuestion({
//       ...currentQuestion,
//       question: value?.toUpperCase() || "",
//     });
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...currentQuestion.options];
//     newOptions[index] = value?.toUpperCase() || "";
//     setCurrentQuestion({ ...currentQuestion, options: newOptions });
//   };

//   const handleAnswerChange = (value) => {
//     setCurrentQuestion({
//       ...currentQuestion,
//       answer: value?.toUpperCase() || "",
//     });
//   };

//   const handleAddOrUpdateQuestion = () => {
//     if (
//       !currentQuestion.question ||
//       !currentQuestion.answer ||
//       currentQuestion.options.some((opt) => !opt)
//     ) {
//       alert("Please fill in the question, all options, and select the answer.");
//       return;
//     }
//     if (!currentQuestion.options.includes(currentQuestion.answer)) {
//       alert("Correct answer must match one of the options!");
//       return;
//     }
//     if (editIndex !== null) {
//       const updatedQuestions = [...questions];
//       updatedQuestions[editIndex] = currentQuestion;
//       setQuestions(updatedQuestions);
//       setEditIndex(null);
//     } else {
//       setQuestions([...questions, currentQuestion]);
//     }
//     setCurrentQuestion({
//       question: "",
//       options: ["", "", "", ""],
//       answer: "",
//       time: 5,
//       marks: 1,
//       attempts: 1,
//     });
//   };

//   const handleEdit = (index) => {
//     setCurrentQuestion(questions[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const handleSaveExam = async () => {
//     if (questions.length === 0) {
//       alert("Add at least one question before saving.");
//       return;
//     }
//     try {
//       await axios.post(
//         `${API_BASE}/save`,
//         {
//           teacherId: currentUser._id,
//           subjectId: subject._id,
//           questions,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       setExamSaved(true);
//       alert("Exam saved successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Error saving exam");
//     }
//   };

//   const handleToggleChange = async () => {
//     try {
//       if (!available) {
//         await axios.patch(
//           `${API_BASE}/toggle`,
//           { subjectId: subject._id, available: true },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setAvailable(true);
//       } else {
//         setToggleDialogOpen(true);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error updating availability");
//     }
//   };

//   const confirmToggleOff = async () => {
//     try {
//       await axios.patch(
//         `${API_BASE}/toggle`,
//         { subjectId: subject._id, available: false },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       setAvailable(false);
//       setToggleDialogOpen(false);
//     } catch (err) {
//       console.error(err);
//       alert("Error disabling exam");
//     }
//   };

//   return (
//     <Box sx={{ p: 5, maxWidth: 1000, mx: "auto" }}>
//       {examSaved && (
//         <Paper
//           sx={{
//             p: 2,
//             mb: 4,
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography>Total Questions: {questions.length}</Typography>
//           <Typography>Available: {available ? "Yes" : "No"}</Typography>
//           <IconButton onClick={() => setPreviewOpen(true)} color="primary">
//             <PreviewIcon />
//           </IconButton>
//         </Paper>
//       )}
//       <Typography
//         variant="h4"
//         gutterBottom
//         fontWeight="bold"
//         textAlign="center"
//         sx={{ color: "#1976d2" }}
//       >
//         Set Exam for {subject?.name?.toUpperCase() || "UNKNOWN SUBJECT"}
//       </Typography>

//       {/* Add / Edit Question Form */}
//       <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
//         <Typography variant="h6" gutterBottom fontWeight="bold">
//           Add / Edit Question
//         </Typography>
//         <TextField
//           fullWidth
//           label="Question"
//           value={currentQuestion.question}
//           onChange={(e) => handleQuestionChange(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           {currentQuestion.options.map((opt, idx) => (
//             <Grid item xs={6} key={idx}>
//               <TextField
//                 fullWidth
//                 label={`Option ${idx + 1}`}
//                 value={opt}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//               />
//             </Grid>
//           ))}
//         </Grid>
//         <TextField
//           fullWidth
//           label="Correct Answer"
//           value={currentQuestion.answer}
//           onChange={(e) => handleAnswerChange(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Time (minutes)"
//               value={currentQuestion.time}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, time: e.target.value })
//               }
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Marks"
//               value={currentQuestion.marks}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, marks: e.target.value })
//               }
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Attempts"
//               value={currentQuestion.attempts}
//               onChange={(e) =>
//                 setCurrentQuestion({
//                   ...currentQuestion,
//                   attempts: e.target.value,
//                 })
//               }
//             />
//           </Grid>
//         </Grid>
//         <Box sx={{ mt: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddOrUpdateQuestion}
//           >
//             {editIndex !== null ? "Update Question" : "Add Question"}
//           </Button>
//         </Box>
//       </Paper>

//       {/* Questions List */}
//       {questions.length > 0 && (
//         <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
//           {questions.map((q, index) => (
//             <Card
//               key={index}
//               sx={{
//                 mb: 2,
//                 borderRadius: 2,
//                 backgroundColor: "#f0f8ff",
//               }}
//             >
//               <CardContent>
//                 <Typography>
//                   <strong>Q{index + 1}:</strong> {q.question}
//                 </Typography>
//                 <Typography variant="body2">
//                   Options: {q.options.join(", ")}
//                 </Typography>
//                 <Typography variant="body2">Answer: {q.answer}</Typography>
//                 <Typography variant="body2">
//                   Time: {q.time} mins | Marks: {q.marks} | Attempts:{" "}
//                   {q.attempts}
//                 </Typography>
//                 <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => handleEdit(index)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDelete(index)}
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//           <Box
//             sx={{
//               mt: 3,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleSaveExam}
//             >
//               Save Exam
//             </Button>
//             {examSaved && (
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={available}
//                     onChange={handleToggleChange}
//                     color="primary"
//                   />
//                 }
//                 label="Available to Students"
//               />
//             )}
//           </Box>
//         </Paper>
//       )}

//       {/* Toggle OFF Confirmation Dialog */}
//       <Dialog
//         open={toggleDialogOpen}
//         onClose={() => setToggleDialogOpen(false)}
//       >
//         <DialogTitle>
//           Once you turn this off, all questions will be removed from the
//           database and scores will be generated.
//         </DialogTitle>
//         <DialogActions>
//           <Button
//             onClick={() => setToggleDialogOpen(false)}
//             color="secondary"
//           >
//             Cancel
//           </Button>
//           <Button onClick={confirmToggleOff} color="error">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Exam Preview Modal */}
//       <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
//         <Box
//           sx={{
//             p: 4,
//             mx: "auto",
//             mt: 10,
//             width: 600,
//             bgcolor: "white",
//             borderRadius: 3,
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             Exam Preview
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           {questions.map((q, i) => (
//             <Box
//               key={i}
//               sx={{
//                 mb: 2,
//                 p: 2,
//                 border: "1px solid #1976d2",
//                 borderRadius: 2,
//               }}
//             >
//               <Typography>
//                 <strong>Q{i + 1}:</strong> {q.question}
//               </Typography>
//               <Typography variant="body2">
//                 Options: {q.options.join(", ")}
//               </Typography>
//               <Typography variant="body2">Answer: {q.answer}</Typography>
//             </Box>
//           ))}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default TeacherSetExam;

//  import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Grid,
//   Button,
//   Switch,
//   FormControlLabel,
//   Card,
//   CardContent,
//   Divider,
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   IconButton,
//   Modal,
// } from "@mui/material";
// import PreviewIcon from "@mui/icons-material/Preview";

// const TeacherSetExam = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const teachSubject = currentUser.teachSubject
//   const subject = currentUser?.teachSubject;
//   const teacherId = currentUser?._id;

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({
//     question: "",
//     options: ["", "", "", ""],
//     answer: "",
//     time: 5,
//     marks: 1,
//     attempts: 1,
//   });
//   const [editIndex, setEditIndex] = useState(null);
//   const [examSaved, setExamSaved] = useState(false);
//   const [available, setAvailable] = useState(false);
//   const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
//   const [previewOpen, setPreviewOpen] = useState(false);

//   const API_BASE = process.env.REACT_APP_BASE_URL;

//   useEffect(() => {
//     const fetchExam = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/exam/${subject?._id}?teacherId=${teacherId}`);
//         if (res.data) {
//           setQuestions(res.data.questions || []);
//           setExamSaved((res.data.questions || []).length > 0);
//           setAvailable(res.data.available || false);
//         }
//       } catch (err) {
//         console.error("Failed to fetch exam:", {
//           message: err.message,
//           status: err.response?.status,
//           statusText: err.response?.statusText,
//           data: err.response?.data,
//         });
//         alert(`Failed to fetch exam: ${err.response?.data?.message || err.message}`);
//       }
//     };
//     if (subject?._id && teacherId) fetchExam();
//   }, [API_BASE, subject, teacherId]);

//   if (!subject) {
//     return (
//       <Box sx={{ p: 5, textAlign: "center" }}>
//         <Typography variant="h5" color="error">
//           You have no assigned subject, so you cannot set an exam.
//         </Typography>
//       </Box>
//     );
//   }

//   const handleQuestionChange = (value) => {
//     setCurrentQuestion({
//       ...currentQuestion,
//       question: value?.toUpperCase() || "",
//     });
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...currentQuestion.options];
//     newOptions[index] = value?.toUpperCase() || "";
//     setCurrentQuestion({ ...currentQuestion, options: newOptions });
//   };

//   const handleAnswerChange = (value) => {
//     setCurrentQuestion({
//       ...currentQuestion,
//       answer: value?.toUpperCase() || "",
//     });
//   };

//   const handleAddOrUpdateQuestion = () => {
//     if (
//       !currentQuestion.question ||
//       !currentQuestion.answer ||
//       currentQuestion.options.some((opt) => !opt)
//     ) {
//       alert("Please fill in the question, all options, and select the answer.");
//       return;
//     }
//     if (!currentQuestion.options.includes(currentQuestion.answer)) {
//       alert("Correct answer must match one of the options!");
//       return;
//     }
//     if (editIndex !== null) {
//       const updatedQuestions = [...questions];
//       updatedQuestions[editIndex] = currentQuestion;
//       setQuestions(updatedQuestions);
//       setEditIndex(null);
//     } else {
//       setQuestions([...questions, currentQuestion]);
//     }
//     setCurrentQuestion({
//       question: "",
//       options: ["", "", "", ""],
//       answer: "",
//       time: 5,
//       marks: 1,
//       attempts: 1,
//     });
//   };

//   const handleEdit = (index) => {
//     setCurrentQuestion(questions[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const handleSaveExam = async () => {
//     if (questions.length === 0) {
//       alert("Add at least one question before saving.");
//       return;
//     }
//     try {
//       await axios.post(`${API_BASE}/save`, {
//         teacherId,
//         subjectId: subject._id,
//         questions,
//       });
//       setExamSaved(true);
//       alert("Exam saved successfully!");
//     } catch (err) {
//       console.error("Error saving exam:", {
//         message: err.message,
//         status: err.response?.status,
//         statusText: err.response?.statusText,
//         data: err.response?.data,
//       });
//       alert(`Error saving exam: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   const handleToggleChange = async () => {
//     try {
//       if (!available) {
//         await axios.patch(`${API_BASE}/toggle`, {
//           teacherId,
//           subjectId: subject._id,
//           available: true,
//         });
//         setAvailable(true);
//       } else {
//         setToggleDialogOpen(true);
//       }
//     } catch (err) {
//       console.error("Error updating availability:", {
//         message: err.message,
//         status: err.response?.status,
//         statusText: err.response?.statusText,
//         data: err.response?.data,
//       });
//       alert(`Error updating availability: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   const confirmToggleOff = async () => {
//     try {
//       await axios.patch(`${API_BASE}/exam/toggle`, {
//         teacherId,
//         subjectId: subject._id,
//         available: false,
//       });
//       setAvailable(false);
//       setToggleDialogOpen(false);
//     } catch (err) {
//       console.error("Error disabling exam:", {
//         message: err.message,
//         status: err.response?.status,
//         statusText: err.response?.statusText,
//         data: err.response?.data,
//       });
//       alert(`Error disabling exam: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   return (
//     <Box sx={{ p: 5, maxWidth: 1000, mx: "auto" }}>
//       {examSaved && (
//         <Paper
//           sx={{
//             p: 2,
//             mb: 4,
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography>Total Questions: {questions.length}</Typography>
//           <Typography>Available: {available ? "Yes" : "No"}</Typography>
//           <IconButton onClick={() => setPreviewOpen(true)} color="primary">
//             <PreviewIcon />
//           </IconButton>
//         </Paper>
//       )}
//       <Typography
//         variant="h4"
//         gutterBottom
//         fontWeight="bold"
//         textAlign="center"
//         sx={{ color: "#1976d2" }}
//       >
//         Set Exam for {subject?.name?.toUpperCase() || "UNKNOWN SUBJECT"}
//       </Typography>

//       {/* Add / Edit Question Form */}
//       <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
//         <Typography variant="h6" gutterBottom fontWeight="bold">
//           Add / Edit Question
//         </Typography>
//         <TextField
//           fullWidth
//           label="Question"
//           value={currentQuestion.question}
//           onChange={(e) => handleQuestionChange(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           {currentQuestion.options.map((opt, idx) => (
//             <Grid item xs={6} key={idx}>
//               <TextField
//                 fullWidth
//                 label={`Option ${idx + 1}`}
//                 value={opt}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//               />
//             </Grid>
//           ))}
//         </Grid>
//         <TextField
//           fullWidth
//           label="Correct Answer"
//           value={currentQuestion.answer}
//           onChange={(e) => handleAnswerChange(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Time (minutes)"
//               value={currentQuestion.time}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, time: e.target.value })
//               }
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Marks"
//               value={currentQuestion.marks}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, marks: e.target.value })
//               }
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               type="number"
//               fullWidth
//               label="Attempts"
//               value={currentQuestion.attempts}
//               onChange={(e) =>
//                 setCurrentQuestion({
//                   ...currentQuestion,
//                   attempts: e.target.value,
//                 })
//               }
//             />
//           </Grid>
//         </Grid>
//         <Box sx={{ mt: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddOrUpdateQuestion}
//           >
//             {editIndex !== null ? "Update Question" : "Add Question"}
//           </Button>
//         </Box>
//       </Paper>

//       {/* Questions List */}
//       {questions.length > 0 && (
//         <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
//           {questions.map((q, index) => (
//             <Card
//               key={index}
//               sx={{
//                 mb: 2,
//                 borderRadius: 2,
//                 backgroundColor: "#f0f8ff",
//               }}
//             >
//               <CardContent>
//                 <Typography>
//                   <strong>Q{index + 1}:</strong> {q.question}
//                 </Typography>
//                 <Typography variant="body2">
//                   Options: {q.options.join(", ")}
//                 </Typography>
//                 <Typography variant="body2">Answer: {q.answer}</Typography>
//                 <Typography variant="body2">
//                   Time: {q.time} mins | Marks: {q.marks} | Attempts:{" "}
//                   {q.attempts}
//                 </Typography>
//                 <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => handleEdit(index)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDelete(index)}
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//           <Box
//             sx={{
//               mt: 3,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleSaveExam}
//             >
//               Save Exam
//             </Button>
//             {examSaved && (
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={available}
//                     onChange={handleToggleChange}
//                     color="primary"
//                   />
//                 }
//                 label="Available to Students"
//               />
//             )}
//           </Box>
//         </Paper>
//       )}

//       {/* Toggle OFF Confirmation Dialog */}
//       <Dialog
//         open={toggleDialogOpen}
//         onClose={() => setToggleDialogOpen(false)}
//       >
//         <DialogTitle>
//           Once you turn this off, all questions will be removed from the
//           database and scores will be generated.
//         </DialogTitle>
//         <DialogActions>
//           <Button
//             onClick={() => setToggleDialogOpen(false)}
//             color="secondary"
//           >
//             Cancel
//           </Button>
//           <Button onClick={confirmToggleOff} color="error">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Exam Preview Modal */}
//       <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
//         <Box
//           sx={{
//             p: 4,
//             mx: "auto",
//             mt: 10,
//             width: 600,
//             bgcolor: "white",
//             borderRadius: 3,
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             Exam Preview
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           {questions.map((q, i) => (
//             <Box
//               key={i}
//               sx={{
//                 mb: 2,
//                 p: 2,
//                 border: "1px solid #1976d2",
//                 borderRadius: 2,
//               }}
//             >
//               <Typography>
//                 <strong>Q{i + 1}:</strong> {q.question}
//               </Typography>
//               <Typography variant="body2">
//                 Options: {q.options.join(", ")}
//               </Typography>
//               <Typography variant="body2">Answer: {q.answer}</Typography>
//             </Box>
//           ))}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default TeacherSetExam;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Modal,
} from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";

const TeacherSetExam = () => {
  const { currentUser } = useSelector((state) => state.user);
  const subject = currentUser?.teachSubject;
  const teacherId = currentUser?._id;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
    time: 5,
    marks: 1,
    attempts: 1,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [examSaved, setExamSaved] = useState(false);
  const [available, setAvailable] = useState(false);
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const API_BASE = process.env.REACT_APP_BASE_URL;

  // Fetch previous exam if exists
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.post(`${API_BASE}/my-exam`, {
          teacherId,
          subjectId: subject?._id,
        });
        if (res.data && res.data.questions) {
          setQuestions(res.data.questions);
          setExamSaved(res.data.questions.length > 0);
          setAvailable(res.data.available || false);
        }
      } catch (err) {
        console.error("Failed to fetch exam:", err.response?.data || err.message);
        alert(`Failed to fetch exam: ${err.response?.data?.message || err.message}`);
      }
    };
    if (subject?._id && teacherId) fetchExam();
  }, [API_BASE, subject, teacherId]);

  if (!subject) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          You have no assigned subject, so you cannot set an exam.
        </Typography>
      </Box>
    );
  }

  const handleQuestionChange = (value) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: value?.toUpperCase() || "",
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value?.toUpperCase() || "";
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleAnswerChange = (value) => {
    setCurrentQuestion({
      ...currentQuestion,
      answer: value?.toUpperCase() || "",
    });
  };

  const handleAddOrUpdateQuestion = () => {
    if (
      !currentQuestion.question ||
      !currentQuestion.answer ||
      currentQuestion.options.some((opt) => !opt)
    ) {
      alert("Please fill in the question, all options, and select the answer.");
      return;
    }
    if (!currentQuestion.options.includes(currentQuestion.answer)) {
      alert("Correct answer must match one of the options!");
      return;
    }
    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = currentQuestion;
      setQuestions(updatedQuestions);
      setEditIndex(null);
    } else {
      setQuestions([...questions, currentQuestion]);
    }
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      answer: "",
      time: 5,
      marks: 1,
      attempts: 1,
    });
  };

  const handleEdit = (index) => {
    setCurrentQuestion(questions[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSaveExam = async () => {
    if (questions.length === 0) {
      alert("Add at least one question before saving.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/save`, {
        teacherId,
        subjectId: subject._id,
        questions,
      });
      setExamSaved(true);
      alert("Exam saved successfully!");
    } catch (err) {
      console.error("Error saving exam:", err.response?.data || err.message);
      alert(`Error saving exam: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleToggleChange = async () => {
    try {
      if (!available) {
        await axios.put(`${API_BASE}/toggle`, {
          teacherId,
          subjectId: subject._id,
          available: true,
        });
        setAvailable(true);
      } else {
        setToggleDialogOpen(true);
      }
    } catch (err) {
      console.error("Error updating availability:", err.response?.data || err.message);
      alert(`Error updating availability: ${err.response?.data?.message || err.message}`);
    }
  };

  const confirmToggleOff = async () => {
    try {
      await axios.put(`${API_BASE}/toggle`, {
        teacherId,
        subjectId: subject._id,
        available: false,
      });
      setAvailable(false);
      setToggleDialogOpen(false);
    } catch (err) {
      console.error("Error disabling exam:", err.response?.data || err.message);
      alert(`Error disabling exam: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <Box sx={{ p: 5, maxWidth: 1000, mx: "auto" }}>
      {examSaved && (
        <Paper sx={{ p: 2, mb: 4, display: "flex", justifyContent: "space-between" }}>
          <Typography>Total Questions: {questions.length}</Typography>
          <Typography>Available: {available ? "Yes" : "No"}</Typography>
          <IconButton onClick={() => setPreviewOpen(true)} color="primary">
            <PreviewIcon />
          </IconButton>
        </Paper>
      )}
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        sx={{ color: "#1976d2" }}
      >
        Set Exam for {subject?.name?.toUpperCase() || "UNKNOWN SUBJECT"}
      </Typography>

      {/* Add / Edit Question Form */}
      <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Add / Edit Question
        </Typography>
        <TextField
          fullWidth
          label="Question"
          value={currentQuestion.question}
          onChange={(e) => handleQuestionChange(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {currentQuestion.options.map((opt, idx) => (
            <Grid item xs={6} key={idx}>
              <TextField
                fullWidth
                label={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
              />
            </Grid>
          ))}
        </Grid>
        <TextField
          fullWidth
          label="Correct Answer"
          value={currentQuestion.answer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <TextField
              type="number"
              fullWidth
              label="Time (minutes)"
              value={currentQuestion.time}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, time: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              fullWidth
              label="Marks"
              value={currentQuestion.marks}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, marks: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              fullWidth
              label="Attempts"
              value={currentQuestion.attempts}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, attempts: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrUpdateQuestion}
          >
            {editIndex !== null ? "Update Question" : "Add Question"}
          </Button>
        </Box>
      </Paper>

      {/* Questions List */}
      {questions.length > 0 && (
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          {questions.map((q, index) => (
            <Card key={index} sx={{ mb: 2, borderRadius: 2, backgroundColor: "#f0f8ff" }}>
              <CardContent>
                <Typography>
                  <strong>Q{index + 1}:</strong> {q.question}
                </Typography>
                <Typography variant="body2">
                  Options: {q.options.join(", ")}
                </Typography>
                <Typography variant="body2">Answer: {q.answer}</Typography>
                <Typography variant="body2">
                  Time: {q.time} mins | Marks: {q.marks} | Attempts: {q.attempts}
                </Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Button variant="outlined" color="secondary" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="success" onClick={handleSaveExam}>
              Save Exam
            </Button>
            {examSaved && (
              <FormControlLabel
                control={
                  <Switch
                    checked={available}
                    onChange={handleToggleChange}
                    color="primary"
                  />
                }
                label="Available to Students"
              />
            )}
          </Box>
        </Paper>
      )}

      {/* Toggle OFF Confirmation Dialog */}
      <Dialog open={toggleDialogOpen} onClose={() => setToggleDialogOpen(false)}>
        <DialogTitle>
          Once you turn this off, all questions will be removed from the database and scores will be generated.
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setToggleDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmToggleOff} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Exam Preview Modal */}
      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <Box sx={{ p: 4, mx: "auto", mt: 10, width: 600, bgcolor: "white", borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Exam Preview
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {questions.map((q, i) => (
            <Box key={i} sx={{ mb: 2, p: 2, border: "1px solid #1976d2", borderRadius: 2 }}>
              <Typography>
                <strong>Q{i + 1}:</strong> {q.question}
              </Typography>
              <Typography variant="body2">
                Options: {q.options.join(", ")}
              </Typography>
              <Typography variant="body2">Answer: {q.answer}</Typography>
            </Box>
          ))}
        </Box>
      </Modal>
    </Box>
  );
};

export default TeacherSetExam;
