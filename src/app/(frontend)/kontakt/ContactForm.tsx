'use client'

import { useActionState, type FormEvent } from 'react'
import { sendInquiry } from './actions'
import { contactEmail } from '@/constants/contact'

const messages: Record<string, string> = {
  sent: 'Dziękujemy za wiadomość. Odeślemy odpowiedź na podany adres e-mail.',
  invalid: 'Sprawdź wprowadzone dane i spróbuj ponownie.',
  failed: `Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na ${contactEmail}.`,
  unavailable: `Napisz do nas bezpośrednio: ${contactEmail}.`,
}

export function ContactForm({ direct }: { direct: boolean }) {
  const [status, action, pending] = useActionState(sendInquiry, '')

  function openMail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent('Zapytanie o projekt wnętrza')}&body=${encodeURIComponent(text)}`
  }

  return (
    <form
      className="inquiry-form"
      action={direct ? action : `mailto:${contactEmail}`}
      method={direct ? undefined : 'post'}
      encType={direct ? undefined : 'text/plain'}
      onSubmit={direct ? undefined : openMail}
    >
      <div className="inquiry-fields">
        <label>
          Imię i nazwisko
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Adres e-mail
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
      </div>
      <label className="inquiry-message">
        Wiadomość
        <textarea
          name="message"
          rows={5}
          required
          maxLength={4000}
          placeholder="Opowiedz nam krótko o swoim wnętrzu."
        />
      </label>
      <div hidden aria-hidden="true">
        <label>
          Strona internetowa
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {!direct && <p>Przycisk otworzy gotową wiadomość w Twojej aplikacji pocztowej.</p>}
      {status && <p role="status">{messages[status]}</p>}
      <button type="submit" disabled={pending}>
        {pending ? 'Wysyłanie…' : direct ? 'Wyślij wiadomość' : 'Otwórz aplikację pocztową'}{' '}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  )
}
