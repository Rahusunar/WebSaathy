export default function ContactMap() {
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d452.1235743567868!2d80.552420113645!3d28.81803778692563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1742188440129!5m2!1sen!2snp"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Websaathy Location"
      />
    </div>
  )
}

