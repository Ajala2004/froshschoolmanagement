const Exam = require("../models/exam");
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');

/**
 * GET /api/exam/student/:studentId/exams
 * Return all AVAILABLE exams for the student's class & school.
 */
exports.getExamsForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId)
      .populate("sclassName")
      .populate("school");

    if (!student) return res.status(404).json({ message: "Student not found" });

    // Subjects for student's class & school
    const subjects = await Subject.find({
      sclassName: student.sclassName._id,
      school: student.school._id,
    }).select("_id subName subCode");

    const subjectIds = subjects.map(s => s._id);

    // Only AVAILABLE exams
    const exams = await Exam.find({
      subject: { $in: subjectIds },
      available: true,
    })
      .populate("subject", "subName subCode")
      .populate("teacher", "name");

    res.json({ exams });
  } catch (err) {
    console.error("getExamsForStudent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/exam/student/:studentId/exam/:examId/submit
 * Body: { answers: { "0": "selectedOption", "1": "..." } }
 * - Grades using per-question `marks`
 * - Scales raw score to 70 and saves to student.examResult[].exam
 * - Attempts count is treated as 1 per submission (you can enforce attempt limits later if needed)
 */
exports.submitExam = async (req, res) => {
  try {
    const { studentId, examId } = req.params;
    const { answers = {} } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const exam = await Exam.findById(examId).populate("subject", "subName");
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // Grade
    let rawScore = 0;
    let totalMarks = 0;

    exam.questions.forEach((q, idx) => {
      totalMarks += (q.marks || 1);
      const chosen = answers[idx] ?? null; // string
      if (chosen && chosen === q.answer) rawScore += (q.marks || 1);
    });

    // Scale to 70 to fit your examResult.exam limit (0-70)
    const scaledScore = totalMarks > 0 ? Math.round((rawScore / totalMarks) * 70) : 0;
    const boundedScore = Math.max(0, Math.min(70, scaledScore));

    // Upsert into examResult for this subject without touching CA/test
    const subjectId = exam.subject._id;
    const existing = student.examResult.find(
      r => String(r.subName) === String(subjectId)
    );

    if (existing) {
      existing.exam = boundedScore; // overwrite latest exam score
      // DO NOT modify firstCA/secondCA/thirdCA/test
    } else {
      student.examResult.push({
        subName: subjectId,
        exam: boundedScore,
        // CA/test fields will use defaults (0) per your schema
      });
    }

    await student.save();

    res.json({
      message: "Exam submitted and saved",
      subject: exam.subject.subName,
      rawScore,
      totalMarks,
      scaledTo70: boundedScore,
    });
  } catch (err) {
    console.error("submitExam error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
