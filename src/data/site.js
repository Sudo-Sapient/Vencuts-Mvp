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

const categoryDefinitions = [
  [
    "Brand Film",
    "brand-film",
    "Brand stories shaped for a cinematic, lasting first impression.",
  ],
  [
    "Launch Explainer",
    "launch-explainer",
    "Clear launch films that introduce the product, idea and reason to care.",
  ],
  [
    "Product Videos",
    "product-videos",
    "Product-led films focused on use, detail and visual clarity.",
  ],
  [
    "Motion Graphics",
    "motion-graphics",
    "Motion-led storytelling for ideas that need to be seen in action.",
  ],
  [
    "Podcasts",
    "podcasts",
    "Long-form conversations and the short-form cuts built around them.",
  ],
  [
    "Talking Head",
    "talking-head",
    "Direct-to-camera stories edited for pace, clarity and attention.",
  ],
  [
    "Video Production",
    "video-production",
    "End-to-end production from the first frame through final delivery.",
  ],
  [
    "Content Series",
    "content-series",
    "Repeatable video formats designed to build a consistent audience.",
  ],
];

const projectSlots = [
  { label: "Project 01", format: "Featured film", ratio: "16:9" },
  { label: "Project 02", format: "Supporting cut", ratio: "16:9" },
  { label: "Project 03", format: "Vertical cut", ratio: "9:16" },
  { label: "Project 04", format: "Additional media", ratio: "Flexible" },
];

export const workCategories = categoryDefinitions.map(
  ([name, slug, description], index) => ({
    index: String(index + 1).padStart(2, "0"),
    name,
    slug,
    description,
    href: `/work/${slug}`,
    slots: projectSlots.map((slot) => ({ ...slot, status: "Awaiting media" })),
  }),
);

export function getWorkCategory(slug) {
  return workCategories.find((category) => category.slug === slug) || null;
}

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
