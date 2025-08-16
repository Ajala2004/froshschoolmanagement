// // import React, { useState } from "react";
// // import axios from "axios";
// // import {
// //   Box,
// //   Button,
// //   Card,
// //   CardContent,
// //   Typography,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   TextField,
// //   Alert,
// //   CircularProgress
// // } from "@mui/material";
// // import SendIcon from "@mui/icons-material/Send";
// // import EmailIcon from "@mui/icons-material/Email";

// // export default function AdminEmailSender() {
// //   const [category, setCategory] = useState("parents");
// //   const [title, setTitle] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [customEmails, setCustomEmails] = useState("");
// //   const [feedback, setFeedback] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const sendEmail = async () => {
// //     setLoading(true);
// //     setFeedback("");

// //     try {
// //       let recipients = [];

// //       if (category === "parents") {
// //         const res = await axios.get("http://localhost:5000/students/emails");
// //         recipients = res.data;
// //       } else if (category === "teachers") {
// //         const res = await axios.get("http://localhost:5000/teachers/emails");
// //         recipients = res.data;
// //       } else if (category === "custom") {
// //         recipients = customEmails
// //           .split(",")
// //           .map(e => e.trim())
// //           .filter(Boolean);
// //       }

// //       await axios.post("http://localhost:5000/send", {
// //         recipients,
// //         subject: title || "Frosh Academy",
// //         message,
// //         ctaText: "View Details",
// //         ctaUrl: "https://froshschoolmanagement.onrender.com"
// //       });

// //       setFeedback("✅ Email sent successfully!");
// //     } catch (err) {
// //       console.error("FULL ERROR:", err.response ? err.response.data : err.message);
// //       setFeedback(err.response?.data?.error || "❌ Failed to send email");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
// //       <Card sx={{ width: "100%", maxWidth: 700, boxShadow: 4, borderRadius: 3 }}>
// //         <CardContent>
// //           <Box display="flex" alignItems="center" gap={1} mb={2}>
// //             <EmailIcon color="primary" fontSize="large" />
// //             <Typography variant="h5" fontWeight="bold">
// //               Frosh Academy Email Sender
// //             </Typography>
// //           </Box>

// //           <FormControl fullWidth sx={{ mb: 3 }}>
// //             <InputLabel>Recipient Category</InputLabel>
// //             <Select value={category} onChange={e => setCategory(e.target.value)}>
// //               <MenuItem value="parents">Parents</MenuItem>
// //               <MenuItem value="teachers">Teachers</MenuItem>
// //               <MenuItem value="custom">Custom</MenuItem>
// //             </Select>
// //           </FormControl>

// //           {category === "custom" && (
// //             <TextField
// //               label="Custom Emails (comma separated)"
// //               value={customEmails}
// //               onChange={e => setCustomEmails(e.target.value)}
// //               fullWidth
// //               sx={{ mb: 3 }}
// //             />
// //           )}

// //           <TextField
// //             label="Email Subject"
// //             value={title}
// //             onChange={e => setTitle(e.target.value)}
// //             fullWidth
// //             sx={{ mb: 3 }}
// //           />

// //           <TextField
// //             label="Email Message"
// //             value={message}
// //             onChange={e => setMessage(e.target.value)}
// //             fullWidth
// //             multiline
// //             rows={6}
// //             sx={{ mb: 3 }}
// //           />

// //           <Button
// //             variant="contained"
// //             fullWidth
// //             startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
// //             onClick={sendEmail}
// //             disabled={loading}
// //             sx={{ py: 1.5, fontSize: "16px" }}
// //           >
// //             {loading ? "Sending..." : "Send Email"}
// //           </Button>

// //           {feedback && (
// //             <Alert
// //               severity={feedback.includes("✅") ? "success" : "error"}
// //               sx={{ mt: 3 }}
// //             >
// //               {feedback}
// //             </Alert>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </Box>
// //   );
// // }
// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Alert,
//   CircularProgress
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import EmailIcon from "@mui/icons-material/Email";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// export default function AdminEmailSender() {
//   const [category, setCategory] = useState("parents");
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [customEmails, setCustomEmails] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendEmail = async () => {
//     setLoading(true);
//     setFeedback("");

//     try {
//       let recipients = [];

//       if (category === "parents") {
//         const res = await axios.get(`${BASE_URL}/students/emails`);
//         recipients = res.data;
//       } else if (category === "teachers") {
//         const res = await axios.get(`${BASE_URL}/teachers/emails`);
//         recipients = res.data;
//       } else if (category === "custom") {
//         recipients = customEmails
//           .split(",")
//           .map(e => e.trim())
//           .filter(Boolean);
//       }

//       await axios.post(`${BASE_URL}/send`, {
//         recipients,
//         subject: title || "Frosh Academy",
//         message,
//         ctaText: "View Details",
//         ctaUrl: "https://froshschoolmanagement.onrender.com"
//       });

//       setFeedback("✅ Email sent successfully!");
//     } catch (err) {
//       console.error("FULL ERROR:", err.response ? err.response.data : err.message);
//       setFeedback(err.response?.data?.error || "❌ Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//       <Card sx={{ width: "100%", maxWidth: 700, boxShadow: 4, borderRadius: 3 }}>
//         <CardContent>
//           <Box display="flex" alignItems="center" gap={1} mb={2}>
//             <EmailIcon color="primary" fontSize="large" />
//             <Typography variant="h5" fontWeight="bold">
//               Frosh Academy Email Sender
//             </Typography>
//           </Box>

//           <FormControl fullWidth sx={{ mb: 3 }}>
//             <InputLabel>Recipient Category</InputLabel>
//             <Select value={category} onChange={e => setCategory(e.target.value)}>
//               <MenuItem value="parents">Parents</MenuItem>
//               <MenuItem value="teachers">Teachers</MenuItem>
//               <MenuItem value="custom">Custom</MenuItem>
//             </Select>
//           </FormControl>

//           {category === "custom" && (
//             <TextField
//               label="Custom Emails (comma separated)"
//               value={customEmails}
//               onChange={e => setCustomEmails(e.target.value)}
//               fullWidth
//               sx={{ mb: 3 }}
//             />
//           )}

//           <TextField
//             label="Email Subject"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             fullWidth
//             sx={{ mb: 3 }}
//           />

//           <TextField
//             label="Email Message"
//             value={message}
//             onChange={e => setMessage(e.target.value)}
//             fullWidth
//             multiline
//             rows={6}
//             sx={{ mb: 3 }}
//           />

//           <Button
//             variant="contained"
//             fullWidth
//             startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
//             onClick={sendEmail}
//             disabled={loading}
//             sx={{ py: 1.5, fontSize: "16px" }}
//           >
//             {loading ? "Sending..." : "Send Email"}
//           </Button>

//           {feedback && (
//             <Alert
//               severity={feedback.includes("✅") ? "success" : "error"}
//               sx={{ mt: 3 }}
//             >
//               {feedback}
//             </Alert>
//           )}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
 import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  CircularProgress
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function AdminEmailSender() {
  const [category, setCategory] = useState("parents");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [customEmails, setCustomEmails] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    setLoading(true);
    setFeedback("");

    try {
      // prepare request body
      const payload = {
        mode: category, // backend expects this
        subject: title || "Frosh Academy",
        message,
        ctaText: "View Details",
        ctaUrl: "https://froshschoolmanagement.vercel.app/"
      };

      // add recipients only if custom
      if (category === "custom") {
        payload.recipients = customEmails
          .split(",")
          .map(e => e.trim())
          .filter(Boolean);
      }

      await axios.post(`${BASE_URL}/send`, payload);

      setFeedback("✅ Email sent successfully!");
    } catch (err) {
      console.error("FULL ERROR:", err.response ? err.response.data : err.message);
      setFeedback(err.response?.data?.error || "❌ Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ width: "100%", maxWidth: 700, boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <EmailIcon color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight="bold">
              Frosh Academy Email Sender
            </Typography>
          </Box>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Recipient Category</InputLabel>
            <Select value={category} onChange={e => setCategory(e.target.value)}>
              <MenuItem value="parents">Parents</MenuItem>
              <MenuItem value="students">Students</MenuItem>
              <MenuItem value="teachers">Teachers</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>

          {category === "custom" && (
            <TextField
              label="Custom Emails (comma separated)"
              value={customEmails}
              onChange={e => setCustomEmails(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />
          )}

          <TextField
            label="Email Subject"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            label="Email Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={6}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            onClick={sendEmail}
            disabled={loading}
            sx={{ py: 1.5, fontSize: "16px" }}
          >
            {loading ? "Sending..." : "Send Email"}
          </Button>

          {feedback && (
            <Alert
              severity={feedback.includes("✅") ? "success" : "error"}
              sx={{ mt: 3 }}
            >
              {feedback}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
