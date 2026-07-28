import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Play, Volume2, VolumeX, X } from "lucide-react";
import gsap from "gsap";
import Intro from "../components/Intro";
import Logo from "../components/Logo";
import { clientLogos, media, navItems } from "../data/site";

export default function HomePage() {
  const root = useRef();
  const heroVideo = useRef();
  const reelVideo = useRef();
  const contactButton = useRef();
  const [menu, setMenu] = useState(false);
  const [muted, setMuted] = useState(true);
  const [reelMuted, setReelMuted] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-copy > *", { y: 70, opacity: 0 });
      gsap.set(".nav", { y: -40, opacity: 0 });
      gsap.set(".hero-media", { scale: 1.08 });
      gsap.set(".hero-mark", { scale: 0.82, opacity: 0 });
      gsap.utils.toArray(".reveal").forEach((el) =>
        gsap.from(el, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }),
      );
      gsap.utils.toArray(".line-reveal").forEach((el) =>
        gsap.from(el, {
          width: 0,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }),
      );
      gsap.to(".hero-media", {
        scale: 1.12,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".showreel-media", {
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".showreel",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!introDone) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-media", { scale: 1, duration: 1.8 }, 0)
        .to(".hero-mark", { scale: 1, opacity: 1, duration: 1.5 }, 0)
        .to(".nav", { y: 0, opacity: 1, duration: 1 }, 0.15)
        .to(
          ".hero-copy > *",
          { y: 0, opacity: 1, duration: 1.15, stagger: 0.1 },
          0.25,
        )
        .fromTo(
          ".sound",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.8)" },
          0.9,
        );
    }, root);
    return () => ctx.revert();
  }, [introDone]);

  const toggleReelSound = (e) => {
    e.stopPropagation();
    if (!reelVideo.current) return;
    const nextMuted = !reelVideo.current.muted;
    reelVideo.current.muted = nextMuted;
    setReelMuted(nextMuted);
    reelVideo.current.play();
  };
  const magnet = (e) => {
    const rect = contactButton.current.getBoundingClientRect();
    gsap.to(contactButton.current, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.2,
      y: (e.clientY - rect.top - rect.height / 2) * 0.2,
      duration: 0.3,
    });
  };

  useEffect(() => {
    if (!introDone || !reelVideo.current) return;
    const video = reelVideo.current;
    video.muted = false;
    setReelMuted(false);
    video.play().catch(() => {
      video.muted = true;
      setReelMuted(true);
      video.play();
    });
  }, [introDone]);

  return (
    <main ref={root} id="top">
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <nav className="nav">
        <Logo />
        <div className="nav-links">
          {navItems.map(([label, path]) => (
            <a href={path} key={path}>
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

      <section className="hero">
        <video
          ref={heroVideo}
          className="hero-media"
          autoPlay
          muted={muted}
          loop
          playsInline
          poster={media.work1}
        >
          <source src={media.hero} type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <img
          className="hero-mark"
          src="/assets/vencuts-mark-white.png"
          alt=""
        />
        <div className="hero-copy">
          <h1>
            Stories people
            <br />
            <em>remember.</em>
          </h1>
          <p className="hero-sub">
            Films, content and personal brands built to move people.
          </p>
          <div className="hero-actions">
            <a className="hero-watch" href="/showreel">
              <span>Watch the reel</span>
              <i>
                <Play size={16} fill="currentColor" />
              </i>
            </a>
            <a className="hero-project" href="/contact">
              Start a project <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-meta">
          <span className="rec-dot" /> REC&nbsp; 00:00:12&nbsp; /
          &nbsp;BANGALORE&nbsp; / &nbsp;4K 24FPS
        </div>
        <div className="shot-progress">
          <span>01</span>
          <i>
            <b />
          </i>
          <span>04</span>
        </div>
        <button className="sound" onClick={() => setMuted(!muted)}>
          {muted ? <VolumeX /> : <Volume2 />}
        </button>
        <div className="scroll-label">
          SCROLL TO EXPLORE <span />
        </div>
      </section>

      <section
        className="trusted trusted-logos"
        aria-label="Selected client collaborations"
      >
        <div className="trusted-logos-head">
          <p>WORKED WITH</p>
          <span>19 CLIENT COLLABORATIONS</span>
        </div>
        <div className="logo-marquee">
          <div className="logo-marquee-track">
            {[0, 1].map((group) => (
              <div
                className="logo-marquee-group"
                aria-hidden={group === 1 ? "true" : undefined}
                key={group}
              >
                {clientLogos.map((client) => (
                  <div
                    className={`logo-marquee-item logo-marquee-${client.fit} logo-client-${client.slug}`}
                    key={`${group}-${client.slug}`}
                  >
                    <span className="logo-marquee-art">
                      <img
                        src={`/assets/clients/${client.file}`}
                        alt={group === 0 ? `${client.name} logo` : ""}
                      />
                    </span>
                    <span className="logo-marquee-name">{client.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="showreel showreel-clean" id="showreel">
        <div className="showreel-wrap">
          <video
            ref={reelVideo}
            className="showreel-media"
            autoPlay
            muted={reelMuted}
            loop
            playsInline
            preload="auto"
            poster="/media/showreel/vencuts-showreel-poster.jpg"
          >
            <source src={media.reel} type="video/mp4" />
          </video>
          <button
            className="reel-sound-toggle"
            type="button"
            onClick={toggleReelSound}
            aria-label={
              reelMuted ? "Turn showreel sound on" : "Turn showreel sound off"
            }
          >
            {reelMuted ? <VolumeX /> : <Volume2 />}
          </button>
        </div>
      </section>

      <section className="home-team-preview" id="team">
        <div className="home-team-film reveal">
          <video
            src="/media/team/team-footer-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div className="home-team-copy reveal">
          <span>THE PEOPLE BEHIND THE CUT</span>
          <h2>
            Small team.
            <br />
            Close to every frame.
          </h2>
          <p>
            A close-knit team shaping every project from the first idea to the
            final export.
          </p>
          <a href="/team">
            Meet the team <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="contact work-with-us" id="contact">
        <p className="contact-label reveal">WORK WITH US</p>
        <h2 className="reveal">
          Have a story
          <br />
          worth <i>telling?</i>
        </h2>
        <p className="reveal">Let's build something people remember.</p>
        <a
          ref={contactButton}
          onMouseMove={magnet}
          onMouseLeave={() => gsap.to(contactButton.current, { x: 0, y: 0 })}
          className="contact-btn reveal"
          href="/contact"
        >
          Start your project <ArrowUpRight />
        </a>
      </section>

      <footer>
        <div className="footer-top">
          <Logo footer />
          <div className="footer-links">
            <div>
              <span>EXPLORE</span>
              <a href="#top">Home</a>
              <a href="#showreel">Showreel</a>
              <a href="/team">Team</a>
            </div>
            <div>
              <span>START A CONVERSATION</span>
              <a href="/contact">Project brief</a>
              <a href="mailto:venkateswarans@vencutsmedia.com">
                venkateswarans@vencutsmedia.com
              </a>
            </div>
          </div>
        </div>
        <div className="footer-word">VENCUTS</div>
        <div className="footer-bottom">
          <span>© 2026 VENCUTS MEDIA</span>
          <span>CREATING STORIES PEOPLE REMEMBER.</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
