
import { froshAcademyTemplate } from '../utils/emailTemplate.js';
import { createTransporter } from '../services/mailer.js';
import { sendInChunks } from '../utils/chunkSend.js';
import Student from '../models/studentSchema.js';
import Teacher  from '../models/teacherSchema.js';
export const getStudentEmails = async (_req, res) => {
  try {
    const students = await Student.find({ email: { $ne: null } }, 'email');
    const emails = students.map(s => s.email?.trim()).filter(Boolean);
    res.json(emails);
  } catch (e) {
    res.status(500).json({ error: 'Error fetching student emails' });
  }
};

export const getTeacherEmails = async (_req, res) => {
  try {
    const teachers = await Teacher.find({ email: { $ne: null } }, 'email');
    const emails = teachers.map(t => t.email?.trim()).filter(Boolean);
    res.json(emails);
  } catch (e) {
    res.status(500).json({ error: 'Error fetching teacher emails' });
  }
};

export const previewEmail = async (req, res) => {
  try {
    const { subject, message, ctaText, ctaUrl } = req.body || {};
    const html = froshAcademyTemplate({ subject, message, ctaText, ctaUrl });
    res.type('html').send(html);
  } catch {
    res.status(500).json({ error: 'Error rendering preview' });
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { recipients = [], subject = 'Frosh Academy', message = '', ctaText, ctaUrl } = req.body || {};
    if (!recipients.length) return res.status(400).json({ error: 'No recipients provided' });

    const transporter = createTransporter();
    const html = froshAcademyTemplate({ subject, message, ctaText, ctaUrl });
    const from = `"Frosh Academy" <${process.env.EMAIL_USER}>`;

    const result = await sendInChunks({ transporter, from, subject, html, recipients });
    res.json({ success: true, ...result });
  } catch (e) {
    res.status(500).json({ error: 'Failed to send email' });
  }
};
