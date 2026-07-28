import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import Logo from "../components/Logo";
import { media, navItems, teamMembers, teamVideo } from "../data/site";

export default function TeamPage() {
  const page = useRef();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".team-nav", { y: -40, opacity: 0, duration: 0.9 })
        .from(
          ".simple-team-title span",
          { yPercent: 110, duration: 1.05, stagger: 0.09 },
          0.15,
        )
        .from(
          ".simple-team-kicker",
          { opacity: 0, y: 12, duration: 0.65 },
          0.45,
        )
        .from(
          ".team-hero-film",
          { clipPath: "inset(0 100% 0 0)", duration: 1.35 },
          0.55,
        );
      gsap.utils.toArray(".team-editor").forEach((editor, i) => {
        gsap.from(editor, {
          y: 70,
          opacity: 0,
          duration: 0.95,
          delay: (i % 2) * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: editor, start: "top 88%" },
        });
      });
      gsap.from(".shared-edit-copy > *", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        scrollTrigger: { trigger: ".shared-edit", start: "top 78%" },
      });
      gsap.from(".founder-simple > *", {
        y: 55,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        scrollTrigger: { trigger: ".founder-simple", start: "top 80%" },
      });
      gsap.from(".team-closing-film", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".team-closing-film", start: "top 86%" },
      });
    }, page);
    return () => ctx.revert();
  }, []);
  const editors = teamMembers;
  return (
    <main ref={page} className="simple-team-page" id="top">
      <nav className="nav team-nav">
        <Logo />
        <div className="nav-links">
          {navItems.map(([label, path]) => (
            <a
              className={path === "/team" ? "active" : ""}
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

      <section className="simple-team-hero">
        <div className="simple-team-kicker">
          <span>THE TEAM BEHIND VENCUTS</span>
          <span>BANGALORE · INDIA</span>
        </div>
        <h1 className="simple-team-title">
          <span>FIVE PEOPLE.</span>
          <span>ONE SHARED</span>
          <span>
            <i>POINT OF VIEW.</i>
          </span>
        </h1>
        <div className="team-hero-film">
          <video
            src={teamVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="team-film-caption">
            <span>VENCUTS / STUDIO FILM</span>
            <span>PLAYBACK · 24FPS</span>
          </div>
        </div>
      </section>

      <section className="editors-section">
        <header>
          <span>THE TEAM / 01—05</span>
          <p>
            Four editors and one operations lead, connected by the same
            attention to story, pace and every detail in between.
          </p>
        </header>
        <div className="editors-grid">
          {editors.map((editor, i) => (
            <article
              className={`team-editor team-editor-${i + 1}${editor.type === "image" ? " team-editor-photo" : " team-editor-video"}`}
              key={editor.name}
            >
              <div className="editor-film">
                {editor.type === "image" ? (
                  <img
                    src={editor.media}
                    alt={`${editor.name} — ${editor.role}`}
                  />
                ) : (
                  <video src={editor.media} autoPlay muted loop playsInline />
                )}
                <span>
                  {editor.index} /{" "}
                  {editor.role === "Operations" ? "OPERATIONS" : "EDITOR"}
                </span>
              </div>
              <div className="editor-info">
                <span>{editor.index}</span>
                <div>
                  <h2>{editor.name}</h2>
                  <b>{editor.role}</b>
                  <p>{editor.copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shared-edit">
        <div className="shared-edit-film shared-edit-film-team">
          <video
            src="/media/team/team-footer-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div className="shared-edit-copy">
          <span>OUR SHARED INSTINCT</span>
          <h2>
            Different eyes.
            <br />
            The same attention
            <br />
            to every <i>frame.</i>
          </h2>
          <p>
            Every Vencuts project stays with editors from the first idea to the
            final export. Nothing gets lost between disconnected departments.
          </p>
        </div>
      </section>

      <section className="founder-simple">
        <div className="founder-simple-film">
          <img
            src="/media/team/venkateswaran-s.png"
            alt="Venkateswaran S — Founder and Editor at Vencuts"
          />
          <span>VENKATESWARAN S / FOUNDER & EDITOR</span>
        </div>
        <blockquote>
          “We stay small so the work never feels distant.”
        </blockquote>
        <p>
          Vencuts is intentionally close-knit. The people understanding the
          brief are the same people shaping its rhythm, emotion and final frame.
        </p>
      </section>

      <section className="team-close-simple">
        <div className="team-close-heading">
          <span>FIVE PEOPLE / ONE FINAL CUT</span>
          <h2>
            Have a story
            <br />
            for this team?
          </h2>
        </div>
        <div className="team-closing-film">
          <video src={media.reel} autoPlay muted loop playsInline />
        </div>
        <div className="team-close-actions">
          <span>VENCUTS MEDIA · BANGALORE · INDIA · EVERYWHERE</span>
          <div>
            <a href="/#showreel">
              Watch the showreel <ArrowUpRight />
            </a>
            <a href="/contact">
              Start a project <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
      <footer className="contact-footer">
        <span>© 2026 VENCUTS MEDIA</span>
        <a href="mailto:venkateswarans@vencutsmedia.com">
          VENKATESWARANS@VENCUTSMEDIA.COM
        </a>
        <span>FIVE PEOPLE · ONE CUT</span>
      </footer>
    </main>
  );
}
