import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { companyDetails } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, productName, productId } = body;

    // Simple validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400 }
      );
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${email}>`, // sender address
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL, // receiver
      subject: `New Enquiry for ${productName || "General"} from ${name}`,
      text: `
          New Enquiry Received:
          
          Product: ${productName || "General Enquiry"} (${productId || "N/A"})
          
          Name: ${name}
          Email: ${email}
          Phone: ${phone || "Not provided"}
          
          Message:
          ${message}
        `,
      html: `
          <h3>New Enquiry Received</h3>
          <p><strong>Product:</strong> ${productName || "General Enquiry"} (${
        productId || "N/A"
      })</p>
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <br />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
    };

    // Send mail
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      return NextResponse.json({ success: true });
    } else {
      console.warn("SMTP credentials not configured. simulating success.");
      // In dev without creds, we simulate success
      return NextResponse.json({
        success: true,
        message: "Simulated success (no SMTP credentials)",
      });
    }
  } catch (error) {
    console.error("Error sending enquiry:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
