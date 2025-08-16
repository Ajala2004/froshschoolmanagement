//  import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
//   Fade,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { loginUser } from "../redux/userRelated/userHandle";
// import Popup from "../components/Popup";
// import styled from "styled-components";
// import bgIllustration from "../assets/students.svg"; // ensure the file exists

// const LoginPage = ({ role }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { status, currentUser, response, currentRole } = useSelector(
//     (state) => state.user
//   );

//   const [toggle, setToggle] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const newErrors = {};

//     if (role === "Student") {
//       const rollNum = formData.get("rollNumber")?.trim();
//       const studentName = formData.get("studentName")?.trim();
//       const password = formData.get("password")?.trim();

//       if (!rollNum) newErrors.rollNumber = true;
//       if (!studentName) newErrors.studentName = true;
//       if (!password) newErrors.password = true;

//       if (Object.keys(newErrors).length) return setErrors(newErrors);

//       setLoader(true);
//       dispatch(loginUser({ rollNum, studentName, password }, role));
//     } else {
//       const email = formData.get("email")?.trim();
//       const password = formData.get("password")?.trim();

//       if (!email) newErrors.email = true;
//       if (!password) newErrors.password = true;

//       if (Object.keys(newErrors).length) return setErrors(newErrors);

//       setLoader(true);
//       dispatch(loginUser({ email, password }, role));
//     }
//   };

//   useEffect(() => {
//     if (status === "success" && currentUser && currentRole) {
//       navigate(`/${currentRole}/dashboard`);
//     } else if (status === "failed") {
//       setMessage(response || "Login failed");
//       setShowPopup(true);
//       setLoader(false);
//     } else if (status === "error") {
//       setMessage("Network Error");
//       setShowPopup(true);
//       setLoader(false);
//     }
//   }, [status, currentUser, currentRole, navigate, response]);

//   return (
//     <Wrapper>
//       <Illustration src={bgIllustration} alt="Learning illustration" />
//       <Card component="form" onSubmit={handleSubmit}>
//         <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
//           {role} Login
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#555", mb: 3 }}>
//           Let’s get you back to learning
//         </Typography>

//         {role === "Student" ? (
//           <>
//             <TextField
//               name="rollNumber"
//               label="Roll Number"
//               fullWidth
//               error={errors.rollNumber}
//               helperText={errors.rollNumber && "Required"}
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               name="studentName"
//               label="Full Name"
//               fullWidth
//               error={errors.studentName}
//               helperText={errors.studentName && "Required"}
//               sx={{ mb: 2 }}
//             />
//           </>
//         ) : (
//           <TextField
//             name="email"
//             label="Email"
//             fullWidth
//             error={errors.email}
//             helperText={errors.email && "Required"}
//             sx={{ mb: 2 }}
//           />
//         )}

//         <TextField
//           name="password"
//           label="Password"
//           type={toggle ? "text" : "password"}
//           fullWidth
//           error={errors.password}
//           helperText={errors.password && "Required"}
//           sx={{ mb: 3 }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setToggle(!toggle)}>
//                   {toggle ? <Visibility /> : <VisibilityOff />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Button
//           variant="contained"
//           type="submit"
//           fullWidth
//           sx={{
//             background: "linear-gradient(90deg, #7f56da, #9b6dff)",
//             mb: 2,
//             py: 1.2,
//             fontWeight: "bold",
//           }}
//         >
//           {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
//         </Button>

//         {role === "Admin" && (
//           <Typography variant="body2" sx={{ mt: 3 }}>
//             No account?{" "}
//             <Link
//               to="/Adminregister"
//               style={{ color: "#7f56da", fontWeight: 500 }}
//             >
//               Contact School Management
//             </Link>
//           </Typography>
//         )}
//       </Card>

//       {showPopup && (
//         <Fade in={showPopup} mountOnEnter unmountOnExit>
//           <div>
//             <Popup
//               message={message}
//               setShowPopup={setShowPopup}
//               showPopup={showPopup}
//             />
//           </div>
//         </Fade>
//       )}
//     </Wrapper>
//   );
// };

// export default LoginPage;

// // Styled Components
// const Wrapper = styled(Box)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(135deg, #f3f0ff 0%, #ffffff 100%);
//   min-height: 100vh;
//   padding: 1rem;
//   position: relative;
// `;

// const Illustration = styled("img")`
//   position: absolute;
//   left: 5%;
//   bottom: 5%;
//   width: 250px;
//   opacity: 0.15;
// `;

// const Card = styled(Box)`
//   background: white;
//   border-radius: 20px;
//   padding: 2rem;
//   max-width: 380px;
//   width: 100%;
//   box-shadow: 0 8px 25px rgba(127, 86, 218, 0.15);
//   text-align: center;
// `;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
  Fade,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";
import styled from "styled-components";
import bgIllustration from "../assets/students.svg"; // ensure the file exists

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors = {};

    if (role === "Student") {
      let rollNum = formData.get("rollNumber")?.trim();
      let studentName = formData.get("studentName")?.trim();
      const password = formData.get("password")?.trim();

      if (!rollNum) newErrors.rollNumber = true;
      if (!studentName) newErrors.studentName = true;
      if (!password) newErrors.password = true;

      if (Object.keys(newErrors).length) return setErrors(newErrors);

      // ✅ Convert values to uppercase
      rollNum = rollNum.toUpperCase();
      studentName = studentName.toUpperCase();

      setLoader(true);
      dispatch(loginUser({ rollNum, studentName, password }, role));
    } else {
      const email = formData.get("email")?.trim();
      const password = formData.get("password")?.trim();

      if (!email) newErrors.email = true;
      if (!password) newErrors.password = true;

      if (Object.keys(newErrors).length) return setErrors(newErrors);

      setLoader(true);
      dispatch(loginUser({ email, password }, role));
    }
  };

  useEffect(() => {
    if (status === "success" && currentUser && currentRole) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === "failed") {
      setMessage(response || "Login failed");
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, currentUser, currentRole, navigate, response]);

  return (
    <Wrapper>
      <Illustration src={bgIllustration} alt="Learning illustration" />
      <Card component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          {role} Login
        </Typography>
        <Typography variant="body2" sx={{ color: "#555", mb: 3 }}>
          Let’s get you back to learning
        </Typography>

        {role === "Student" ? (
          <>
            <TextField
              name="rollNumber"
              label="Roll Number"
              fullWidth
              error={errors.rollNumber}
              helperText={errors.rollNumber && "Required"}
              sx={{ mb: 2 }}
            />
            <TextField
              name="studentName"
              label="Full Name"
              fullWidth
              error={errors.studentName}
              helperText={errors.studentName && "Required"}
              sx={{ mb: 2 }}
              inputProps={{ style: { textTransform: "uppercase" } }} // 👀 shows uppercase as user types
            />
          </>
        ) : (
          <TextField
            name="email"
            label="Email"
            fullWidth
            error={errors.email}
            helperText={errors.email && "Required"}
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          name="password"
          label="Password"
          type={toggle ? "text" : "password"}
          fullWidth
          error={errors.password}
          helperText={errors.password && "Required"}
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setToggle(!toggle)}>
                  {toggle ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            background: "linear-gradient(90deg, #7f56da, #9b6dff)",
            mb: 2,
            py: 1.2,
            fontWeight: "bold",
          }}
        >
          {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        {role === "Admin" && (
          <Typography variant="body2" sx={{ mt: 3 }}>
            No account?{" "}
            <Link
              to="/Adminregister"
              style={{ color: "#7f56da", fontWeight: 500 }}
            >
              Contact School Management
            </Link>
          </Typography>
        )}
      </Card>

      {showPopup && (
        <Fade in={showPopup} mountOnEnter unmountOnExit>
          <div>
            <Popup
              message={message}
              setShowPopup={setShowPopup}
              showPopup={showPopup}
            />
          </div>
        </Fade>
      )}
    </Wrapper>
  );
};

export default LoginPage;

// Styled Components
const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f3f0ff 0%, #ffffff 100%);
  min-height: 100vh;
  padding: 1rem;
  position: relative;
`;

const Illustration = styled("img")`
  position: absolute;
  left: 5%;
  bottom: 5%;
  width: 250px;
  opacity: 0.15;
`;

const Card = styled(Box)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 380px;
  width: 100%;
  box-shadow: 0 8px 25px rgba(127, 86, 218, 0.15);
  text-align: center;
`;
