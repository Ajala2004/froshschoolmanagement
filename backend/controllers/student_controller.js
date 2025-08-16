const bcrypt = require("bcryptjs");
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
// const studentRegister = async (req, res) => {
//     try {
//         const { rollNum, sclassName, password, ...rest } = req.body;

//         // Check if student already exists
//         const existingStudent = await Student.findOne({
//             rollNum,
//             school: req.body.adminID,
//             sclassName
//         });

//         if (existingStudent) {
//             return res.status(409).json({ message: 'Roll Number already exists' });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPass = await bcrypt.hash(password, salt);

//         // Create new student
//         const student = new Student({
//             ...rest,
//             rollNum,
//             sclassName,
//             school: req.body.adminID,
//             password: hashedPass
//         });

//         const savedStudent = await student.save();

//         // Respond without sensitive data
//         const { password: _, ...studentData } = savedStudent.toObject();
//         res.status(201).json(studentData);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

const getNextRollNumber = async (req, res) => {
  try {
    const { adminID } = req.params;
    const lastStudent = await Student.find({ school: adminID })
      .sort({ createdAt: -1 })
      .limit(1);

    let nextRollNumber = "FROSH/001";
    if (lastStudent.length > 0 && lastStudent[0].rollNum) {
      const lastRoll = lastStudent[0].rollNum.split('/')[1]; 
      const nextNum = String(Number(lastRoll) + 1).padStart(3, '0');
      nextRollNumber = `FROSH/${nextNum}`;
    }

    res.status(200).json({ nextRoll: nextRollNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST register student
const studentRegister = async (req, res) => {
  try {
    const { sclassName, password, ...rest } = req.body;

    const lastStudent = await Student.find({ school: req.body.adminID })
      .sort({ createdAt: -1 })
      .limit(1);

    let nextRollNumber = "FROSH/001";
    if (lastStudent.length > 0 && lastStudent[0].rollNum) {
      const lastRoll = lastStudent[0].rollNum.split('/')[1];
      const nextNum = String(Number(lastRoll) + 1).padStart(3, '0');
      nextRollNumber = `FROSH/${nextNum}`;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const student = new Student({
      ...rest,
      rollNum: nextRollNumber,
      sclassName,
      school: req.body.adminID,
      password: hashedPass
    });

    const savedStudent = await student.save();
    const { password: _, ...studentData } = savedStudent.toObject();
    res.status(201).json(studentData);

  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      res.status(409).json({ message: "Duplicate student detected" });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

const studentLogIn = async (req, res) => {
    try {
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
        if (student) {
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                student = await student.populate("school", "schoolName")
                student = await student.populate("sclassName", "sclassName")
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                res.send(student);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudents = async (req, res) => {
    try {
        let students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName");
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudentDetail = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id)
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate("examResult.subName", "subName")
            .populate("attendance.subName", "subName sessions");
        if (student) {
            student.password = undefined;
            res.send(student);
        }
        else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const updateStudent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            res.body.password = await bcrypt.hash(res.body.password, salt)
        }
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

// const updateExamResult = async (req, res) => {
//     const { subName, marksObtained } = req.body;

//     try {
//         const student = await Student.findById(req.params.id);

//         if (!student) {
//             return res.send({ message: 'Student not found' });
//         }

//         const existingResult = student.examResult.find(
//             (result) => result.subName.toString() === subName
//         );

//         if (existingResult) {
//             existingResult.marksObtained = marksObtained;
//         } else {
//             student.examResult.push({ subName, marksObtained });
//         }

//         const result = await student.save();
//         return res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };
// const updateExamResult = async (req, res) => {
//     const { subName, firstCA, secondCA, thirdCA, test, exam } = req.body;

//     // Validate scores
//     if (firstCA > 10 || secondCA > 10 || thirdCA > 10 || test > 10 || exam > 70) {
//         return res.status(400).json({ message: "Marks exceed allowed limits" });
//     }

//     try {
//         const student = await Student.findById(req.params.id);

//         if (!student) {
//             return res.send({ message: 'Student not found' });
//         }

//         const existingResult = student.examResult.find(
//             (result) => result.subName.toString() === subName
//         );

//         if (existingResult) {
//             existingResult.firstCA = firstCA;
//             existingResult.secondCA = secondCA;
//             existingResult.thirdCA = thirdCA;
//             existingResult.test = test;
//             existingResult.exam = exam;
//         } else {
//             student.examResult.push({ subName, firstCA, secondCA, thirdCA, test, exam });
//         }

//         const result = await student.save();
//         return res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };
const updateExamResult = async (req, res) => {
    const { subName, firstCA, secondCA, thirdCA, test, exam } = req.body;

    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const existingResultIndex = student.examResult.findIndex(
            (result) => result.subName.toString() === subName
        );

        if (existingResultIndex !== -1) {
            // update existing
            student.examResult[existingResultIndex] = {
                ...student.examResult[existingResultIndex]._doc,
                firstCA,
                secondCA,
                thirdCA,
                test,
                exam,
            };
        } else {
            // push new
            student.examResult.push({ subName, firstCA, secondCA, thirdCA, test, exam });
        }

        // ✅ tell mongoose to skip re-validating required fields that already exist
        const result = await student.save({ validateModifiedOnly: true });

        res.status(200).json({ message: "Marks updated successfully", result });
    } catch (error) {
        console.error("Error updating exam result:", error);
        res.status(500).json({ message: "Error updating marks", error: error.message });
    }
};



// const studentAttendance = async (req, res) => {
//     const { subName, status, date } = req.body;
 
//     try {
//         const student = await Student.findById(req.params.id);

//         if (!student) {
//             return res.send({ message: 'Student not found' });
//         }

//         const subject = await Subject.findById(subName);

//         const existingAttendance = student.attendance.find(
//             (a) =>
//                 a.date.toDateString() === new Date(date).toDateString() &&
//                 a.subName.toString() === subName
//         );

//         if (existingAttendance) {
//             existingAttendance.status = status;
//         } else {
//             // Check if the student has already attended the maximum number of sessions
//             const attendedSessions = student.attendance.filter(
//                 (a) => a.subName.toString() === subName
//             ).length;

//             if (attendedSessions >= subject.sessions) {
//                 return res.send({ message: 'Maximum attendance limit reached' });
//             }

//             student.attendance.push({ date, status, subName });
//         }

//         const result = await student.save();
//         return res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };
const studentAttendance = async (req, res) => {
    const { status, date, teacherId } = req.body; // <-- teacherId from frontend

    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const teacher = await Teacher.findById(teacherId).populate('teachSubject');
        if (!teacher || !teacher.teachSubject) {
            return res.status(404).json({ message: 'Teacher or subject not found' });
        }

        const subjectId = teacher.teachSubject._id;

        const existingAttendance = student.attendance.find(
            (a) =>
                new Date(a.date).toDateString() === new Date(date).toDateString() &&
                a.subName.toString() === subjectId.toString()
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subjectId.toString()
            ).length;

            const maxSessions = teacher.teachSubject.sessions || Infinity;

            if (attendedSessions >= maxSessions) {
                return res.status(400).json({ message: 'Maximum attendance limit reached' });
            }

            student.attendance.push({
                date: new Date(date),
                status,
                subName: subjectId
            });
        }

        const result = await student.save({ validateModifiedOnly: true });
        res.status(200).json({ message: 'Attendance updated successfully', result });

    } catch (error) {
        console.error("Error updating attendance:", error);
        res.status(500).json({ message: 'Error updating attendance', error: error.message });
    }
};

const clearAllStudentsAttendanceBySubject = async (req, res) => {
    const subName = req.params.id;

    try {
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const clearAllStudentsAttendance = async (req, res) => {
    const schoolId = req.params.id

    try {
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    const subName = req.body.subId

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    getNextRollNumber,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
};