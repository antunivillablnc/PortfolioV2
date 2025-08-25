'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setSent(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to send');
      setSent(true);
      setMessage('');
      setEmail('');
    } catch (e: any) {
      console.error('Send error:', e);
      setSent(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Your email (optional)</label>
      <input
        id="email"
        name="email"
        type="email"
        inputMode="email"
        className="contact-input"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="message">Your message</label>
      <textarea
        id="message"
        name="message"
        className="contact-textarea"
        rows={8}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message here..."
      />
      <div className="contact-actions">
        <button type="submit" className="btn" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
      </div>
      {sent === true && <p role="status" className="contact-status success">Message sent!</p>}
      {sent === false && <p role="status" className="contact-status error">Failed to send. Try again later.</p>}
    </form>
  );
}


