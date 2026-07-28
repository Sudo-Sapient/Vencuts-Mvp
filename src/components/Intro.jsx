import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";

function LoaderField() {
  const field = useRef();
  const positions = useMemo(() => {
    const data = new Float32Array(700 * 3);
    for (let i = 0; i < 700; i++) {
      data[i * 3] = (Math.random() - 0.5) * 11;
      data[i * 3 + 1] = (Math.random() - 0.5) * 7;
      data[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return data;
  }, []);
  useFrame((state, delta) => {
    if (!field.current) return;
    field.current.rotation.z += delta * 0.025;
    field.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
  });
  return (
    <points ref={field}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#090909"
        size={0.018}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function Intro({ onComplete }) {
  const intro = useRef();
  useEffect(() => {
    document.body.classList.add("intro-lock");
    const q = gsap.utils.selector(intro);
    const finish = () => {
      document.body.classList.remove("intro-lock");
      onComplete();
    };
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: finish,
    });
    if (reduced) {
      tl.set(q(".cut-blade"), { x: 0, y: 0, rotation: 0, opacity: 1 })
        .to(q(".cut-logo"), { opacity: 1, duration: 0.35 })
        .to(q(".cut-word"), { opacity: 1, duration: 0.2 }, 0.25)
        .to(intro.current, { opacity: 0, duration: 0.45 }, 0.65);
    } else {
      tl.set(q(".cut-logo"), { scale: 0.32, opacity: 0, filter: "blur(18px)" })
        .set(q(".cut-blade"), { x: 0, y: 0, rotation: 0, opacity: 1 })
        .set(q(".loader-word span"), { yPercent: 120 })
        .set(q(".loader-rule"), { scaleX: 0 })
        .set(q(".loader-corners i"), { opacity: 0, scale: 1.5 })
        .set(q(".cut-word, .cut-marker, .cut-flash"), { opacity: 0 })
        .to(
          q(".loader-corners i"),
          { opacity: 1, scale: 1, duration: 0.65, stagger: 0.07 },
          0.1,
        )
        .to(q(".loader-rule"), { scaleX: 1, duration: 1.25 }, 0.2)
        .to(
          q(".cut-logo"),
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.45 },
          0.35,
        )
        .to(
          q(".loader-word span"),
          { yPercent: 0, duration: 0.75, stagger: 0.1 },
          0.8,
        )
        .to(
          q(".loader-index"),
          {
            textContent: 100,
            duration: 2.5,
            snap: { textContent: 1 },
            ease: "power2.inOut",
          },
          0.25,
        )
        .to(
          q(".cut-logo"),
          { scale: 1.07, duration: 0.6, ease: "sine.inOut" },
          1.85,
        )
        .to(
          q(".loader-word"),
          { letterSpacing: ".62em", opacity: 0.25, duration: 0.65 },
          2.35,
        )
        .to(q(".legacy-loader-ui"), { opacity: 0, duration: 0.38 }, 2.72)
        .to(q(".cut-logo"), { scale: 0.96, duration: 0.28 }, 2.72)
        .to(
          q(".cut-upper"),
          { x: 11, y: -8, rotation: 0.8, duration: 0.3, ease: "power2.out" },
          2.92,
        )
        .to(
          q(".cut-lower"),
          { x: -11, y: 8, rotation: -0.8, duration: 0.3, ease: "power2.out" },
          2.92,
        )
        .to(
          q(".cut-marker"),
          { opacity: 1, scaleY: 1, duration: 0.12, ease: "none" },
          3.14,
        )
        .to(q(".cut-scene-label"), { opacity: 1, duration: 0.15 }, 3.14)
        .to(
          q(".cut-upper, .cut-lower"),
          { x: 0, y: 0, rotation: 0, duration: 0.12, ease: "power4.in" },
          3.38,
        )
        .to(
          q(".cut-marker, .cut-scene-label"),
          { opacity: 0, duration: 0.04 },
          3.48,
        )
        .to(
          q(".cut-flash"),
          { opacity: 1, scaleX: 1, duration: 0.05, ease: "none" },
          3.49,
        )
        .to(q(".cut-flash"), { opacity: 0, duration: 0.1 }, 3.54)
        .to(q(".cut-word"), { opacity: 1, y: 0, duration: 0.18 }, 3.5)
        .to(
          q(".cut-logo"),
          { scale: 1.035, duration: 0.22, ease: "power2.out" },
          3.55,
        )
        .to(
          q(".cut-word"),
          { opacity: 0, letterSpacing: ".45em", duration: 0.22 },
          3.86,
        )
        .to(
          q(".cut-upper"),
          { x: 95, y: -70, opacity: 0, duration: 0.64, ease: "expo.inOut" },
          3.94,
        )
        .to(
          q(".cut-lower"),
          { x: -90, y: 75, opacity: 0, duration: 0.64, ease: "expo.inOut" },
          3.94,
        )
        .to(q(".loader-webgl"), { opacity: 0, duration: 0.45 }, 3.9)
        .to(
          q(".cut-panel-a"),
          { xPercent: 105, yPercent: -18, duration: 0.82, ease: "expo.inOut" },
          3.92,
        )
        .to(
          q(".cut-panel-b"),
          { xPercent: -105, yPercent: 18, duration: 0.82, ease: "expo.inOut" },
          3.92,
        )
        .to(intro.current, { opacity: 0, duration: 0.12, ease: "none" }, 4.68);
    }
    const safety = setTimeout(finish, 5800);
    return () => {
      tl.kill();
      clearTimeout(safety);
      document.body.classList.remove("intro-lock");
    };
  }, [onComplete]);
  return (
    <div ref={intro} className="intro cut-intro" aria-hidden="true">
      <div className="cut-panel cut-panel-a" />
      <div className="cut-panel cut-panel-b" />
      <div className="loader-webgl">
        <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 4.5], fov: 55 }}>
          <LoaderField />
        </Canvas>
      </div>
      <div className="loader-corners legacy-loader-ui">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="loader-top legacy-loader-ui">
        <span>VENCUTS® / BANGALORE</span>
        <span>FILM · CONTENT · CULTURE</span>
      </div>
      <div className="cut-logo">
        <svg viewBox="0 0 250 250" role="presentation">
          <path
            className="cut-blade cut-lower"
            d="M163 137.051L154.985 171.813L84 137.051L113.111 107.94L163 137.051Z"
            fill="#4D4D4D"
          />
          <path
            className="cut-blade cut-upper"
            d="M163.024 61V107.563L84.0239 137V91.5907L163.024 61Z"
            fill="#090909"
          />
        </svg>
        <i className="cut-marker" />
        <span className="cut-scene-label">AWAITING CUT</span>
        <span className="cut-word">CUT</span>
      </div>
      <div className="loader-word legacy-loader-ui">
        <span>MAKE</span>
        <span>THEM</span>
        <span>FEEL</span>
        <span>SOMETHING.</span>
      </div>
      <div className="loader-bottom legacy-loader-ui">
        <div className="loader-rule" />
        <span>LOADING THE FIRST FRAME</span>
        <b>
          <span className="loader-index">0</span>%
        </b>
      </div>
      <div className="loader-timecode legacy-loader-ui">
        00:00:04:12
        <br />
        ROLLING
      </div>
      <div className="cut-flash" />
    </div>
  );
}
