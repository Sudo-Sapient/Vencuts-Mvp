import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Menu, Play, X } from "lucide-react";
import gsap from "gsap";
import Logo from "../components/Logo";
import { getWorkCategory, navItems } from "../data/site";

export default function WorkCategoryPage({ slug }) {
  const page = useRef();
  const [menu, setMenu] = useState(false);
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

      gsap.utils.toArray(".category-project-slot").forEach((slot, index) => {
        gsap.from(slot, {
          y: 45,
          opacity: 0,
          duration: 0.8,
          delay: (index % 2) * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: slot, start: "top 92%" },
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
          <ArrowLeft size={16} /> All categories
        </a>
        <div className="category-status">
          <span>WORK CATEGORY / {category.index}</span>
          <span>PROJECT MEDIA INCOMING</span>
        </div>
        <h1 className="category-title">
          <span>{category.name}</span>
        </h1>
        <p className="category-description">{category.description}</p>
      </section>

      <section className="category-projects">
        <header>
          <span>PROJECT PLACEHOLDERS</span>
          <p>
            These slots are intentionally empty. Replace each one with the
            supplied film, thumbnail, title and approved project information.
          </p>
        </header>
        <div className="category-project-grid">
          {category.slots.map((slot, index) => (
            <article className="category-project-slot" key={slot.label}>
              <div className="category-slot-screen">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Play aria-hidden="true" />
                <b>VIDEO / PROJECT PLACEHOLDER</b>
              </div>
              <div className="category-slot-meta">
                <div>
                  <h2>{slot.label}</h2>
                  <p>{slot.format}</p>
                </div>
                <span>{slot.ratio}</span>
                <em>{slot.status}</em>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work-page-cta category-cta">
        <span>{category.name.toUpperCase()} / NEXT PROJECT</span>
        <h2>
          Have a project
          <br />
          for this category?
        </h2>
        <div>
          <a href="/contact">
            Start a project <ArrowUpRight />
          </a>
          <a href="/work">View all categories</a>
        </div>
      </section>

      <footer className="contact-footer">
        <span>© 2026 VENCUTS MEDIA</span>
        <a href="mailto:venkateswarans@vencutsmedia.com">
          VENKATESWARANS@VENCUTSMEDIA.COM
        </a>
        <span>{category.name.toUpperCase()} / PLACEHOLDERS</span>
      </footer>
    </main>
  );
}
