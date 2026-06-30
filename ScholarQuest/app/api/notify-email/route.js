import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, message, scholarshipName, status } = body;

    // Use Ethereal Email for testing without real credentials
    let testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const statusColor = status === 'Approved' ? '#10b981' : (status === 'Rejected' ? '#f43f5e' : '#3b82f6'); 

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #4F39F6; text-align: center;">ScholarQuest</h2>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; text-align: center;">
          <h3 style="color: #111827; margin-top: 0;">Application Update</h3>
          <p style="font-size: 16px; color: #4b5563;">Your application for <strong>${scholarshipName || 'a scholarship'}</strong> has been updated.</p>
          <div style="margin: 30px 0;">
            <span style="background-color: ${statusColor}; color: white; padding: 10px 20px; border-radius: 999px; font-weight: bold; font-size: 18px;">
              ${status || 'Updated'}
            </span>
          </div>
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">${message || 'Please check your dashboard for details.'}</p>
        </div>
        <p style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px;">
          © ${new Date().getFullYear()} ScholarQuest. All rights reserved.
        </p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: '"ScholarQuest Notifications" <no-reply@scholarquest.com>',
      to: to || 'student@example.com',
      subject: subject || `Application ${status}: ${scholarshipName}`,
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return NextResponse.json({ success: true, previewUrl: nodemailer.getTestMessageUrl(info) });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
