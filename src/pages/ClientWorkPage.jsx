import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import Logo from "../components/Logo";
import { getWorkProject, navItems } from "../data/site";

export default function ClientWorkPage({ slug }) {
  const page = useRef();
  const [menu, setMenu] = useState(false);
  const client = getWorkProject(slug);

  useEffect(() => {
    if (!client) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".client-work-nav", { y: -40, opacity: 0, duration: 0.85 })
        .from(".client-work-back", { y: 16, opacity: 0, duration: 0.55 }, 0.15)
        .from(
          ".client-work-title span",
          { yPercent: 110, duration: 1, stagger: 0.08 },
          0.2,
        )
        .from(
          ".client-work-summary, .client-work-mark, .client-work-meta-row",
          { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 },
          0.45,
        );

      gsap.utils.toArray(".client-project-card").forEach((card, i) => {
        gsap.from(card, {
          y: 55,
          opacity: 0,
          duration: 0.85,
          delay: (i % 3) * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, page);
    return () => ctx.revert();
  }, [client]);

  if (!client) {
    return (
      <main className="client-work-page client-work-missing">
        <nav className="nav">
          <Logo />
        </nav>
        <section className="client-work-empty">
          <span>WORK / NOT FOUND</span>
          <h1>This client page is not available.</h1>
          <a href="/work">
            <ArrowLeft size={16} /> Back to work
          </a>
        </section>
      </main>
    );
  }

  return (
    <main ref={page} className="client-work-page" id="top">
      <nav className="nav client-work-nav">
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

      <section className="client-work-hero">
        <a className="client-work-back" href="/work">
          <ArrowLeft size={16} /> All work
        </a>
        <div className="client-work-hero-grid">
          <div>
            <div className="client-work-meta-row">
              <span>CLIENT WORK</span>
              <span>DEMO · PLACEHOLDER</span>
            </div>
            <h1 className="client-work-title">
              <span>{client.client}</span>
            </h1>
            <p className="client-work-summary">{client.summary}</p>
            <div className="client-work-meta-row client-work-tags">
              <span>{client.type}</span>
              <span>
                {String(client.projects.length).padStart(2, "0")} CUTS
              </span>
            </div>
          </div>
          <div
            className={`client-work-mark work-client-${client.slug}`}
            aria-hidden="true"
          >
            <img src={client.thumb} alt="" />
          </div>
        </div>
      </section>

      <section className="client-work-projects">
        <div className="client-work-projects-head">
          <span>PROJECTS FOR {client.client.toUpperCase()}</span>
          <p>
            Demo content only. Replace these placeholders with the real films,
            stills and deliverables for this client.
          </p>
        </div>
        <div className="client-project-grid">
          {client.projects.map((project, index) => (
            <article className="client-project-card" key={project.title}>
              <div className="client-project-thumb">
                <img src={project.thumb} alt="" loading="lazy" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="client-project-meta">
                <div>
                  <b>{project.title}</b>
                  <p>{project.type}</p>
                </div>
                <em>{project.status}</em>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work-page-cta client-work-cta">
        <span>NEXT PROJECT</span>
        <h2>
          Want work like this
          <br />
          for your brand?
        </h2>
        <div className="client-work-cta-links">
          <a href="/contact">
            Start a project <ArrowUpRight />
          </a>
          <a href="/work">Back to all work</a>
        </div>
      </section>

      <footer className="contact-footer">
        <span>© 2026 VENCUTS MEDIA</span>
        <a href="mailto:venkateswarans@vencutsmedia.com">
          VENKATESWARANS@VENCUTSMEDIA.COM
        </a>
        <span>{client.client.toUpperCase()} · DEMO</span>
      </footer>
    </main>
  );
}
