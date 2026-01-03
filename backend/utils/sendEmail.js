import nodemailer from "nodemailer";

const sendEmail = async (toEmail, userId, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "saniyadhusiya59@gmail.com",  
        pass: "uwhi tdbx vwji crjy"     
      }
    });

    const mailOptions = {
      from: "saniyadhusiya59@gmail.com",
      to: toEmail,
      subject: "Registration Successful",
      text: `
Hi,

Your account has been created successfully.

UserId: ${userId}
Temporary Password: ${password}

Please login and change your password.

Thank you.
`
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

  } catch (error) {
    console.log("Email sending failed:", error);
  }
};

export default sendEmail;
