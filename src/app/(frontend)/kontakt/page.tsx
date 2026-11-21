import { ContactForm } from './ContactForm'
import { contactEmail } from '@/constants/contact'
import './contact.css'

export const metadata = {
  title: 'Kontakt — AK Visual',
  description:
    'Skontaktuj się z pracownią AK Visual. Stara Rozlewnia, ul. Sienkiewicza 3, 98-200 Sieradz.',
}

const place = encodeURIComponent(
  'Stara Rozlewnia, ul. Henryka Sienkiewicza 3, 98-200 Sieradz, Polska',
)

export default function ContactPage() {
  return (
    <main className="folio contact-page">
      <header className="folio-intro">
        <p className="folio-index">AK Visual / Kontakt</p>
        <h1>
          Porozmawiajmy <i>o wnętrzu.</i>
        </h1>
        <p>Projektujemy na terenie całej Polski.</p>
      </header>
      <div className="contact-columns">
        <section className="contact-panel" aria-labelledby="inquiry-title">
          <h2 id="inquiry-title">Napisz do nas</h2>
          <ContactForm
            direct={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)}
          />
        </section>
        <section className="contact-panel contact-visit" aria-labelledby="studio-title">
          <h2 id="studio-title">Odwiedź pracownię</h2>
          <address>
            <strong>Stara Rozlewnia</strong>
            <br />
            ul. Henryka Sienkiewicza 3<br />
            98-200 Sieradz, Polska
          </address>
          <div className="contact-map">
            <iframe
              title="Mapa dojazdu do Starej Rozlewni w Sieradzu"
              src={`https://www.google.com/maps?q=${place}&output=embed`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            className="contact-map-link"
            href={`https://www.google.com/maps/dir/?api=1&destination=${place}`}
            target="_blank"
            rel="noreferrer"
          >
            Wyznacz trasę w Google Maps ↗
          </a>
          <div className="contact-details">
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <a href="tel:+48726453736">+48 726 453 736</a>
          </div>
        </section>
      </div>
      <section className="contact-people" aria-labelledby="people-title">
        <p className="folio-index">Pracownia</p>
        <h2 id="people-title">Poznaj projektantki</h2>
        <ul>
          <li>
            <p>mgr inż. arch.</p>
            <h3>Angelika Kotowska</h3>
          </li>
          <li>
            <p>mgr inż. arch.</p>
            <h3>Anna Matuszewska</h3>
          </li>
        </ul>
      </section>
    </main>
  )
}
