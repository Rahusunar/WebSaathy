import type React from "react"
interface ContactEmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({ name, email, subject, message }) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <h1 style={{ color: "#333", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
      New Contact Form Submission
    </h1>

    <div style={{ padding: "20px 0" }}>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Subject:</strong> {subject}
      </p>

      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
        <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>Message:</p>
        <p style={{ whiteSpace: "pre-wrap", margin: "0" }}>{message}</p>
      </div>
    </div>

    <div style={{ borderTop: "1px solid #eee", paddingTop: "15px", color: "#777", fontSize: "12px" }}>
      <p>This email was sent from the contact form on your website.</p>
    </div>
  </div>
)

