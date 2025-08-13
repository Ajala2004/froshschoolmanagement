export const froshAcademyTemplate = ({ subject, message, ctaText, ctaUrl }) => {
  const safe = (s = '') => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safe(subject || 'Frosh Academy')}</title>
  <style>
    body, table, td, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    table {
      border-collapse: collapse !important;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #f4f6f8;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #333;
    }
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      .main {
        border-radius: 0 !important;
      }
    }
    .btn:hover {
      opacity: 0.92;
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%">
    <tr>
      <td align="center" style="padding: 30px 15px;">
        <table role="presentation" class="container" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.05); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #2962ff, #00bcd4); padding: 24px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                🎓 Frosh Academy
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255,255,255,0.85); letter-spacing: 0.5px;">
                ${safe(subject || 'Announcement')}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 26px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #444444;">
                ${safe(message).replace(/\\n/g, '<br/>')}
              </p>

              ${ctaText && ctaUrl ? `
              <div style="text-align: center; margin: 28px 0 10px;">
                <a href="${ctaUrl}" target="_blank" 
                  style="display: inline-block; padding: 14px 28px; background-color: #2962ff; color: #ffffff; font-size: 15px; font-weight: bold; text-decoration: none; border-radius: 6px;">
                  ${safe(ctaText)}
                </a>
              </div>` : ''}
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 26px;">
              <hr style="border: none; border-top: 1px solid #eeeeee; margin: 0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px; font-size: 12px; color: #777777; background-color: #fafafa;">
              <p style="margin: 0;">
                Sent by <strong>Frosh Academy</strong><br/>
                You are receiving this email because you are part of our community.
              </p>
              <p style="margin: 8px 0 0;">
                © ${new Date().getFullYear()} Frosh Academy. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
