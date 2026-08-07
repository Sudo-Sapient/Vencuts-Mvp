import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";

export default function PortfolioPlayer({ item, onClose }) {
  const closeButton = useRef(null);

  useEffect(() => {
    if (!item) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="portfolio-player"
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${item.title || item.name}`}
    >
      <button
        ref={closeButton}
        className="portfolio-player-close"
        type="button"
        onClick={onClose}
        aria-label="Close video"
      >
        <X />
      </button>

      <div
        className={`portfolio-player-stage ${item.portrait ? "is-portrait" : ""}`}
      >
        {item.playerType === "video" ? (
          <video
            src={item.player}
            poster={item.visual}
            autoPlay
            muted
            controls
            playsInline
            preload="auto"
            onCanPlay={(event) => event.currentTarget.play().catch(() => {})}
          />
        ) : (
          <iframe
            src={item.player}
            title={item.title || item.name}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        )}
      </div>

      <footer className="portfolio-player-meta">
        <div>
          <span>{item.format || item.kind}</span>
          <h2>{item.title || item.name}</h2>
        </div>
        {item.source && (
          <a href={item.source} target="_blank" rel="noreferrer">
            Open original <ExternalLink />
          </a>
        )}
      </footer>
    </div>
  );
}
