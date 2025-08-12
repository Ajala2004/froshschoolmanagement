 import React, { useEffect } from "react";
import { getTeacherDetails } from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector(
    (state) => state.teacher
  );

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
  }, [dispatch, teacherID]);

  if (error) {
    console.error(error);
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(
      `/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`
    );
  };

  return (
    <Container sx={{ py: 5 }}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress size={40} sx={{ color: "#7f56da" }} />
        </Box>
      ) : (
        <Card
          sx={{
            maxWidth: 500,
            margin: "auto",
            borderRadius: 4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            background: "linear-gradient(145deg, #ffffff, #f8f6ff)",
            p: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: "linear-gradient(90deg, #7f56da, #9b6dff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Teacher Details
            </Typography>

            {/* Teacher Name */}
            <Box display="flex" alignItems="center" mb={2}>
              <SchoolIcon sx={{ color: "#7f56da", mr: 1 }} />
              <Typography variant="h6">
                {teacherDetails?.name || "N/A"}
              </Typography>
            </Box>

            {/* Class Name */}
            <Box display="flex" alignItems="center" mb={2}>
              <ClassIcon sx={{ color: "#9b6dff", mr: 1 }} />
              <Typography variant="h6">
                Class: {teacherDetails?.teachSclass?.sclassName || "N/A"}
              </Typography>
            </Box>

            {/* Subject Info */}
            {isSubjectNamePresent ? (
              <>
                <Box display="flex" alignItems="center" mb={2}>
                  <MenuBookIcon sx={{ color: "#7f56da", mr: 1 }} />
                  <Typography variant="h6">
                    Subject: {teacherDetails?.teachSubject?.subName}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                  <AccessTimeIcon sx={{ color: "#9b6dff", mr: 1 }} />
                  <Typography variant="h6">
                    Sessions: {teacherDetails?.teachSubject?.sessions}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box textAlign="center" mt={3}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(90deg, #7f56da, #9b6dff)",
                    fontWeight: "bold",
                    px: 4,
                  }}
                  onClick={handleAddSubject}
                >
                  Add Subject
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default TeacherDetails;
