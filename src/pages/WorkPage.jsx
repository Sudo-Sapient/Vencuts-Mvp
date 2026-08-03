import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import Logo from "../components/Logo";
import { navItems, workCategories } from "../data/site";

export default function WorkPage() {
  const page = useRef();
  const [menu, setMenu] = useState(false);

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

      gsap.utils.toArray(".work-category-row").forEach((row, index) => {
        gsap.from(row, {
          y: 50,
          opacity: 0,
          duration: 0.85,
          delay: (index % 3) * 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 92%" },
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
          <span>WORK / CATEGORIES</span>
          <span>01—08</span>
        </div>
        <h1 className="work-page-title">
          <span>EIGHT WAYS</span>
          <span>
            TO SHAPE <i>THE CUT.</i>
          </span>
        </h1>
        <p className="work-page-intro">
          Category pages are ready for the approved projects and videos being
          supplied. No temporary project claims or client results are shown.
        </p>
      </section>

      <section className="work-category-index" aria-label="Work categories">
        {workCategories.map((category) => (
          <a
            className="work-category-row"
            href={category.href}
            key={category.slug}
          >
            <span>{category.index}</span>
            <div>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
            <em>04 MEDIA SLOTS</em>
            <ArrowUpRight />
          </a>
        ))}
      </section>

      <section className="work-page-cta">
        <span>PROJECT FILES INCOMING</span>
        <h2>
          The structure is ready.
          <br />
          The real work comes next.
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
        <span>WORK CATEGORIES / 01—08</span>
      </footer>
    </main>
  );
}
