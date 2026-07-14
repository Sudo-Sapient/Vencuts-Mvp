import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Play, X, Volume2, VolumeX } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const media = {
  hero: '/media/hero.mp4',
  reel: '/media/reel.mp4',
  work1: '/media/work-01.jpg',
  work2: '/media/work-02.jpg',
  work3: '/media/work-03.jpg',
  work4: '/media/work-04.jpg',
  work5: '/media/work-05.jpg',
  team: '/media/team.jpg',
  bts1: '/media/bts-01.jpg',
  bts2: '/media/bts-02.jpg',
  bts3: '/media/bts-03.jpg',
}

const brands = ['CAUTIO', 'HEALTHY CHEF', 'NMIMS', 'IDARE', 'ABCK', 'STUDIO 11']
const services = [
  ['01', 'Production', 'From scripting to shooting—we make ideas cinematic.'],
  ['02', 'Editing', 'Fast-paced edits built to hold attention.'],
  ['03', 'Personal Branding', 'Helping founders become recognizable.'],
  ['04', 'Design', 'Carousels, posters, and campaigns built to stand out.'],
  ['05', 'Podcast Production', 'From camera setup to the final upload.'],
]
const principles = ['Story before trends', 'Quality before quantity', 'Fast without feeling rushed', 'Built around business goals', 'Content people actually remember']
const testimonials = [
  ['“Vencuts didn’t just make our content look better. They made our brand feel impossible to ignore.”', 'FOUNDER, CAUTIO'],
  ['“A rare team that understands both attention and business. Every frame has a reason.”', 'CREATOR & ENTREPRENEUR'],
  ['“The process was fast, honest, and ridiculously smooth. The results spoke even louder.”', 'BRAND LEAD, HEALTHY CHEF'],
  ['“They found the story we were trying to tell before we even knew how to articulate it.”', 'FOUNDER, IDARE'],
]

function GrainField({ logo = false }) {
  const points = useRef()
  const positions = useMemo(() => {
    const data = new Float32Array(1200 * 3)
    for (let i = 0; i < 1200; i++) {
      const p = i * 3
      if (logo && i < 700) {
        const side = i % 2 === 0 ? -1 : 1
        const progress = (i % 350) / 350
        data[p] = side * (2.15 - progress * 1.9) + (Math.random() - .5) * .18
        data[p + 1] = 1.9 - progress * 3.8 + (Math.random() - .5) * .18
        data[p + 2] = (Math.random() - .5) * .35
      } else {
        data[p] = (Math.random() - .5) * 12
        data[p + 1] = (Math.random() - .5) * 8
        data[p + 2] = (Math.random() - .5) * 5
      }
    }
    return data
  }, [logo])
  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.pointer.x * .08 + state.clock.elapsedTime * .018
    points.current.rotation.x = -state.pointer.y * .05 + Math.sin(state.clock.elapsedTime * .12) * .04
  })
  return <points ref={points}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#ffffff" size={logo ? 0.022 : 0.013} transparent opacity={logo ? 0.72 : 0.5} sizeAttenuation />
  </points>
}

function LoaderField() {
  const field = useRef()
  const positions = useMemo(() => {
    const data = new Float32Array(700 * 3)
    for (let i = 0; i < 700; i++) {
      data[i * 3] = (Math.random() - .5) * 11
      data[i * 3 + 1] = (Math.random() - .5) * 7
      data[i * 3 + 2] = (Math.random() - .5) * 5
    }
    return data
  }, [])
  useFrame((state, delta) => {
    if (!field.current) return
    field.current.rotation.z += delta * .025
    field.current.rotation.y = Math.sin(state.clock.elapsedTime * .35) * .12
  })
  return <points ref={field}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#ffffff" size={.018} transparent opacity={.55} sizeAttenuation />
  </points>
}

function Intro({ onComplete }) {
  const intro = useRef()
  useEffect(() => {
    document.body.classList.add('intro-lock')
    const q = gsap.utils.selector(intro)
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, onComplete: () => {
      document.body.classList.remove('intro-lock')
      onComplete()
    }})
    tl.set(q('.portal-logo'), { xPercent: -50, yPercent: -50, scale: .32, opacity: 0, filter: 'blur(18px)' })
      .set(q('.loader-word span'), { yPercent: 120 })
      .set(q('.loader-rule'), { scaleX: 0 })
      .set(q('.loader-corners i'), { opacity: 0, scale: 1.5 })
      .to(q('.loader-corners i'), { opacity: 1, scale: 1, duration: .65, stagger: .07 }, .1)
      .to(q('.loader-rule'), { scaleX: 1, duration: 1.25 }, .2)
      .to(q('.portal-logo'), { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.45 }, .35)
      .to(q('.loader-word span'), { yPercent: 0, duration: .75, stagger: .1 }, .8)
      .to(q('.loader-index'), { textContent: 100, duration: 2.5, snap: { textContent: 1 }, ease: 'power2.inOut' }, .25)
      .to(q('.portal-logo'), { scale: 1.08, duration: .8, ease: 'sine.inOut' }, 1.8)
      .to(q('.loader-word'), { letterSpacing: '.7em', opacity: .25, duration: .75 }, 2.45)
      .to(q('.loader-ui'), { opacity: 0, duration: .45 }, 2.85)
      .to(q('.portal-logo'), { scale: 8.5, opacity: 0, duration: 1.35, ease: 'expo.inOut' }, 2.85)
      .to(intro.current, { backgroundColor: 'rgba(3,3,3,0)', duration: .7 }, 3.25)
      .to(q('.loader-webgl'), { opacity: 0, duration: .5 }, 3.4)
      .to(intro.current, { opacity: 0, duration: .55, ease: 'power2.out' }, 3.75)
    const safety = setTimeout(() => {
      document.body.classList.remove('intro-lock')
      onComplete()
    }, 5200)
    return () => { tl.kill(); clearTimeout(safety); document.body.classList.remove('intro-lock') }
  }, [onComplete])
  return <div ref={intro} className="intro" aria-hidden="true">
    <div className="loader-webgl"><Canvas dpr={[1,1.25]} camera={{position:[0,0,4.5],fov:55}}><LoaderField/></Canvas></div>
    <div className="loader-corners loader-ui"><i/><i/><i/><i/></div>
    <div className="loader-top loader-ui"><span>VENCUTS® / BANGALORE</span><span>FILM · CONTENT · CULTURE</span></div>
    <div className="portal-logo"><img src="/assets/vencuts-mark-white.png" alt="" /></div>
    <div className="loader-word loader-ui"><span>MAKE</span><span>THEM</span><span>FEEL</span><span>SOMETHING.</span></div>
    <div className="loader-bottom loader-ui"><div className="loader-rule"/><span>LOADING THE FIRST FRAME</span><b><span className="loader-index">0</span>%</b></div>
    <div className="loader-timecode loader-ui">00:00:04:12<br/>ROLLING</div>
  </div>
}

function Logo({ light = true, footer = false }) {
  return <a href="#top" className={`logo ${light ? 'light' : ''} ${footer ? 'footer-logo' : ''}`} aria-label="Vencuts home">
    <img src={footer ? '/assets/vencuts-logo-white.png' : '/assets/vencuts-mark-white.png'} alt="" />
    {!footer && <span>VENCUTS</span>}
  </a>
}

function App() {
  const root = useRef()
  const heroVideo = useRef()
  const reelVideo = useRef()
  const reelCursor = useRef()
  const contactButton = useRef()
  const [menu, setMenu] = useState(false)
  const [muted, setMuted] = useState(true)
  const [reelPlaying, setReelPlaying] = useState(false)
  const [reelOpen, setReelOpen] = useState(false)
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-copy > *', { y: 70, opacity: 0 })
      gsap.set('.nav', { y: -40, opacity: 0 })
      gsap.set('.hero-media', { scale: 1.08 })
      gsap.set('.hero-mark', { scale: .82, opacity: 0 })
      gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, { y: 70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
      gsap.utils.toArray('.line-reveal').forEach(el => gsap.from(el, { width: 0, duration: 1.4, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 88%' } }))
      gsap.to('.hero-media', { scale: 1.12, yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.showreel-media', { scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.showreel', start: 'top bottom', end: 'bottom top', scrub: true } })
      const filmTrack = document.querySelector('.film-track')
      if (filmTrack && window.innerWidth > 900) {
        const distance = Math.max(0, filmTrack.scrollWidth - window.innerWidth + window.innerWidth * .12)
        gsap.to(filmTrack, { x: -distance, ease: 'none', scrollTrigger: { trigger: '.film-sequence', start: 'top top', end: `+=${Math.max(distance, 900)}`, pin: true, scrub: 1, invalidateOnRefresh: true } })
      }
      gsap.utils.toArray('.film-frame').forEach((frame, i) => gsap.from(frame, { y: i % 2 ? 70 : -70, opacity: 0, duration: 1, scrollTrigger: { trigger: frame, start: 'top 92%' } }))
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!introDone) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('.hero-media', { scale: 1, duration: 1.8 }, 0)
        .to('.hero-mark', { scale: 1, opacity: 1, duration: 1.5 }, 0)
        .to('.nav', { y: 0, opacity: 1, duration: 1 }, .15)
        .to('.hero-copy > *', { y: 0, opacity: 1, duration: 1.15, stagger: .1 }, .25)
        .fromTo('.sound', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.8)' }, .9)
    }, root)
    return () => ctx.revert()
  }, [introDone])

  const scrollTo = (id) => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }
  const playReel = () => {
    if (!reelVideo.current) return
    if (!reelOpen) {
      setReelOpen(true)
      setReelPlaying(true)
      requestAnimationFrame(() => reelVideo.current?.play())
      return
    }
    if (reelPlaying) reelVideo.current.pause(); else reelVideo.current.play()
    setReelPlaying(!reelPlaying)
  }
  const closeReel = (e) => {
    e?.stopPropagation()
    reelVideo.current?.pause()
    setReelPlaying(false)
    setReelOpen(false)
  }
  const moveReelCursor = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    gsap.to(reelCursor.current, { x: e.clientX - rect.left, y: e.clientY - rect.top, duration: .35, ease: 'power3.out' })
  }
  const magnet = (e) => {
    const rect = contactButton.current.getBoundingClientRect()
    gsap.to(contactButton.current, { x: (e.clientX - rect.left - rect.width / 2) * .2, y: (e.clientY - rect.top - rect.height / 2) * .2, duration: .3 })
  }

  useEffect(() => {
    if (!reelOpen) return
    document.body.classList.add('reel-lock')
    const close = (e) => e.key === 'Escape' && closeReel()
    window.addEventListener('keydown', close)
    return () => { document.body.classList.remove('reel-lock'); window.removeEventListener('keydown', close) }
  }, [reelOpen])

  return <main ref={root} id="top">
    {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
    <nav className="nav">
      <Logo />
      <div className="nav-links">
        <button onClick={() => scrollTo('#work')}>Work</button>
        <button onClick={() => scrollTo('#services')}>Services</button>
        <button onClick={() => scrollTo('#about')}>About</button>
      </div>
      <button className="nav-cta" onClick={() => scrollTo('#contact')}><span>Start a project</span><i><ArrowUpRight size={16}/></i></button>
      <button className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu"><Menu /></button>
    </nav>

    <div className={`mobile-menu ${menu ? 'open' : ''}`}>
      <button className="menu-close" onClick={() => setMenu(false)}><X /></button>
      {['Work', 'Services', 'About', 'Contact'].map(x => <button key={x} onClick={() => scrollTo(`#${x.toLowerCase()}`)}>{x}</button>)}
    </div>

    <section className="hero">
      <video ref={heroVideo} className="hero-media" autoPlay muted={muted} loop playsInline poster={media.work1}><source src={media.hero} type="video/mp4" /></video>
      <div className="hero-shade" />
      <img className="hero-mark" src="/assets/vencuts-mark-white.png" alt="" />
      <div className="hero-copy">
        <h1>Stories people<br/><em>remember.</em></h1>
        <p className="hero-sub">Films, content and personal brands built to move people.</p>
        <div className="hero-actions"><button className="hero-watch" onClick={() => scrollTo('#work')}><span>Watch the reel</span><i><Play size={16} fill="currentColor"/></i></button><button className="hero-project" onClick={() => scrollTo('#contact')}>Start a project <ArrowUpRight size={16}/></button></div>
      </div>
      <div className="hero-meta"><span className="rec-dot"/> REC&nbsp; 00:00:12&nbsp; / &nbsp;BANGALORE&nbsp; / &nbsp;4K 24FPS</div>
      <div className="shot-progress"><span>01</span><i><b/></i><span>04</span></div>
      <button className="sound" onClick={() => setMuted(!muted)}>{muted ? <VolumeX/> : <Volume2/>}</button>
      <div className="scroll-label">SCROLL TO EXPLORE <span /></div>
    </section>

    <section className="trusted">
      <p>TRUSTED BY AMBITIOUS TEAMS</p>
      <div className="marquee"><div>{[...brands, ...brands].map((b,i)=><span key={i}>{b}</span>)}</div></div>
    </section>

    <section className="numbers section-pad">
      <div className="section-kicker reveal">01 — IMPACT</div>
      <h2 className="display reveal">We Let Our<br/>Work <i>Speak.</i></h2>
      <div className="stats">
        {[['1B+','Views Generated'],['1000+','Projects Delivered'],['50+','Brands & Creators'],['10+','Industries'],['5+','Creative Minds']].map(([n,l])=><div className="stat reveal" key={l}><strong>{n}</strong><span>{l}</span></div>)}
      </div>
    </section>

    <section className="showreel" id="work">
      <div className={`showreel-wrap ${reelOpen ? 'reel-open' : ''}`} onClick={playReel} onMouseMove={moveReelCursor}>
        <video ref={reelVideo} className="showreel-media" muted loop playsInline poster={media.work5}><source src={media.reel} type="video/mp4"/></video>
        <div className="showreel-overlay" />
        <button className="play"><span>{reelPlaying ? 'PAUSE' : 'PLAY'}</span><Play fill="currentColor" /></button>
        <div ref={reelCursor} className="reel-cursor"><span>{reelPlaying ? 'PAUSE' : 'PLAY REEL'}</span><Play fill="currentColor"/></div>
        <div className="reel-timecode">REC&nbsp;&nbsp; 00:00:{reelPlaying ? '18' : '00'} &nbsp;&nbsp; 4K</div>
        <button className="reel-close" onClick={closeReel} aria-label="Close showreel"><X/></button>
        <div className="reel-progress"><span/></div>
        <div className="reel-title">SHOWREEL <sup>’26</sup></div>
      </div>
      <p className="reel-caption reveal">Every frame you see was created to tell a story—<em>not just fill a feed.</em></p>
    </section>

    <section className="film-sequence" aria-label="The craft behind every frame">
      <div className="film-copy reveal"><span>THE CRAFT BEHIND THE CUT</span><h2>Every cut<br/>has a <i>purpose.</i></h2><p>From the first slate to the final grade, every decision moves the story forward.</p></div>
      <div className="film-track">
        {[media.bts1, media.work3, media.bts2, media.work4, media.bts3, media.work1].map((image,i)=><figure className="film-frame" key={image}><img src={image} alt="Production frame"/><figcaption><span>CAM {String(i+1).padStart(2,'0')}</span><span>00:0{i+1}:2{i}</span></figcaption></figure>)}
      </div>
      <div className="film-sprockets" />
    </section>

    <section className="momentum section-pad" id="about">
      <div className="section-kicker reveal">02 — WHY VENCUTS</div>
      <h2 className="display reveal">We Don't Create Content.<br/><i>We Create Momentum.</i></h2>
      <div className="principles">
        {principles.map((p,i)=><div className="principle reveal" key={p}><span>0{i+1}</span><h3>{p}</h3><ArrowUpRight/></div>)}
      </div>
    </section>

    <section className="services section-pad" id="services">
      <div className="services-head"><div><div className="section-kicker reveal">03 — WHAT WE DO</div><h2 className="display reveal">One team.<br/><i>Every frame.</i></h2></div><p className="reveal">Strategy, production, post, and distribution—under one obsessive roof.</p></div>
      <div className="service-list">
        {services.map(([n,t,d],i)=><article className="service reveal" key={t}><span>{n}</span><h3>{t}</h3><p>{d}</p><div className="service-arrow"><ArrowUpRight/></div><div className="service-thumb" style={{backgroundImage:`url(${[media.work1,media.work3,media.work4,media.work2,media.work5][i]})`}}/></article>)}
      </div>
    </section>

    <section className="featured section-pad">
      <div className="featured-head"><div><div className="section-kicker reveal">04 — SELECTED WORK</div><h2 className="display reveal">Made to be<br/><i>remembered.</i></h2></div><button className="text-link reveal">View all projects <ArrowUpRight/></button></div>
      <div className="bento">
        <Project cls="project-big" image={media.work1} tag="Brand Film" title="Built For The Bold" />
        <Project image={media.work2} tag="Campaign" title="After Dark" />
        <Project image={media.work3} tag="Production" title="A Different Lens" />
        <Project cls="project-tall" image={media.work4} tag="Personal Brand" title="Make Your Mark" />
        <Project cls="project-wide" image={media.work5} tag="Launch Film" title="Future In Motion" />
      </div>
    </section>

    <section className="clients">
      <div className="client-side black"><span>BRANDS</span><h2>Cautio<br/>Healthy Chef<br/>NMIMS<br/>IDare<br/>Studio 11</h2><p>We turn companies into brands people recognize.</p></div>
      <div className="client-side white"><span>CREATORS</span><h2>Ayush Wadhwa<br/>Meghna Jain<br/>ABCK<br/>Piyush<br/>+ more</h2><p>We turn expertise into personal brands people trust.</p></div>
    </section>

    <section className="testimonials section-pad">
      <div className="section-kicker reveal">05 — KIND WORDS</div><h2 className="display reveal">What they say<br/><i>when we're not there.</i></h2>
      <div className="quote-track">{[...testimonials,...testimonials].map(([q,a],i)=><article className="quote" key={i}><b>“</b><p>{q}</p><span>{a}</span></article>)}</div>
    </section>

    <section className="philosophy">
      <div className="webgl"><Canvas dpr={[1, 1.5]} camera={{position:[0,0,4], fov:55}}><GrainField logo/></Canvas></div>
      <div className="section-kicker reveal">06 — OUR PHILOSOPHY</div>
      <h2 className="reveal">Things We'll Never<br/>Compromise On.</h2>
      <div className="philosophy-words">{['Quality.','Purpose.','Deadlines.','Honesty.','Impact.'].map(w=><span className="reveal" key={w}>{w}</span>)}</div>
    </section>

    <section className="team section-pad">
      <div className="team-copy"><div className="section-kicker reveal">07 — THE PEOPLE</div><h2 className="display reveal">Small Team.<br/><i>Big Vision.</i></h2><p className="reveal">Behind every project is a team obsessed with making good work—and making the process just as good.</p></div>
      <div className="team-photo reveal"><img src={media.team} alt="Creative team working together"/><span>VENCUTS CREATIVE TEAM · 2026</span></div>
      <div className="roles">
        <div><span>FOUNDER</span><h3>Vision, business & the big picture.</h3></div><div><span>CREATIVE DIRECTOR</span><h3>Stories, frames & the details.</h3></div><div><span>CREATIVE TEAM</span><h3>Production, post & everything between.</h3></div>
      </div>
    </section>

    <section className="bts">
      <div className="bts-title"><span>BEHIND THE SCENES</span><span>THE WORK BEHIND THE WORK</span></div>
      <div className="bts-grid"><img src={media.bts1}/><img src={media.bts2}/><img src={media.bts3}/></div>
    </section>

    <section className="contact" id="contact">
      <p className="section-kicker reveal">LET'S MAKE SOMETHING GREAT</p>
      <h2 className="reveal">Have a Story<br/>Worth <i>Telling?</i></h2>
      <p className="reveal">Let's build something people remember.</p>
      <a ref={contactButton} onMouseMove={magnet} onMouseLeave={() => gsap.to(contactButton.current, {x:0,y:0})} className="contact-btn reveal" href="mailto:hello@vencutsmedia.com">Start your project <ArrowUpRight/></a>
    </section>

    <footer>
      <div className="footer-top"><Logo footer/><div className="footer-links"><div><span>EXPLORE</span><a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a></div><div><span>SOCIAL</span><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Behance</a></div><div><span>CONTACT</span><a href="mailto:hello@vencutsmedia.com">hello@vencutsmedia.com</a><a href="tel:+919999999999">+91 99999 99999</a></div></div></div>
      <div className="footer-word">VENCUTS</div>
      <div className="footer-bottom"><span>© 2026 VENCUTS MEDIA</span><span>CREATING STORIES PEOPLE REMEMBER.</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  </main>
}

function Project({image,title,tag,cls=''}) { return <article className={`project reveal ${cls}`}><img src={image} alt={title}/><div className="project-shade"/><div className="project-info"><span>{tag}</span><h3>{title}</h3></div><button><ArrowUpRight/></button></article> }
export default App
