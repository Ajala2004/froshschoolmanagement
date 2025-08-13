export const sendInChunks = async ({ transporter, from, subject, html, recipients, chunkSize = 50 }) => {
  const unique = Array.from(new Set((recipients || []).filter(Boolean)));
  const chunks = [];
  for (let i = 0; i < unique.length; i += chunkSize) chunks.push(unique.slice(i, i + chunkSize));

  for (const bcc of chunks) {
    await transporter.sendMail({ from, to: from, bcc, subject, html });
  }
  return { total: unique.length, batches: chunks.length };
};
