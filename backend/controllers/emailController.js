
// import { froshAcademyTemplate } from '../utils/emailTemplate.js';
// import { createTransporter } from '../services/mailer.js';
// import { sendInChunks } from '../utils/chunkSend.js';
// import Student from '../models/studentSchema.js';
// import Teacher  from '../models/teacherSchema.js';
// export const getStudentEmails = async (_req, res) => {
//   try {
//     const students = await Student.find({ email: { $ne: null } }, 'email');
//     const emails = students.map(s => s.email?.trim()).filter(Boolean);
//     res.json(emails);
//   } catch (e) {
//     res.status(500).json({ error: 'Error fetching student emails' });
//   }
// };

// export const getTeacherEmails = async (_req, res) => {
//   try {
//     const teachers = await Teacher.find({ email: { $ne: null } }, 'email');
//     const emails = teachers.map(t => t.email?.trim()).filter(Boolean);
//     res.json(emails);
//   } catch (e) {
//     res.status(500).json({ error: 'Error fetching teacher emails' });
//   }
// };

// export const previewEmail = async (req, res) => {
//   try {
//     const { subject, message, ctaText, ctaUrl } = req.body || {};
//     const html = froshAcademyTemplate({ subject, message, ctaText, ctaUrl });
//     res.type('html').send(html);
//   } catch {
//     res.status(500).json({ error: 'Error rendering preview' });
//   }
// };

// export const sendEmail = async (req, res) => {
//   try {
//     const { recipients = [], subject = 'Frosh Academy', message = '', ctaText, ctaUrl } = req.body || {};
//     if (!recipients.length) return res.status(400).json({ error: 'No recipients provided' });

//     const transporter = createTransporter();
//     const html = froshAcademyTemplate({ subject, message, ctaText, ctaUrl });
//     const from = `"Frosh Academy" <${process.env.EMAIL_USER}>`;

//     const result = await sendInChunks({ transporter, from, subject, html, recipients });
//     res.json({ success: true, ...result });
//   } catch (e) {
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// };
// import { froshAcademyTemplate } from '../utils/emailTemplate.js';
// import { createTransporter } from '../services/mailer.js';
// import { sendInChunks } from '../utils/chunkSend.js';
// import Student from '../models/studentSchema.js';
// import Teacher from '../models/teacherSchema.js';

// // Get all student emails
// export const getStudentEmails = async (_req, res) => {
//   try {
//     const students = await Student.find({ email: { $ne: null } }, 'email');
//     const emails = students.map(s => s.email?.trim()).filter(Boolean);
//     res.json(emails);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: 'Error fetching student emails' });
//   }
// };

// // Get all parent emails
// export const getParentEmails = async (_req, res) => {
//   try {
//     const students = await Student.find({ parentEmail: { $ne: null } }, 'parentEmail');
//     const emails = students.map(s => s.parentEmail?.trim()).filter(Boolean);
//     res.json(emails);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: 'Error fetching parent emails' });
//   }
// };

// // Get all teacher emails
// export const getTeacherEmails = async (_req, res) => {
//   try {
//     const teachers = await Teacher.find({ email: { $ne: null } }, 'email');
//     const emails = teachers.map(t => t.email?.trim()).filter(Boolean);
//     res.json(emails);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: 'Error fetching teacher emails' });
//   }
// };

// // Preview email
// export const previewEmail = async (req, res) => {
//   try {
//     const { subject, message, ctaText, ctaUrl } = req.body || {};
//     const html = froshAcademyTemplate({ subject, message, ctaText, ctaUrl });
//     res.type('html').send(html);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: 'Error rendering preview' });
//   }
// };

// // Send email
// export const sendEmail = async (req, res) => {
//   try {
//     const { recipients = [], subject = 'Frosh Academy', message = '', ctaText, ctaUrl } = req.body || {};
//     if (!recipients.length) return res.status(400).json({ error: 'No recipients provided' });

//     const transporter = createTransporter();
//     const html = froshAcademyTemplate({ subject, message, ctaText, ctaUrl });
//     const from = `"Frosh Academy" <${process.env.EMAIL_USER}>`;

//     const result = await sendInChunks({ transporter, from, subject, html, recipients });
//     res.json({ success: true, ...result });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// };
import { froshAcademyTemplate } from '../utils/emailTemplate.js';
import { createTransporter } from '../services/mailer.js';
import { sendInChunks } from '../utils/chunkSend.js';
import Student from '../models/studentSchema.js';
import Teacher from '../models/teacherSchema.js';

/**
 * ---- Fetchers ----
 */

// Get all student emails
export const getStudentEmails = async (_req, res) => {
  try {
    const students = await Student.find({ email: { $nin: [null, ""] } }, 'email');
    const emails = students.map(s => s.email?.trim()).filter(Boolean);
    res.json(emails);
  } catch (e) {
    console.error("Error fetching student emails:", e);
    res.status(500).json({ error: 'Error fetching student emails' });
  }
};

// Get all parent emails
export const getParentEmails = async (_req, res) => {
  try {
    const students = await Student.find({ parentEmail: { $nin: [null, ""] } }, 'parentEmail');
    const emails = students.map(s => s.parentEmail?.trim()).filter(Boolean);
    res.json(emails);
  } catch (e) {
    console.error("Error fetching parent emails:", e);
    res.status(500).json({ error: 'Error fetching parent emails' });
  }
};

// Get all teacher emails
export const getTeacherEmails = async (_req, res) => {
  try {
    const teachers = await Teacher.find({ email: { $nin: [null, ""] } }, 'email');
    const emails = teachers.map(t => t.email?.trim()).filter(Boolean);
    res.json(emails);
  } catch (e) {
    console.error("Error fetching teacher emails:", e);
    res.status(500).json({ error: 'Error fetching teacher emails' });
  }
};

/**
 * ---- Preview ----
 */
export const previewEmail = async (req, res) => {
  try {
    const { subject, message, ctaText, ctaUrl } = req.body || {};
    const html = froshAcademyTemplate({ subject, message, ctaText, ctaUrl });
    res.type('html').send(html);
  } catch (e) {
    console.error("Error rendering preview:", e);
    res.status(500).json({ error: 'Error rendering preview' });
  }
};

/**
 * ---- Send Email ----
 * Supports:
 *   mode = "students" | "teachers" | "parents" | "custom"
 *   - "custom" requires req.body.recipients = ["a@mail.com", "b@mail.com"]
 */
export const sendEmail = async (req, res) => {
  try {
    const {
      mode = "custom",        // who to send to
      recipients = [],        // only used for custom
      subject = 'Frosh Academy',
      message = '',
      ctaText,
      ctaUrl
    } = req.body || {};

    let emails = [];

    if (mode === "students") {
      const students = await Student.find({ email: { $nin: [null, ""] } }, 'email');
      emails = students.map(s => s.email.trim());
    } else if (mode === "parents") {
      const students = await Student.find({ parentEmail: { $nin: [null, ""] } }, 'parentEmail');
      emails = students.map(s => s.parentEmail.trim());
    } else if (mode === "teachers") {
      const teachers = await Teacher.find({ email: { $nin: [null, ""] } }, 'email');
      emails = teachers.map(t => t.email.trim());
    } else if (mode === "custom") {
      emails = recipients.filter(e => typeof e === "string" && e.trim() !== "");
    }

    if (!emails.length) {
      return res.status(400).json({ error: `No recipients found for mode: ${mode}` });
    }

    const transporter = createTransporter();
    const html = froshAcademyTemplate({ subject, message, ctaText, ctaUrl });
    const from = `"Frosh Academy" <${process.env.EMAIL_USER}>`;

    const result = await sendInChunks({ transporter, from, subject, html, recipients: emails });
    res.json({ success: true, mode, totalRecipients: emails.length, ...result });
  } catch (e) {
    console.error("Error sending email:", e);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
