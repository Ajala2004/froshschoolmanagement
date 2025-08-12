 import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getClassDetails,
  getClassStudents,
  getSubjectList,
} from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import {
  Box,
  Container,
  Typography,
  Tab,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import {
  BlueButton,
  GreenButton,
  PurpleButton,
} from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ClassIcon from "@mui/icons-material/Class";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";

const ClassDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    subjectsList,
    sclassStudents,
    sclassDetails,
    loading,
    error,
    response,
    getresponse,
  } = useSelector((state) => state.sclass);

  const classID = params.id;

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) console.error(error);

  const [value, setValue] = useState("1");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, delete function is disabled for now.");
    setShowPopup(true);
  };

  /** ---------- SUBJECTS TABLE ---------- **/
  const subjectColumns = [
    { id: "name", label: "Subject Name", minWidth: 170 },
    { id: "code", label: "Subject Code", minWidth: 100 },
  ];
  const subjectRows =
    subjectsList?.map((subject) => ({
      name: subject.subName,
      code: subject.subCode,
      id: subject._id,
    })) || [];

  const SubjectsButtonHaver = ({ row }) => (
    <>
      <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
        <DeleteIcon color="error" />
      </IconButton>
      <BlueButton
        variant="contained"
        onClick={() =>
          navigate(`/Admin/class/subject/${classID}/${row.id}`)
        }
      >
        View
      </BlueButton>
    </>
  );

  /** ---------- STUDENTS TABLE + GRID ---------- **/
  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ];
  const studentRows =
    sclassStudents?.map((student) => ({
      name: student.name,
      rollNum: student.rollNum,
      id: student._id,
    })) || [];

  const StudentsButtonHaver = ({ row }) => (
    <>
      <IconButton onClick={() => deleteHandler(row.id, "Student")}>
        <PersonRemoveIcon color="error" />
      </IconButton>
      <BlueButton
        variant="contained"
        onClick={() => navigate(`/Admin/students/student/${row.id}`)}
      >
        View
      </BlueButton>
      <PurpleButton
        variant="contained"
        onClick={() =>
          navigate(`/Admin/students/student/attendance/${row.id}`)
        }
      >
        Attendance
      </PurpleButton>
    </>
  );

  /** ---------- SECTIONS ---------- **/
  const ClassDetailsSection = () => {
    const numberOfSubjects = subjectsList.length;
    const numberOfStudents = sclassStudents.length;

    return (
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          p: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: "linear-gradient(90deg, #7f56da, #9b6dff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Class Details
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <ClassIcon color="primary" />
            <Typography variant="h6">
              Class: {sclassDetails?.sclassName || "N/A"}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <MenuBookIcon color="secondary" />
            <Typography variant="h6">
              Subjects: {numberOfSubjects}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <PeopleIcon sx={{ color: "#9b6dff" }} />
            <Typography variant="h6">
              Students: {numberOfStudents}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    );
  };

  const ClassSubjectsSection = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Subjects List
      </Typography>
      <TableTemplate
        buttonHaver={SubjectsButtonHaver}
        columns={subjectColumns}
        rows={subjectRows}
      />
    </>
  );

  const ClassStudentsSection = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Students List
      </Typography>

      {/* Student Cards Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
        gap={2}
        mb={4}
      >
        {sclassStudents.map((student) => (
          <Card
            key={student._id}
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              p: 2,
              textAlign: "center",
              background: "#fff",
            }}
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                margin: "0 auto",
                background: "linear-gradient(90deg, #7f56da, #9b6dff)",
              }}
            >
              {student.name.charAt(0)}
            </Avatar>
            <Typography variant="subtitle1" mt={1} fontWeight="bold">
              {student.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Roll No: {student.rollNum}
            </Typography>
            <Box mt={2}>
              <BlueButton
                variant="contained"
                size="small"
                onClick={() =>
                  navigate(`/Admin/students/student/${student._id}`)
                }
              >
                View
              </BlueButton>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Original Table View */}
      <TableTemplate
        buttonHaver={StudentsButtonHaver}
        columns={studentColumns}
        rows={studentRows}
      />
    </>
  );

  return (
    <>
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
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <TabList onChange={handleChange}>
                <Tab label="Details" value="1" />
                <Tab label="Subjects" value="2" />
                <Tab label="Students" value="3" />
              </TabList>
            </Box>
            <Container sx={{ mt: 3 }}>
              <TabPanel value="1">
                <ClassDetailsSection />
              </TabPanel>
              <TabPanel value="2">
                <ClassSubjectsSection />
              </TabPanel>
              <TabPanel value="3">
                <ClassStudentsSection />
              </TabPanel>
            </Container>
          </TabContext>
        </Box>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ClassDetails;
