import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import Logo from "../components/Logo";
import PortfolioPlayer from "../components/PortfolioPlayer";
import { navItems } from "../data/site";
import {
  clientCollections,
  featuredShowcase,
  workCategories,
} from "../data/portfolio";

export default function WorkPage() {
  const page = useRef();
  const [menu, setMenu] = useState(false);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .from(".work-nav", { y: -40, opacity: 0, duration: 0.9 })
        .from(
          ".work-page-title span",
          { yPercent: 110, duration: 1.05, stagger: 0.09 },
          0.15,
        )
        .from(
          ".work-page-kicker, .work-page-intro",
          { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 },
          0.45,
        );

      gsap.utils
        .toArray(".portfolio-feature, .client-collection, .work-category-row")
        .forEach((item, index) => {
          gsap.from(item, {
            y: 45,
            opacity: 0,
            duration: 0.8,
            delay: (index % 3) * 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 92%" },
          });
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
          <span>PORTFOLIO / CLIENT SHOWCASE</span>
          <span>VENCUTS MEDIA</span>
        </div>
        <h1 className="work-page-title">
          <span>STORIES FOR</span>
          <span>
            PEOPLE, PRODUCTS <i>&amp; PLATFORMS.</i>
          </span>
        </h1>
        <p className="work-page-intro">
          Clients, collaborators and video work spanning founder storytelling,
          SaaS explainers, documentary, podcast, product and 3D content.
        </p>
      </section>

      <section className="portfolio-featured-section">
        <header className="portfolio-section-head">
          <h2>Featured creators &amp; clients</h2>
          <p>
            Selected collaborations across creator-led content, brand films and
            social storytelling.
          </p>
        </header>
        <div className="portfolio-feature-grid">
          {featuredShowcase.map((item, index) => (
            <button
              className={`portfolio-feature ${item.logo ? "is-logo" : ""} ${item.portrait ? "is-portrait" : ""}`}
              type="button"
              onClick={() => setPlaying(item)}
              key={item.name}
            >
              <div className="portfolio-feature-visual">
                <img src={item.visual} alt="" loading="lazy" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="portfolio-feature-copy">
                <span>{item.kind}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <em>
                  Play video <ArrowUpRight />
                </em>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="client-collections-section">
        <header className="portfolio-section-head">
          <h2>Client work</h2>
          <p>Named client and creator collections supplied by Vencuts Media.</p>
        </header>
        <div className="client-collection-grid">
          {clientCollections.map((client, index) => (
            <button
              className={`client-collection ${client.portrait ? "is-portrait" : ""}`}
              type="button"
              onClick={() => setPlaying(client)}
              key={client.name}
            >
              <div className={client.visual ? "has-visual" : ""}>
                {client.visual ? (
                  <img src={client.visual} alt="" loading="lazy" />
                ) : (
                  <span>{String(index + 1).padStart(2, "0")}</span>
                )}
              </div>
              <span>{client.kind}</span>
              <h3>{client.name}</h3>
              <ArrowUpRight />
            </button>
          ))}
        </div>
      </section>

      <section className="portfolio-categories-section">
        <header className="portfolio-section-head">
          <h2>Work by category</h2>
          <p>Browse the supplied films and collections by format.</p>
        </header>
        <div className="work-category-index" aria-label="Work categories">
          {workCategories.map((category) => (
            <a
              className="work-category-row"
              href={category.href}
              key={category.slug}
            >
              <span>{category.index}</span>
              <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <em>
                {String(category.projects.length).padStart(2, "0")} PROJECT
                {category.projects.length === 1 ? "" : "S"}
              </em>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>

      <section className="work-page-cta">
        <span>YOUR STORY / NEXT</span>
        <h2>
          Need the right cut
          <br />
          for your idea?
        </h2>
        <a href="/contact">
          Start a project <ArrowUpRight />
        </a>
      </section>

      <PortfolioPlayer item={playing} onClose={() => setPlaying(null)} />

      <footer className="contact-footer">
        <span>© 2026 VENCUTS MEDIA</span>
        <a href="mailto:venkateswarans@vencutsmedia.com">
          VENKATESWARANS@VENCUTSMEDIA.COM
        </a>
        <span>PORTFOLIO · CLIENTS · CATEGORIES</span>
      </footer>
    </main>
  );
}
