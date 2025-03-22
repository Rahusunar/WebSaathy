import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-2xl font-bold">Get In Touch</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium">Address</h4>
            <p className="text-muted-foreground">
              Attariya
              <br />
              Kailali
              <br />
              Nepal
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium">Phone</h4>
            <p className="text-muted-foreground">
              <a href="tel:+9779805740156" className="hover:text-primary">
                +977 9805740156
              </a>
            </p>
            <p className="text-muted-foreground mt-1">
              <a
                href="https://wa.me/9779805740156"
                className="hover:text-primary flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp: +977 9805740156</span>
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium">Email</h4>
            <p className="text-muted-foreground">
              <a href="mailto:websathy@gmail.com" className="hover:text-primary">
                websathy@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium">Business Hours</h4>
            <p className="text-muted-foreground">
              Monday - Friday: 9:00 AM - 5:00 PM
              <br />
              Saturday - Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

