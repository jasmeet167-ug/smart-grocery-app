import nodemailer from "nodemailer";
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";
import handlebars from "handlebars"




const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



export const verifyMail = async (token, email) => {
const emailTemplateSource =fs.readFileSync(
  path.join(__dirname,"template.hbs"),
  "utf-8"
)
const template = handlebars.compile(emailTemplateSource)
const htmlToSend = template({token:encodeURIComponent(token)})
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, 
      },
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",
      html: htmlToSend
        
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log(" Email sent successfully");
    console.log("Message ID:", info.messageId);

  } catch (error) {
    console.error(" Email sending failed:", error);
    throw error;
  }
};