"use server"

import { Resend } from "resend"
import { ContactEmailTemplate } from "@/components/email-templates/contact-email"
import { db } from "@/lib/db"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail({ name, email, subject, message }) {
  try {
    const recipientEmail = "websathy@gmail.com" // Hardcoded recipient email

    const { data, error } = await resend.emails.send({
      from: "Contact Form <contact@websaathy.com>",
      to: [recipientEmail],
      subject: `New Contact Form Submission: ${subject}`,
      react: ContactEmailTemplate({
        name,
        email,
        subject,
        message,
      }),
      reply_to: email,
    })

    if (error) {
      throw new Error(error.message)
    }

    // Store the inquiry in our database
    await db.inquiry.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    return { success: true, data }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: error.message || "Failed to send email" }
  }
}

export async function updateSocialLinks(links) {
  try {
    // Save to database
    await db.settings.upsert({
      where: { key: "socialLinks" },
      update: { value: JSON.stringify(links) },
      create: {
        key: "socialLinks",
        value: JSON.stringify(links),
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating social links:", error)
    return { success: false, error: error.message || "Failed to update social links" }
  }
}

export async function getSocialLinks() {
  try {
    const settings = await db.settings.findUnique({
      where: { key: "socialLinks" },
    })

    if (!settings) {
      return {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        github: "",
      }
    }

    return JSON.parse(settings.value)
  } catch (error) {
    console.error("Error fetching social links:", error)
    return {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      github: "",
    }
  }
}

