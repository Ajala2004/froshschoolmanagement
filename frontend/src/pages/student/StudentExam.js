import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

// Example subjects with their questions
const subjects = {
  Math: [
    { id: 1, question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: "12" },
    { id: 2, question: "What is 9 x 3?", options: ["27", "21", "24", "29"], answer: "27" },
  ],
  Science: [
    { id: 1, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { id: 2, question: "Water boils at ___ degree Celsius?", options: ["90", "100", "110", "120"], answer: "100" },
  ],
  English: [
    { id: 1, question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Chaucer", "Austen"], answer: "Shakespeare" },
    { id: 2, question: "Choose the correct article: ___ apple a day keeps the doctor away.", options: ["An", "A", "The", "No article"], answer: "An" },
  ],
};

const StudentExam = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [openConfirm, setOpenConfirm] = useState(false);

  const examQuestions = selectedSubject ? subjects[selectedSubject] : [];

  useEffect(() => {
    let timer;
    if (selectedSubject && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && selectedSubject) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [selectedSubject, timeLeft]);

  const handleStartSubject = (subject) => {
    setSelectedSubject(subject);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(300);
  };

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setOpenConfirm(true);
    }
  };

  const handleSubmit = () => {
    setOpenConfirm(false);
    let score = 0;
    examQuestions.forEach((q, index) => {
      if (answers[index] === q.answer) score += 1;
    });
    alert(`✅ ${selectedSubject} Exam Finished!\nYour Score: ${score} / ${examQuestions.length}`);
    setSelectedSubject(null);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const progress = ((currentQuestion + 1) / examQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const blankCount = examQuestions.length - answeredCount;

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      {!selectedSubject ? (
        <Paper sx={{ p: 5, textAlign: 'center', boxShadow: 3, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Choose a Subject
          </Typography>
          <Stack spacing={2} sx={{ mt: 3 }}>
            {Object.keys(subjects).map((subject) => (
              <Button
                key={subject}
                variant="contained"
                size="large"
                onClick={() => handleStartSubject(subject)}
              >
                {subject}
              </Button>
            ))}
          </Stack>
        </Paper>
      ) : (
        <Paper sx={{ p: 5, boxShadow: 3, borderRadius: 3 }}>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" color="textSecondary">
                Time Left: {formatTime(timeLeft)}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Question {currentQuestion + 1} of {examQuestions.length}
              </Typography>
            </Grid>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
          </Stack>

          <Typography variant="h5" sx={{ mt: 3, mb: 3, fontWeight: 500 }}>
            {examQuestions[currentQuestion].question}
          </Typography>

          <Grid container spacing={2}>
            {examQuestions[currentQuestion].options.map((option) => (
              <Grid item xs={6} key={option}>
                <Button
                  fullWidth
                  variant={answers[currentQuestion] === option ? 'contained' : 'outlined'}
                  color={answers[currentQuestion] === option ? 'success' : 'primary'}
                  onClick={() => handleAnswer(option)}
                  sx={{ py: 2, textTransform: 'none', fontSize: 16 }}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Button variant="contained" size="large" onClick={handleNext}>
              {currentQuestion < examQuestions.length - 1 ? 'Next Question' : 'Submit Exam'}
            </Button>
          </Box>
        </Paper>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>
            You have answered {answeredCount} question{answeredCount !== 1 ? 's' : ''}.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            You have {blankCount} question{blankCount !== 1 ? 's' : ''} left blank.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to submit the exam? Once submitted, you cannot change your answers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Yes, Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentExam;
