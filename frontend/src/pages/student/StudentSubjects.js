import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { 
  Container, Paper, Table, TableBody, TableHead, TableRow, TableCell, 
  Typography, Box, Divider, BottomNavigation, BottomNavigationAction, Button 
} from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const gradeFromScore = (score) => {
  if (score >= 70) return 'A';
  if (score >= 60) return 'B';
  if (score >= 50) return 'C';
  if (score >= 45) return 'D';
  if (score >= 40) return 'E';
  return 'F';
};

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading } = useSelector((state) => state.user);

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState('table');

  // Ref to the report area for PDF capture
  const reportRef = useRef();

  useEffect(() => {
    if (currentUser?._id) dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks.length === 0 && currentUser?.sclassName?._id) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [subjectMarks, dispatch, currentUser]);

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  // Download the report as PDF
  const handleDownloadPdf = () => {
    const input = reportRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2, scrollY: -window.scrollY }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('report-sheet.pdf');
    });
  };

  // Calculate totals & averages for summary
  const totalMarks = subjectMarks.reduce((sum, r) => {
    return sum + (
      (r.firstCA || 0) + (r.secondCA || 0) + (r.thirdCA || 0) + (r.test || 0) + (r.exam || 0)
    );
  }, 0);
  const avgMarks = subjectMarks.length ? (totalMarks / subjectMarks.length).toFixed(2) : 0;

  // Optional remarks based on average
  const remarks = avgMarks >= 70 ? "Excellent" 
                : avgMarks >= 60 ? "Very Good"
                : avgMarks >= 50 ? "Good"
                : avgMarks >= 45 ? "Fair"
                : avgMarks >= 40 ? "Pass"
                : "Fail";

  const renderHeader = () => (
    <Box textAlign="center" mb={3}>
      <Typography variant="h5" fontWeight="bold">Frosh Academy</Typography>
      <Typography variant="subtitle1" mt={0.5}>Official Report Sheet</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" fontSize={14}>
        <Box>
          <Typography><strong>Name:</strong> {userDetails?.fullName || currentUser?.name || "N/A"}</Typography>
          <Typography><strong>Admission No:</strong> {userDetails?.admissionNo || "N/A"}</Typography>
          <Typography><strong>Class:</strong> {sclassDetails?.sclassName || "N/A"}</Typography>
        </Box>
        <Box>
          <Typography><strong>Term:</strong> {userDetails?.term || "First Term"}</Typography>
          <Typography><strong>Session:</strong> {userDetails?.session || "2024/2025"}</Typography>
          <Typography><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderTableSection = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 8 }}>
      {/* Report content to be captured */}
      <div ref={reportRef}>
        {renderHeader()}
        <Table sx={{ mb: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell align="center"><strong>1st CA</strong></TableCell>
              <TableCell align="center"><strong>2nd CA</strong></TableCell>
              <TableCell align="center"><strong>3rd CA</strong></TableCell>
              <TableCell align="center"><strong>Test</strong></TableCell>
              <TableCell align="center"><strong>Exam</strong></TableCell>
              <TableCell align="center"><strong>Total</strong></TableCell>
              <TableCell align="center"><strong>Grade</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectMarks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">No results available.</TableCell>
              </TableRow>
            ) : subjectMarks.map((result, index) => {
              if (!result.subName) return null;
              const firstCA = result.firstCA || 0;
              const secondCA = result.secondCA || 0;
              const thirdCA = result.thirdCA || 0;
              const test = result.test || 0;
              const exam = result.exam || 0;
              const total = firstCA + secondCA + thirdCA + test + exam;
              const grade = gradeFromScore(total);

              return (
                <TableRow key={index}>
                  <TableCell>{result.subName.subName}</TableCell>
                  <TableCell align="center">{firstCA}</TableCell>
                  <TableCell align="center">{secondCA}</TableCell>
                  <TableCell align="center">{thirdCA}</TableCell>
                  <TableCell align="center">{test}</TableCell>
                  <TableCell align="center">{exam}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>{total}</TableCell>
                  <TableCell align="center">{grade}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="space-between" mt={2} px={2}>
          <Typography variant="subtitle1"><strong>Total Marks:</strong> {totalMarks}</Typography>
          <Typography variant="subtitle1"><strong>Average:</strong> {avgMarks}</Typography>
          <Typography variant="subtitle1"><strong>Remarks:</strong> {remarks}</Typography>
        </Box>
      </div>
    </Paper>
  );

  const renderChartSection = () => {
    const chartData = subjectMarks.map((result) => ({
      name: result.subName?.subName || "Unknown",
      total: (result.firstCA || 0) + (result.secondCA || 0) + (result.thirdCA || 0) + (result.test || 0) + (result.exam || 0)
    }));
    return (
      <Box p={3}>
        {renderHeader()}
        <CustomBarChart chartData={chartData} dataKey="total" />
      </Box>
    );
  };

  return (
    <>
      {loading ? (
        <Typography align="center" mt={4}>Loading...</Typography>
      ) : (
        <>
          {subjectMarks && subjectMarks.length > 0
            ? (
              <>
                <Box display="flex" justifyContent="flex-end" mb={2} px={3}>
                  <Button variant="contained" color="primary" onClick={handleDownloadPdf}>
                    Download PDF
                  </Button>
                </Box>

                {selectedSection === 'table' && renderTableSection()}
                {selectedSection === 'chart' && renderChartSection()}

                <Paper 
                  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }} 
                  elevation={3}
                >
                  <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                    <BottomNavigationAction
                      label="Table"
                      value="table"
                      icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                    />
                    <BottomNavigationAction
                      label="Chart"
                      value="chart"
                      icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                    />
                  </BottomNavigation>
                </Paper>
              </>
            )
            : (
              <Container sx={{ mt: 5 }}>
                <Typography variant="h6" align="center">
                  No results to display yet. Please check back later.
                </Typography>
              </Container>
            )}
        </>
      )}
    </>
  );
};

export default StudentSubjects;
