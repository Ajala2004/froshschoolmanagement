//  const Exam = require("../models/exam");
// const Teacher = require('../models/teacherSchema');

// exports.createOrUpdateExam = async (req, res) => {
//     try {
//         const { teacherId, subjectId, questions } = req.body;

//         if (!questions || questions.length === 0) {
//             return res.status(400).json({ message: "At least one question is required" });
//         }

//         const teacher = await Teacher.findById(teacherId);
//         if (!teacher) return res.status(404).json({ message: "Teacher not found" });

//         let exam = await Exam.findOne({ teacher: teacherId, subject: subjectId });

//         if (exam) {
//             exam.questions = questions; // Update questions
//         } else {
//             exam = new Exam({ teacher: teacherId, subject: subjectId, questions });
//         }

//         await exam.save();
//         res.json({ message: "Exam saved successfully", exam });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// exports.toggleAvailability = async (req, res) => {
//     try {
//         const { teacherId, subjectId, available } = req.body;

//         let exam = await Exam.findOne({ teacher: teacherId, subject: subjectId });
//         if (!exam) return res.status(404).json({ message: "Exam not found" });

//         if (!available) exam.questions = []; // turn off

//         exam.available = available;
//         await exam.save();

//         res.json({ message: "Exam availability updated", exam });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// exports.getExamByTeacher = async (req, res) => {
//     try {
//         const { teacherId, subjectId } = req.body;

//         const exam = await Exam.findOne({ teacher: teacherId, subject: subjectId })
//             .populate("subject");

//         if (!exam) return res.json({ message: "No exam found" });

//         res.json(exam);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// controllers/examController.js
// const Exam = require("../models/exam");
// const Teacher = require("../models/teacherSchema");

// // Create or update an exam for the teacher
// exports.createOrUpdateExam = async (req, res) => {
//     try {
//         const { teacherId, subjectId, questions } = req.body;

//         if (!questions || questions.length === 0) {
//             return res.status(400).json({ message: "At least one question is required" });
//         }

//         // Find teacher and check if they teach this subject
//         const teacher = await Teacher.findById(teacherId).populate("teachSubject", "_id subName");
//         if (!teacher) return res.status(404).json({ message: "Teacher not found" });

//         const subjectExists = teacher.teachSubject.some(
//             subj => subj._id.toString() === subjectId
//         );
//         if (!subjectExists) {
//             return res.status(403).json({ message: "You are not assigned to this subject" });
//         }

//         // Create or update exam
//         let exam = await Exam.findOne({ teacher: teacherId, subject: subjectId });
//         if (exam) {
//             exam.questions = questions;
//         } else {
//             exam = new Exam({ teacher: teacherId, subject: subjectId, questions });
//         }

//         await exam.save();
//         res.json({ message: "Exam saved successfully", exam });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// // Toggle exam availability
// exports.toggleAvailability = async (req, res) => {
//     try {
//         const { teacherId, subjectId, available } = req.body;

//         const teacher = await Teacher.findById(teacherId).populate("teachSubject", "_id");
//         if (!teacher) return res.status(404).json({ message: "Teacher not found" });

//         const subjectExists = teacher.teachSubject.some(
//             subj => subj._id.toString() === subjectId
//         );
//         if (!subjectExists) {
//             return res.status(403).json({ message: "You are not assigned to this subject" });
//         }

//         let exam = await Exam.findOne({ teacher: teacherId, subject: subjectId });
//         if (!exam) return res.status(404).json({ message: "Exam not found" });

//         if (!available) exam.questions = []; // Clear questions if turning off
//         exam.available = available;

//         await exam.save();
//         res.json({ message: "Exam availability updated", exam });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// // Get exam for teacher
// exports.getExamByTeacher = async (req, res) => {
//     try {
//         const { teacherId, subjectId } = req.body;

//         const teacher = await Teacher.findById(teacherId).populate("teachSubject", "_id");
//         if (!teacher) return res.status(404).json({ message: "Teacher not found" });

//         const subjectExists = teacher.teachSubject.some(
//             subj => subj._id.toString() === subjectId
//         );
//         if (!subjectExists) {
//             return res.status(403).json({ message: "You are not assigned to this subject" });
//         }

//         const exam = await Exam.findOne({ teacher: teacherId, subject: subjectId })
//             .populate("subject");

//         if (!exam) return res.json({ message: "No exam found" });

//         res.json(exam);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// const Exam = require("../models/exam");
// const Teacher = require("../models/teacherSchema");

// // Create or update an exam for the teacher
// exports.createOrUpdateExam = async (req, res) => {
//     try {
//         const { teacherId, subjectId, questions } = req.body;

//         if (!questions || questions.length === 0) {
//             return res.status(400).json({ message: "At least one question is required" });
//         }

//         // Find teacher and check if they teach this subject
//         const teacher = await Teacher.findById(teacherId).populate("teachSubject", "_id subName");
//         if (!teacher) return res.status(404).json({ message: "Teacher not found" });
//         console.log("teachSubject from DB:", teacher.teachSubject);
//         console.log("subjectId from request:", subjectId);

//         // Since teachSubject is a single ObjectId, not an array
//         if (teacher.teachSubject.toString() !== subjectId) {
//             return res.status(403).json({ message: "You are not assigned to this subject" });
//         }

//         // Create or update exam
//         let exam = await Exam.findOne({ teacher: teacherId, subject: subjectId });
//         if (exam) {
//             exam.questions = questions;
//         } else {
//             exam = new Exam({ teacher: teacherId, subject: subjectId, questions });
//         }

//         await exam.save();
//         res.json({ message: "Exam saved successfully", exam });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// // Toggle exam availability
// exports.toggleAvailability = async (req, res) => {
//     try {
//         const { teacherId, subjectId, available } = req.body;

//         const teacher = await Teacher.findById(teacherId).populate("teachSubject", "_id");
//         if (!teacher) return res.status(404).json({ message: "Teacher not found" });

//         if (teacher.teachSubject.toString() !== subjectId) {
//             return res.status(403).json({ message: "You are not assigned to this subject" });
//         }

//         let exam = await Exam.findOne({ teacher: teacherId, subject: subjectId });
//         if (!exam) return res.status(404).json({ message: "Exam not found" });

//         if (!available) exam.questions = []; // Clear questions if turning off
//         exam.available = available;

//         await exam.save();
//         res.json({ message: "Exam availability updated", exam });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// // Get exam for teacher
// exports.getExamByTeacher = async (req, res) => {
//     try {
//         const { teacherId, subjectId } = req.body;

//         const teacher = await Teacher.findById(teacherId).populate("teachSubject", "_id");
//         if (!teacher) return res.status(404).json({ message: "Teacher not found" });

//         if (teacher.teachSubject.toString() !== subjectId) {
//             return res.status(403).json({ message: "You are not assigned to this subject" });
//         }

//         const exam = await Exam.findOne({ teacher: teacherId, subject: subjectId })
//             .populate("subject");

//         if (!exam) return res.json({ message: "No exam found" });

//         res.json(exam);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };
const Exam = require("../models/exam");
const Teacher = require("../models/teacherSchema");

// Helper to get subjectId from teachSubject (handles populated & non-populated)
function getTeacherSubjectId(teachSubject) {
    if (!teachSubject) return null;
    if (teachSubject._id) return teachSubject._id.toString(); // populated case
    return teachSubject.toString(); // ObjectId case
}

// Create or update an exam for the teacher
exports.createOrUpdateExam = async (req, res) => {
    try {
        const { teacherId, subjectId, questions } = req.body;

        if (!questions || questions.length === 0) {
            return res.status(400).json({ message: "At least one question is required" });
        }

        // Find teacher and check if they teach this subject
        const teacher = await Teacher.findById(teacherId).populate("teachSubject", "_id subName");
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });

        console.log("teachSubject from DB:", teacher.teachSubject);
        console.log("subjectId from request:", subjectId);

        const teacherSubjectId = getTeacherSubjectId(teacher.teachSubject);
        if (teacherSubjectId !== subjectId) {
            return res.status(403).json({ message: "You are not assigned to this subject" });
        }

        // Create or update exam
        let exam = await Exam.findOne({ teacher: teacherId, subject: subjectId });
        if (exam) {
            exam.questions = questions;
        } else {
            exam = new Exam({ teacher: teacherId, subject: subjectId, questions });
        }

        await exam.save();
        res.json({ message: "Exam saved successfully", exam });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Toggle exam availability
exports.toggleAvailability = async (req, res) => {
    try {
        const { teacherId, subjectId, available } = req.body;

        const teacher = await Teacher.findById(teacherId).populate("teachSubject", "_id");
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });

        const teacherSubjectId = getTeacherSubjectId(teacher.teachSubject);
        if (teacherSubjectId !== subjectId) {
            return res.status(403).json({ message: "You are not assigned to this subject" });
        }

        let exam = await Exam.findOne({ teacher: teacherId, subject: subjectId });
        if (!exam) return res.status(404).json({ message: "Exam not found" });

        if (!available) exam.questions = []; // Clear questions if turning off
        exam.available = available;

        await exam.save();
        res.json({ message: "Exam availability updated", exam });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get exam for teacher
exports.getExamByTeacher = async (req, res) => {
    try {
        const { teacherId, subjectId } = req.body;

        const teacher = await Teacher.findById(teacherId).populate("teachSubject", "_id");
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });

        const teacherSubjectId = getTeacherSubjectId(teacher.teachSubject);
        if (teacherSubjectId !== subjectId) {
            return res.status(403).json({ message: "You are not assigned to this subject" });
        }

        const exam = await Exam.findOne({ teacher: teacherId, subject: subjectId })
            .populate("subject");

        if (!exam) return res.json({ message: "No exam found" });

        res.json(exam);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
