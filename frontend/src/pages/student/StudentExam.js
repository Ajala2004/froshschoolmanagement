// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   Grid,
//   LinearProgress,
//   Stack,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';

// // Example subjects with their questions
// const subjects = {
//   Math: [
//     { id: 1, question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: "12" },
//     { id: 2, question: "What is 9 x 3?", options: ["27", "21", "24", "29"], answer: "27" },
//   ],
//   Science: [
//     { id: 1, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
//     { id: 2, question: "Water boils at ___ degree Celsius?", options: ["90", "100", "110", "120"], answer: "100" },
//   ],
//   English: [
//     { id: 1, question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Chaucer", "Austen"], answer: "Shakespeare" },
//     { id: 2, question: "Choose the correct article: ___ apple a day keeps the doctor away.", options: ["An", "A", "The", "No article"], answer: "An" },
//   ],
// };

// const StudentExam = () => {
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
//   const [openConfirm, setOpenConfirm] = useState(false);

//   const examQuestions = selectedSubject ? subjects[selectedSubject] : [];

//   useEffect(() => {
//     let timer;
//     if (selectedSubject && timeLeft > 0) {
//       timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//     } else if (timeLeft === 0 && selectedSubject) {
//       handleSubmit();
//     }
//     return () => clearInterval(timer);
//   }, [selectedSubject, timeLeft]);

//   const handleStartSubject = (subject) => {
//     setSelectedSubject(subject);
//     setCurrentQuestion(0);
//     setAnswers({});
//     setTimeLeft(300);
//   };

//   const handleAnswer = (option) => {
//     setAnswers({ ...answers, [currentQuestion]: option });
//   };

//   const handleNext = () => {
//     if (currentQuestion < examQuestions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setOpenConfirm(true);
//     }
//   };

//   const handleSubmit = () => {
//     setOpenConfirm(false);
//     let score = 0;
//     examQuestions.forEach((q, index) => {
//       if (answers[index] === q.answer) score += 1;
//     });
//     alert(`✅ ${selectedSubject} Exam Finished!\nYour Score: ${score} / ${examQuestions.length}`);
//     setSelectedSubject(null);
//   };

//   const formatTime = (seconds) => {
//     const min = Math.floor(seconds / 60);
//     const sec = seconds % 60;
//     return `${min}:${sec < 10 ? '0' : ''}${sec}`;
//   };

//   const progress = ((currentQuestion + 1) / examQuestions.length) * 100;
//   const answeredCount = Object.keys(answers).length;
//   const blankCount = examQuestions.length - answeredCount;

//   return (
//     <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
//       {!selectedSubject ? (
//         <Paper sx={{ p: 5, textAlign: 'center', boxShadow: 3, borderRadius: 3 }}>
//           <Typography variant="h4" gutterBottom fontWeight="bold">
//             Choose a Subject
//           </Typography>
//           <Stack spacing={2} sx={{ mt: 3 }}>
//             {Object.keys(subjects).map((subject) => (
//               <Button
//                 key={subject}
//                 variant="contained"
//                 size="large"
//                 onClick={() => handleStartSubject(subject)}
//               >
//                 {subject}
//               </Button>
//             ))}
//           </Stack>
//         </Paper>
//       ) : (
//         <Paper sx={{ p: 5, boxShadow: 3, borderRadius: 3 }}>
//           <Stack spacing={2} sx={{ mb: 2 }}>
//             <Grid container justifyContent="space-between" alignItems="center">
//               <Typography variant="subtitle1" color="textSecondary">
//                 Time Left: {formatTime(timeLeft)}
//               </Typography>
//               <Typography variant="subtitle1" color="textSecondary">
//                 Question {currentQuestion + 1} of {examQuestions.length}
//               </Typography>
//             </Grid>
//             <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
//           </Stack>

//           <Typography variant="h5" sx={{ mt: 3, mb: 3, fontWeight: 500 }}>
//             {examQuestions[currentQuestion].question}
//           </Typography>

//           <Grid container spacing={2}>
//             {examQuestions[currentQuestion].options.map((option) => (
//               <Grid item xs={6} key={option}>
//                 <Button
//                   fullWidth
//                   variant={answers[currentQuestion] === option ? 'contained' : 'outlined'}
//                   color={answers[currentQuestion] === option ? 'success' : 'primary'}
//                   onClick={() => handleAnswer(option)}
//                   sx={{ py: 2, textTransform: 'none', fontSize: 16 }}
//                 >
//                   {option}
//                 </Button>
//               </Grid>
//             ))}
//           </Grid>

//           <Box sx={{ mt: 4, textAlign: 'right' }}>
//             <Button variant="contained" size="large" onClick={handleNext}>
//               {currentQuestion < examQuestions.length - 1 ? 'Next Question' : 'Submit Exam'}
//             </Button>
//           </Box>
//         </Paper>
//       )}

//       {/* Confirmation Dialog */}
//       <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
//         <DialogTitle>Confirm Submission</DialogTitle>
//         <DialogContent>
//           <Typography>
//             You have answered {answeredCount} question{answeredCount !== 1 ? 's' : ''}.
//           </Typography>
//           <Typography sx={{ mt: 1 }}>
//             You have {blankCount} question{blankCount !== 1 ? 's' : ''} left blank.
//           </Typography>
//           <Typography sx={{ mt: 2 }}>
//             Are you sure you want to submit the exam? Once submitted, you cannot change your answers.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenConfirm(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Yes, Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default StudentExam;
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios"; // or import axios from "axios" and use full URL
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSelector } from 'react-redux';
/**
 * Props:
 *   - studentId (string)  <-- pass currentUser._id from your Redux store
 */
const BASE_URL = process.env.REACT_APP_BASE_URL;
 
const StudentExam = ({ studentId }) => {
  const { currentUser, response, error } = useSelector((state) => state.user);
 const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch AVAILABLE exams for this student
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/student/${studentId}/exams`);
        setExams(data.exams || []);
      } catch (e) {
        console.error("Error fetching exams:", e);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) fetchExams();
  }, [studentId]);

  const questions = selectedExam?.questions || [];

  // Calculate total time (sum of per-question minutes)
  const totalSeconds = useMemo(() => {
    if (!selectedExam) return 0;
    const minutes = questions.reduce((sum, q) => sum + (q.time || 5), 0);
    return minutes * 60;
  }, [selectedExam, questions]);

  // Start timer when exam starts
  useEffect(() => {
    if (!selectedExam) return;
    setTimeLeft(totalSeconds);
  }, [selectedExam, totalSeconds]);

  // Timer tick
  useEffect(() => {
    if (!selectedExam || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [selectedExam, timeLeft]);

  // Auto submit at 0
  useEffect(() => {
    if (selectedExam && timeLeft === 0) {
      handleSubmit();
    }
  }, [selectedExam, timeLeft]); // eslint-disable-line

  const handleStart = (exam) => {
    setSelectedExam(exam);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((c) => c + 1);
    } else {
      setOpenConfirm(true);
    }
  };

  const handleSubmit = async () => {
    if (!selectedExam) return;
    setOpenConfirm(false);
    setSubmitting(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/student/${studentId}/exam/${selectedExam._id}/submit`,
        { answers }
      );
      alert(
        `✅ ${selectedExam.subject?.subName || "Exam"} submitted!\n` +
        `Raw: ${data.rawScore}/${data.totalMarks}\n` +
        `Saved (scaled to 70): ${data.scaledTo70}`
      );
    } catch (e) {
      console.error("Submit error:", e);
      alert("Failed to submit exam. Please try again.");
    } finally {
      setSubmitting(false);
      setSelectedExam(null);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

  const progress =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const answeredCount = Object.keys(answers).length;
  const blankCount = Math.max(0, (questions.length || 0) - answeredCount);

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      {/* List of available exams */}
      {!selectedExam ? (
        <Paper sx={{ p: 5, boxShadow: 3, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {loading ? "Loading Exams..." : "Available Exams"}
          </Typography>

          {loading ? null : exams.length === 0 ? (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              No exams are available right now.
            </Typography>
          ) : (
            <Stack spacing={2} sx={{ mt: 3 }}>
              {exams.map((exam) => (
                <Button
                  key={exam._id}
                  variant="contained"
                  size="large"
                  onClick={() => handleStart(exam)}
                >
                  {exam.subject?.subName || "Subject"} — {exam.questions.length} Question(s)
                </Button>
              ))}
            </Stack>
          )}
        </Paper>
      ) : (
        <Paper sx={{ p: 5, boxShadow: 3, borderRadius: 3 }}>
          {/* Header */}
          <Stack spacing={2} sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" color="text.secondary">
                Time Left: {formatTime(timeLeft)}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedExam.subject?.subName} • Question {currentQuestion + 1} of {questions.length}
              </Typography>
            </Grid>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
          </Stack>

          {/* Question */}
          <Typography variant="h5" sx={{ mt: 3, mb: 3, fontWeight: 500 }}>
            {questions[currentQuestion]?.question}
          </Typography>

          {/* Options */}
          <Grid container spacing={2}>
            {questions[currentQuestion]?.options?.map((opt, i) => (
              <Grid item xs={12} sm={6} key={`${opt}-${i}`}>
                <Button
                  fullWidth
                  variant={answers[currentQuestion] === opt ? "contained" : "outlined"}
                  color={answers[currentQuestion] === opt ? "success" : "primary"}
                  onClick={() => handleAnswer(opt)}
                  sx={{ py: 2, textTransform: "none", fontSize: 16 }}
                >
                  {opt}
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* Next / Submit */}
          <Box sx={{ mt: 4, textAlign: "right" }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleNext}
              disabled={submitting}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Submit Exam"}
            </Button>
          </Box>
        </Paper>
      )}

      {/* Confirm Submit */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>You have answered {answeredCount} question{answeredCount !== 1 ? "s" : ""}.</Typography>
          <Typography sx={{ mt: 1 }}>
            You have {blankCount} question{blankCount !== 1 ? "s" : ""} left blank.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to submit the exam?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={submitting}>
            Yes, Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentExam;

