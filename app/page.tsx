import Image from 'next/image';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero hero-grid">
        <div className="hero-copy">
          <h1>Hi, I'm Anthony</h1>
          <p>Welcome to my portfolio. More coming soon. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. </p>
          <a className="btn" href="#projects">View Projects</a>
        </div>
        <div className="hero-visual">
          <div className="hero-figure">
            <Image
              className="hero-img"
              src="/images/profile.jpg"
              alt="Anthony"
              fill
              priority
              sizes="(min-width: 1024px) 460px, (min-width: 768px) 360px, 80vw"
            />
          </div>
        </div>
      </section>

      <div className="section-sep" aria-hidden="true"></div>

      <section id="projects" className="section">
        <h2>Featured Projects</h2>
        <div className="cards">
          <article className="card">
            <h3>Project Title</h3>
            <p>Short description of your project.</p>
            <a href="#" className="link">Learn more →</a>
          </article>
        </div>
      </section>

      <div className="section-sep" aria-hidden="true"></div>

      <section id="contact" className="section">
        <h2>Contact</h2>
        <ContactForm />
      </section>
    </main>
  );
}


