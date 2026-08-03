import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import Logo from "../components/Logo";
import { navItems, testimonials, workProjects } from "../data/site";

export default function WorkPage() {
  const page = useRef();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".work-nav", { y: -40, opacity: 0, duration: 0.9 })
        .from(
          ".work-page-title span",
          { yPercent: 110, duration: 1.05, stagger: 0.09 },
          0.15,
        )
        .from(".work-page-kicker", { opacity: 0, y: 12, duration: 0.65 }, 0.45)
        .from(".work-page-intro", { opacity: 0, y: 18, duration: 0.7 }, 0.55);

      gsap.utils.toArray(".work-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          delay: (i % 3) * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });

      gsap.from(".work-quotes-head", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: ".work-quotes-section", start: "top 85%" },
      });
    }, page);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={page} className="work-page" id="top">
      <nav className="nav work-nav">
        <Logo />
        <div className="nav-links">
          {navItems.map(([label, path]) => (
            <a
              className={path === "/work" ? "active" : ""}
              href={path}
              key={path}
            >
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="/contact">
          <span>Start a project</span>
          <i>
            <ArrowUpRight size={16} />
          </i>
        </a>
        <button
          className="menu-btn"
          onClick={() => setMenu(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </nav>
      <div className={`mobile-menu ${menu ? "open" : ""}`}>
        <button className="menu-close" onClick={() => setMenu(false)}>
          <X />
        </button>
        {navItems.map(([label, path]) => (
          <a key={path} href={path}>
            {label}
          </a>
        ))}
      </div>

      <section className="work-page-hero">
        <div className="work-page-kicker">
          <span>SELECTED WORK</span>
          <span>{String(workProjects.length).padStart(2, "0")} CLIENTS</span>
        </div>
        <h1 className="work-page-title">
          <span>THE WORK.</span>
          <span>
            CLEAR STORIES.
            <i> FINAL CUTS.</i>
          </span>
        </h1>
        <p className="work-page-intro">
          A simple look at the brands we&apos;ve worked with. Real client marks
          now — project films and approved testimonials next.
        </p>
      </section>

      <section className="work-section work-page-grid-wrap">
        <div className="work-grid">
          {workProjects.map((project) => (
            <a
              className={`work-card work-card-${project.fit} work-client-${project.slug}`}
              href={project.href}
              key={project.slug}
              aria-label={`Open work for ${project.client}`}
            >
              <div className="work-thumb">
                <img
                  src={project.thumb}
                  alt={`${project.client} logo`}
                  loading="lazy"
                />
                <span className="work-type">{project.type}</span>
              </div>
              <div className="work-meta">
                <b>{project.client}</b>
                <span>View work</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="work-quotes-section">
        <div className="work-quotes-head">
          <span>CLIENT WORDS</span>
          <h2>What collaborators say.</h2>
        </div>
        <div className="work-quote-marquee" aria-label="Client testimonials">
          <div className="work-quote-track">
            {[0, 1].map((copy) => (
              <div
                className="work-quote-group"
                key={copy}
                aria-hidden={copy === 1}
              >
                {testimonials.map((item) => (
                  <blockquote
                    className={`work-quote work-client-${item.slug}`}
                    key={`${copy}-${item.slug}`}
                  >
                    <div className="work-quote-logo">
                      <img src={item.logo} alt="" />
                    </div>
                    <p>“{item.quote}”</p>
                    <footer>
                      <b>{item.name}</b>
                      <span>{item.role}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="work-page-cta">
        <span>READY FOR THE NEXT CUT?</span>
        <h2>
          Have a story
          <br />
          for this reel?
        </h2>
        <a href="/contact">
          Start a project <ArrowUpRight />
        </a>
      </section>

      <footer className="contact-footer">
        <span>© 2026 VENCUTS MEDIA</span>
        <a href="mailto:venkateswarans@vencutsmedia.com">
          VENKATESWARANS@VENCUTSMEDIA.COM
        </a>
        <span>SELECTED WORK · CLIENTS</span>
      </footer>
    </main>
  );
}
