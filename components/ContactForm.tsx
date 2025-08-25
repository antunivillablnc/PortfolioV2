'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const recipientEmail = 'villablancaanthony2@gmail.com';
    const subject = 'Message from portfolio';
    const mailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="btn">Send message</button>
      </div>
    </form>
  );
}


