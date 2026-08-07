import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  FolderOpen,
  Menu,
  Play,
  X,
} from "lucide-react";
import gsap from "gsap";
import Logo from "../components/Logo";
import PortfolioPlayer from "../components/PortfolioPlayer";
import { navItems } from "../data/site";
import { getWorkCategory } from "../data/portfolio";

export default function WorkCategoryPage({ slug }) {
  const page = useRef();
  const [menu, setMenu] = useState(false);
  const [playing, setPlaying] = useState(null);
  const category = getWorkCategory(slug);

  useEffect(() => {
    if (!category) return;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .from(".category-nav", { y: -40, opacity: 0, duration: 0.85 })
        .from(".category-back", { y: 15, opacity: 0, duration: 0.55 }, 0.15)
        .from(
          ".category-title span",
          { yPercent: 110, duration: 1, stagger: 0.08 },
          0.2,
        )
        .from(
          ".category-description, .category-status",
          { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 },
          0.45,
        );

      gsap.utils.toArray(".category-project-card").forEach((card, index) => {
        gsap.from(card, {
          y: 45,
          opacity: 0,
          duration: 0.8,
          delay: (index % 2) * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%" },
        });
      });
    }, page);
    return () => ctx.revert();
  }, [category]);

  if (!category) {
    return (
      <main className="work-category-page category-missing">
        <nav className="nav">
          <Logo />
        </nav>
        <section className="category-empty">
          <span>WORK / CATEGORY NOT FOUND</span>
          <h1>This category is not available.</h1>
          <a href="/work">
            <ArrowLeft size={16} /> Back to work
          </a>
        </section>
      </main>
    );
  }

  return (
    <main ref={page} className="work-category-page" id="top">
      <nav className="nav category-nav">
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

      <section className="category-hero">
        <a className="category-back" href="/work">
          <ArrowLeft size={16} /> Portfolio
        </a>
        <div className="category-status">
          <span>WORK CATEGORY / {category.index}</span>
          <span>
            {String(category.projects.length).padStart(2, "0")} SELECTED
          </span>
        </div>
        <h1 className="category-title">
          <span>{category.name}</span>
        </h1>
        <p className="category-description">{category.description}</p>
      </section>

      <section className="category-projects category-projects-live">
        <header>
          <span>SELECTED WORK</span>
          <p>
            Open a film or collection to view the original media supplied by
            Vencuts Media.
          </p>
        </header>
        <div className="category-project-grid">
          {category.projects.map((project, index) => (
            <button
              className={`category-project-card is-${project.kind} ${project.portrait ? "is-portrait" : ""}`}
              type="button"
              onClick={() => setPlaying(project)}
              key={`${project.title}-${index}`}
            >
              <div className="category-project-visual">
                <img src={project.visual} alt="" loading="lazy" />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i>
                  {project.kind === "collection" ? (
                    <FolderOpen aria-hidden="true" />
                  ) : (
                    <Play aria-hidden="true" />
                  )}
                </i>
              </div>
              <div className="category-project-meta-live">
                <div>
                  <h2>{project.title}</h2>
                  <p>{project.format}</p>
                </div>
                <em>
                  {project.kind === "collection"
                    ? "Play selection"
                    : "Watch film"}
                  <ArrowUpRight />
                </em>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="work-page-cta category-cta">
        <span>{category.name.toUpperCase()} / NEXT</span>
        <h2>
          Have a project
          <br />
          in this format?
        </h2>
        <div>
          <a href="/contact">
            Start a project <ArrowUpRight />
          </a>
          <a href="/work">View full portfolio</a>
        </div>
      </section>

      <PortfolioPlayer item={playing} onClose={() => setPlaying(null)} />

      <footer className="contact-footer">
        <span>© 2026 VENCUTS MEDIA</span>
        <a href="mailto:venkateswarans@vencutsmedia.com">
          VENKATESWARANS@VENCUTSMEDIA.COM
        </a>
        <span>{category.name.toUpperCase()} · SELECTED WORK</span>
      </footer>
    </main>
  );
}
