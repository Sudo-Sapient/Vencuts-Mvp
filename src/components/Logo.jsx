export default function Logo({ light = true, footer = false }) {
  return (
    <a
      href="/"
      className={`logo ${light ? "light" : ""} ${footer ? "footer-logo" : ""}`}
      aria-label="Vencuts home"
    >
      <img
        src={
          footer
            ? "/assets/vencuts-logo-white.png"
            : "/assets/vencuts-mark-white.png"
        }
        alt=""
      />
      {!footer && <span>VENCUTS</span>}
    </a>
  );
}
