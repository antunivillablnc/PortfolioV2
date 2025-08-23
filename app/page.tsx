export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Hi, I'm Anthony</h1>
        <p>Welcome to my portfolio. More coming soon.</p>
        <a className="btn" href="#projects">View Projects</a>
      </section>

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
    </main>
  );
}


