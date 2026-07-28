import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import Logo from "../components/Logo";
import { contactServices, navItems } from "../data/site";

export default function ContactPage() {
  const page = useRef();
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState("Content Marketing");
  const [sent, setSent] = useState(false);
  const [timecode, setTimecode] = useState("00:00:00:00");
  useEffect(() => {
    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      const seconds = Math.floor(frame / 24);
      const minutes = Math.floor(seconds / 60);
      setTimecode(
        `00:${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}:${String(frame % 24).padStart(2, "0")}`,
      );
    }, 1000 / 24);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".contact-nav", { y: -40, opacity: 0, duration: 0.9 })
        .from(
          ".contact-meta > *",
          { y: 18, opacity: 0, duration: 0.65, stagger: 0.08 },
          0.15,
        )
        .from(
          ".contact-title-line span",
          { yPercent: 115, duration: 1.15, stagger: 0.1 },
          0.2,
        )
        .from(".contact-start", { y: 25, opacity: 0, duration: 0.8 }, 0.65);
      gsap.utils.toArray(".contact-form-row").forEach((row, i) =>
        gsap.from(row, {
          y: 45,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.03,
          scrollTrigger: { trigger: row, start: "top 90%" },
        }),
      );
    }, page);
    return () => {
      clearInterval(timer);
      ctx.revert();
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    requestAnimationFrame(() =>
      gsap.fromTo(
        ".export-complete",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut" },
      ),
    );
  };
  return (
    <main ref={page} className="contact-page" id="top">
      <nav className="nav contact-nav">
        <Logo />
        <div className="nav-links">
          {navItems.map(([label, path]) => (
            <a
              className={path === "/contact" ? "active" : ""}
              href={path}
              key={path}
            >
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#project-brief">
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
      <section className="contact-hero">
        <div className="contact-meta">
          <span>VENCUTS / NEW PROJECT</span>
          <span>
            TC {timecode}
            <br />
            BANGALORE · INDIA · EVERYWHERE
          </span>
        </div>
        <div className="contact-title">
          <div className="contact-title-line">
            <span>LET'S PUT YOUR IDEA</span>
          </div>
          <div className="contact-title-line outline">
            <span>ON THE TIMELINE.</span>
          </div>
        </div>
        <a className="contact-start" href="#project-brief">
          DROP YOUR BRIEF <ArrowUpRight />
        </a>
        <div className="contact-chapters">
          <span className="active">01 STORY</span>
          <span>02 FORMAT</span>
          <span>03 DETAILS</span>
          <span>04 EXPORT</span>
        </div>
      </section>
      <section className="brief-section" id="project-brief">
        {sent ? (
          <div className="export-complete">
            <span>EXPORT / 100%</span>
            <h1>
              BRIEF
              <br />
              EXPORTED.
            </h1>
            <p>
              You're officially on our timeline. We'll respond within one
              business day.
            </p>
            <a href="/">
              Return home <ArrowUpRight />
            </a>
          </div>
        ) : (
          <>
            <header className="brief-heading">
              <span>NEW PROJECT / 001</span>
              <h2>
                Give us the
                <br />
                <i>rough cut.</i>
              </h2>
              <p>
                No polished brief needed. Tell us where you are, what needs to
                move, and what success should look like.
              </p>
            </header>
            <form className="timeline-form" onSubmit={submit}>
              <label className="contact-form-row">
                <span>01</span>
                <b>YOUR NAME</b>
                <input required name="name" placeholder="Type your name" />
              </label>
              <label className="contact-form-row">
                <span>02</span>
                <b>BRAND / COMPANY</b>
                <input name="company" placeholder="Who are we creating for?" />
              </label>
              <div className="contact-form-row service-row">
                <span>03</span>
                <b>SERVICES WE OFFER</b>
                <div className="service-clips">
                  {contactServices.map((item) => (
                    <button
                      type="button"
                      className={service === item ? "selected" : ""}
                      onClick={() => setService(item)}
                      key={item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <label className="contact-form-row">
                <span>04</span>
                <b>YOUR ROUGH IDEA</b>
                <textarea
                  required
                  name="brief"
                  placeholder="What should this project achieve?"
                />
              </label>
              <label className="contact-form-row">
                <span>05</span>
                <b>EMAIL</b>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                />
              </label>
              <label className="contact-form-row">
                <span>06</span>
                <b>TIMELINE</b>
                <select name="timeline" defaultValue="">
                  <option value="" disabled>
                    Select delivery window
                  </option>
                  <option>ASAP</option>
                  <option>2–4 weeks</option>
                  <option>1–2 months</option>
                  <option>Flexible</option>
                </select>
              </label>
              <button className="export-brief" type="submit">
                <span>EXPORT YOUR BRIEF</span>
                <i />
                <ArrowUpRight />
              </button>
            </form>
          </>
        )}
      </section>
      <footer className="contact-footer">
        <span>© 2026 VENCUTS MEDIA</span>
        <a href="mailto:venkateswarans@vencutsmedia.com">
          VENKATESWARANS@VENCUTSMEDIA.COM
        </a>
        <span>FIRST FRAME → FINAL CUT</span>
      </footer>
    </main>
  );
}
