'use server'

import { contactEmail } from '@/constants/contact'

export async function sendInquiry(_previous: string, data: FormData): Promise<string> {
  const read = (key: string) => String(data.get(key) ?? '').trim()
  if (read('website')) return 'sent'

  const name = read('name')
  const email = read('email')
  const message = read('message')
  if (
    !name ||
    name.length > 100 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message ||
    message.length > 4000
  )
    return 'invalid'

  const token = process.env.RESEND_API_KEY?.trim()
  const from = process.env.CONTACT_FROM_EMAIL?.trim()
  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || contactEmail
  if (!token || !from) return 'unavailable'

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: 'Nowe zapytanie — AK Visual',
        text: `Od: ${name}\nE-mail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    })
    return response.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}
