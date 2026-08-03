import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Maximize,
  Menu,
  Minimize,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import Logo from "../components/Logo";
import { media, navItems } from "../data/site";

export default function ShowreelPage() {
  const screen = useRef();
  const video = useRef();
  const [menu, setMenu] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const film = video.current;
    if (!film) return;
    film.muted = false;
    film.play().catch(() => {
      film.muted = true;
      setMuted(true);
      film.play();
    });
  }, []);

  const enterCinema = () => {
    setEntered(true);
    enterFullscreen();
    const film = video.current;
    if (film) {
      film.muted = false;
      setMuted(false);
      film.currentTime = 0;
      film.play().catch(() => {
        film.muted = true;
        setMuted(true);
        film.play();
      });
      setPlaying(true);
    }
  };

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const enterFullscreen = () => {
    const el = screen.current;
    if (!el) return;
    const request = el.requestFullscreen || el.webkitRequestFullscreen;
    request?.call(el).catch(() => {});
  };
  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      (document.exitFullscreen || document.webkitExitFullscreen)?.call(
        document,
      );
    } else {
      enterFullscreen();
    }
  };

  const togglePlayback = () => {
    if (!video.current) return;
    if (video.current.paused) video.current.play();
    else video.current.pause();
    setPlaying(!video.current.paused);
  };
  const toggleSound = () => {
    if (!video.current) return;
    video.current.muted = !video.current.muted;
    setMuted(video.current.muted);
    video.current.play();
    setPlaying(true);
  };

  return (
    <main className="showreel-page" id="top">
      <nav className="nav showreel-page-nav">
        <Logo />
        <div className="nav-links">
          {navItems.map(([label, path]) => (
            <a
              className={path === "/showreel" ? "active" : ""}
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
      {!entered && (
        <button type="button" className="cinema-enter" onClick={enterCinema}>
          <span className="cinema-enter-kicker">
            VENCUTS · OFFICIAL SHOWREEL
          </span>
          <span className="cinema-enter-play">
            <Play fill="currentColor" />
          </span>
          <span className="cinema-enter-label">Enter the screening room</span>
          <span className="cinema-enter-hint">
            Full screen · Sound on · 02:06
          </span>
        </button>
      )}
      <section className="cinema-screen" ref={screen}>
        <video
          ref={video}
          src={media.reel}
          autoPlay
          loop
          playsInline
          preload="auto"
          poster="/media/showreel/vencuts-showreel-poster.jpg"
          onClick={togglePlayback}
          onTimeUpdate={(e) =>
            setProgress(
              e.currentTarget.duration
                ? (e.currentTarget.currentTime / e.currentTarget.duration) * 100
                : 0,
            )
          }
        />
        <div className="cinema-vignette" />
        <div className="cinema-topline">
          <span>VENCUTS / OFFICIAL SHOWREEL</span>
          <span>02:06 · 24 FPS</span>
        </div>
        <div className="cinema-controls">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "Pause showreel" : "Play showreel"}
          >
            {playing ? (
              <span className="pause-glyph" />
            ) : (
              <Play fill="currentColor" />
            )}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Turn sound on" : "Mute showreel"}
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Exit full screen" : "Watch full screen"}
          >
            {fullscreen ? <Minimize /> : <Maximize />}
          </button>
        </div>
        <div className="cinema-progress">
          <i style={{ width: `${progress}%` }} />
        </div>
        <a className="cinema-exit" href="/">
          Back to home <X size={16} />
        </a>
      </section>
    </main>
  );
}
