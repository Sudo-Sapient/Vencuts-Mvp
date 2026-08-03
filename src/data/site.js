export const media = {
  hero: "/media/hero.mp4",
  reel: "/media/showreel/vencuts-showreel.mp4",
  work1: "/media/work-01.jpg",
};

export const studioVideos = Array.from(
  { length: 6 },
  (_, index) =>
    `/media/studio/studio-${String(index + 1).padStart(2, "0")}.mp4`,
);

export const teamVideo = "/media/team/vencuts-team.mp4";

export const navItems = [
  ["Showreel", "/showreel"],
  ["Work", "/work"],
  ["Team", "/team"],
  ["Contact us", "/contact"],
];

export const clientLogos = [
  { name: "NMIMS", slug: "nmims", file: "nmims.png", fit: "wide" },
  {
    name: "HealthyChef",
    slug: "healthychef",
    file: "healthychef.png",
    fit: "mark",
  },
  { name: "CISI", slug: "cisi", file: "cisi.png", fit: "wide" },
  { name: "Cautio", slug: "cautio", file: "cautio.png", fit: "wide" },
  { name: "Bytes", slug: "bytes", file: "bytes.png", fit: "mark" },
  { name: "Bingelabs", slug: "bingelabs", file: "bingelabs.png", fit: "wide" },
  {
    name: "Dream a Dozen",
    slug: "dream-a-dozen",
    file: "dream-a-dozen.png",
    fit: "standard",
  },
  { name: "iDare", slug: "idare", file: "idare.png", fit: "wide" },
  { name: "Sattva", slug: "sattva", file: "sattva.png", fit: "wide" },
  {
    name: "Project Morph",
    slug: "project-morph",
    file: "project-morph.png",
    fit: "tall",
  },
  { name: "Owled", slug: "owled", file: "owled.png", fit: "mark" },
  {
    name: "Term Break",
    slug: "term-break",
    file: "term-break.png",
    fit: "wide",
  },
  {
    name: "Naren Electrix",
    slug: "naren-electrix",
    file: "naren-electrix.png",
    fit: "wide",
  },
  { name: "Rubesh DJ", slug: "rubesh-dj", file: "rubesh-dj.png", fit: "mark" },
  {
    name: "Sudo Sapient",
    slug: "sudo-sapient",
    file: "sudo-sapient.png",
    fit: "wide",
  },
  { name: "Agen8", slug: "agen8", file: "agen8.png", fit: "mark" },
  { name: "Playgram", slug: "playgram", file: "playgram.png", fit: "wide" },
  { name: "Bekind", slug: "bekind", file: "bekind.png", fit: "wide" },
  {
    name: "IndulgebySahi",
    slug: "indulgebysahi",
    file: "indulgebysahi.png",
    fit: "wide",
  },
];

export const teamMembers = [
  {
    index: "01",
    name: "Venkateswaran S",
    role: "Founder & Editor",
    copy: "Building a studio where editors stay close to the idea, the client and every frame.",
    media: "/media/team/venkateswaran-s.png",
    type: "image",
  },
  {
    index: "02",
    name: "Blessing Joshwa J",
    role: "Editor",
    copy: "Shaping raw footage into a clear rhythm that keeps the story moving.",
    media: "/media/team/blessing-joshwa-j.png",
    type: "image",
  },
  {
    index: "03",
    name: "Sahishnaa Anandan",
    role: "Operations",
    copy: "Keeping projects, people and timelines moving clearly from the first conversation to final delivery.",
    media: "/media/team/sahishnaa-anandan.png",
    type: "image",
  },
  {
    index: "04",
    name: "Nitin Sarvesh",
    role: "Editor",
    copy: "Bringing pace, clarity and feeling together in the final cut.",
    media: "/media/team/nitin-sarvesh.png",
    type: "image",
  },
  {
    index: "05",
    name: "Amal",
    role: "Editor",
    copy: "Finding the small visual decisions that make an edit feel natural and memorable.",
    media: studioVideos[3],
    type: "video",
  },
];

const workTypes = [
  "Brand Film",
  "Launch Explainer",
  "Product Video",
  "Motion Graphics",
  "Podcast",
  "Talking Head",
  "Video Production",
  "Content Series",
];

const placeholderThumbs = [
  "/media/work-01.jpg",
  "/media/work-02.jpg",
  "/media/work-03.jpg",
  "/media/work-04.jpg",
  "/media/work-05.jpg",
  "/media/showreel/vencuts-showreel-poster.jpg",
];

// Built from the official client list. Replace titles/types/media with real project details when ready.
export const workProjects = clientLogos.map((client, index) => ({
  client: client.name,
  slug: client.slug,
  title: "Selected Work",
  type: workTypes[index % workTypes.length],
  thumb: `/assets/clients/${client.file}`,
  fit: client.fit,
  href: `/work/${client.slug}`,
  summary:
    "A focused collaboration with Vencuts — story, pace and final cut shaped together.",
  projects: [
    {
      title: `${client.name} · Lead Film`,
      type: workTypes[index % workTypes.length],
      status: "Placeholder",
      thumb: placeholderThumbs[index % placeholderThumbs.length],
    },
    {
      title: `${client.name} · Cut 02`,
      type: workTypes[(index + 2) % workTypes.length],
      status: "Placeholder",
      thumb: placeholderThumbs[(index + 1) % placeholderThumbs.length],
    },
    {
      title: `${client.name} · Social Cut`,
      type: workTypes[(index + 4) % workTypes.length],
      status: "Placeholder",
      thumb: placeholderThumbs[(index + 2) % placeholderThumbs.length],
    },
  ],
}));

export function getWorkProject(slug) {
  return workProjects.find((project) => project.slug === slug) || null;
}

const testimonialQuotes = [
  "Clear process, strong final cut, and a team that stayed close to every frame.",
  "The collaboration felt end to end — from first idea to a delivery people remembered.",
  "Sharp turnaround, clean communication, and a final film that felt intentional.",
  "They understood the brand quickly and shaped the edit with real care.",
  "A simple, focused process that made the story land with more clarity.",
  "The team treated every detail seriously — pace, tone, and the final export.",
];

// PLACEHOLDER quotes only — swap with approved client testimonials when available.
export const testimonials = clientLogos.map((client, index) => ({
  quote: testimonialQuotes[index % testimonialQuotes.length],
  name: client.name,
  role: "Client",
  logo: `/assets/clients/${client.file}`,
  slug: client.slug,
}));

export const contactServices = [
  "Content Marketing",
  "Personal Branding",
  "Strategy",
  "Video Editing (Motion Graphics)",
  "Video Production",
  "Podcast",
  "Talking Head Videos",
  "Product Videos",
  "Launch & SaaS Explainer",
  "Designing",
];
