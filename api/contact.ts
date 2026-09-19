/**
 * POST /api/contact: delivers the contact form by email.
 *
 * Runs as a Vercel Function on the Node.js runtime. Needs RESEND_API_KEY
 * in the project's environment (never shipped to the client). Optional
 * CONTACT_TO and CONTACT_FROM override the recipient and the sender.
 * Without a key it answers 503 so the form shows an honest error.
 */

const TO_DEFAULT = 'sadhubhanu07@gmail.com'
const FROM_DEFAULT = 'Portfolio <onboarding@resend.dev>'
const LIMIT = { name: 120, email: 254, message: 5000, honeypot: 200 }
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function field(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c)
}

export async function POST(request: Request): Promise<Response> {
  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return json(400, { ok: false, error: 'the request body was not valid JSON' })
  }

  // Honeypot: people never see the field, bots fill it. Answer as if sent so they move on.
  if (field(payload.company, LIMIT.honeypot)) return json(200, { ok: true })

  const name = field(payload.name, LIMIT.name)
  const email = field(payload.email, LIMIT.email)
  const message = field(payload.message, LIMIT.message)
  if (!name || !email || !message) return json(400, { ok: false, error: 'name, email, and message are all required' })
  if (!EMAIL.test(email)) return json(400, { ok: false, error: 'that email address does not look right' })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return json(503, { ok: false, error: 'email delivery is not configured yet' })

  const to = process.env.CONTACT_TO || TO_DEFAULT
  const from = process.env.CONTACT_FROM || FROM_DEFAULT
  const subject = `Portfolio inquiry from ${name}`
  const text = `${message}\n\n— ${name}\n${email}`
  const html = `<p style="white-space:pre-wrap">${escapeHtml(message)}</p><p>— ${escapeHtml(name)}<br>${escapeHtml(email)}</p>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
  })

  if (!res.ok) {
    console.error('Resend rejected the message', res.status, await res.text().catch(() => ''))
    return json(502, { ok: false, error: 'the email service rejected the message' })
  }
  return json(200, { ok: true })
}

export function GET(): Response {
  return json(405, { ok: false, error: 'use POST' })
}
