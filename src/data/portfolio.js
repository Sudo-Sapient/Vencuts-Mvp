const driveFolder = (id) => `https://drive.google.com/drive/folders/${id}`;
const driveFile = (id) =>
  `https://drive.google.com/file/d/${id}/view?usp=drivesdk`;
const driveStream = (id) =>
  `https://drive.google.com/file/d/${id}/preview?autoplay=1`;
const driveFolderPlayer = (id) =>
  `https://drive.google.com/embeddedfolderview?id=${id}#grid`;
const instagramPlayer = (shortcode) =>
  `https://www.instagram.com/reel/${shortcode}/embed/captioned/`;

const playable = (source, player) => ({ source, player });

export const featuredShowcase = [
  {
    name: "Gokul",
    kind: "Creator collaboration",
    description:
      "Creator-led video work and storytelling produced with Vencuts.",
    visual: "/media/portfolio/gokul.jpg",
    ...playable(
      driveFolder("1_DKSGOfn3tEmYzLtw9L3QRs9IgkyXmEl"),
      "/media/portfolio/videos/gokul.mp4",
    ),
    playerType: "video",
  },
  {
    name: "Brandon",
    kind: "Creator · Sideshift",
    description: "Creator and intern at Sideshift.",
    visual: "/media/portfolio/brandon.jpg",
    portrait: true,
    ...playable(
      "https://www.instagram.com/brandonbaobao?igsh=Njl4c21laWN6MDdq",
      "/media/portfolio/videos/brandon.mp4",
    ),
    playerType: "video",
  },
  {
    name: "Sideshift",
    kind: "Client",
    description:
      "Video collaboration for the Sideshift brand and creator team.",
    visual: "/media/portfolio/foreign.jpg",
    portrait: true,
    ...playable(
      driveFolder("1-uHM3_UYt9C6YjVwjevDPt998UOd6bEH"),
      "/media/portfolio/videos/sideshift.mp4",
    ),
    playerType: "video",
  },
  {
    name: "Bekind / Abrokecollegekid",
    kind: "Featured client · 1.7M followers",
    description:
      "Vencuts' most prominent creator client and an ongoing body of social content.",
    visual: "/assets/clients/bekind.png",
    logo: true,
    ...playable(
      driveFolder("1_DKSGOfn3tEmYzLtw9L3QRs9IgkyXmEl"),
      "/media/portfolio/videos/bekind.mp4",
    ),
    playerType: "video",
  },
];

const clientData = [
  [
    "Foreign Clients",
    "International creator work",
    "1-uHM3_UYt9C6YjVwjevDPt998UOd6bEH",
    "1mcchMu3JmnAQV6pvYc69aqOmjSqZspTh",
    "foreign",
  ],
  [
    "Canopy",
    "Client collection",
    "1Fn7bqqwWERrYYU6a4f-xYTMkxXMDlWbv",
    "1sAfr_86GojlgA694G6knJnlxJZoAsXXO",
    "canopy",
  ],
  [
    "Dev Mitra",
    "Client collection",
    "1JieqkxRvMK_Rk4TOX6mcxWxQWoH6lY_b",
    "1_RvXAoBhcyA3IswcVSjv4kd2nkjqGAo_",
    "dev-mitra",
  ],
  [
    "Termbreak",
    "Client collection",
    "1eo-eKOdu30dHG54bWpPEzvp3Jw5hIc51",
    "1NQw2S-doThlctDHY-jQmp7zJxhal5H4C",
    "termbreak",
  ],
  [
    "Capital Mind",
    "Client collection",
    "1eWRihUZZ0gzFKNqf09XCur5eOOTMqDn-",
    "1HSoSmb5Qwiu4WLrS0hQorAHSznC18KWN",
    "capital-mind",
  ],
  [
    "Aayush",
    "Creator collection",
    "1H0hLfQuhn6NbKu1HiknFtaDwLMYLqn43",
    "1VdP70ap4B_-vKv1_fIFCRE0p8wzv9Nj0",
    "aayush",
  ],
  [
    "Megna Jain",
    "Featured film",
    null,
    "1Y8_cKzuYjzj9RcPJY7K-uz0JNePYmX1s",
    "meghna-jain",
  ],
  [
    "Kiran",
    "Creator collection",
    "1HPPYOEPZz_6XqLZWWFOgNj-XF1XyEAnf",
    "1APqCtoGgph2GWAPgrLbest1QaOjrXENB",
    "kiran",
  ],
  [
    "Varshith",
    "Creator collection",
    "1gf3RrzGqE3gl1QrN5iPLXLo-p-S8JRRK",
    "1Il2T-37EPfwyMbmlzzx_ErCXZT9jRhAV",
    "varshith",
  ],
  [
    "Varun",
    "Creator collection",
    "1ioHV5IfefGZpzNjoCDOamd_SmM4S92ai",
    "1bwMsjh5_bolMjPEpLrZMuypYxHWz8-LH",
    "varun",
  ],
  [
    "Kallos",
    "Client collection",
    "15imGQSQgDULUveweJ33yYt93_XpmF0GH",
    "1Dmi59rKlOHhVwv02meu5dthekiEVvwX_",
    "kallos",
  ],
  [
    "Healthy Chef",
    "Product and content collection",
    "1unfGGIwmXLx5JOWd6I-zekhUPpHcMHA-",
    "1XIZrQb1bdHGOkeeQX9Is1lfIPid4mZM7",
    "healthy-chef",
  ],
];

export const clientCollections = clientData.map(
  ([name, kind, folderId, fileId, image]) => ({
    name,
    kind,
    visual: `/media/portfolio/${image}.jpg`,
    portrait: ["aayush", "meghna-jain", "kiran", "varshith"].includes(image),
    source: folderId ? driveFolder(folderId) : driveFile(fileId),
    player: `/media/portfolio/videos/${image}.mp4`,
    playerType: "video",
  }),
);

const localVideoNames = new Set([
  "saas",
  "events",
  "event-film",
  "documentary-01",
  "documentary-02",
  "3d-film",
  "3d-02",
  "podcast-01",
  "podcast-02",
  "vlog-film",
  "product-01",
  "product-02",
  "talking-head-01",
  "storytelling-film",
]);

const localVideo = (visual) => {
  const name = visual.match(/\/([^/]+)\.jpg$/)?.[1];
  return name && localVideoNames.has(name)
    ? `/media/portfolio/videos/${name}.mp4`
    : null;
};

const project = (
  title,
  format,
  visual,
  kind,
  source,
  player,
  portrait = false,
) => ({
  title,
  format,
  visual,
  kind,
  source,
  player: localVideo(visual) || player,
  portrait,
  playerType: localVideo(visual) ? "video" : "embed",
});

const driveCollectionProject = (
  title,
  format,
  folderId,
  fileId,
  visual,
  portrait = false,
) =>
  project(
    title,
    format,
    visual,
    "collection",
    driveFolder(folderId),
    driveStream(fileId),
    portrait,
  );
const driveFilmProject = (title, format, fileId, visual, portrait = false) =>
  project(
    title,
    format,
    visual,
    "film",
    driveFile(fileId),
    driveStream(fileId),
    portrait,
  );

const categoryData = [
  {
    name: "SaaS Launch, Demo & Explainer",
    slug: "saas-launch-explainer",
    description:
      "Launch films, product demos and explainers that make software easier to understand.",
    projects: [
      driveCollectionProject(
        "SaaS Launch & Explainer Collection",
        "Agen8, Sudopedia and product-led explainers",
        "1su1n7H2oPOlWE7TJ22xtc-JXgJ4GuCRj",
        "1IWXa6LEbLOCzbKLLoSvt9AmeVNZusvvQ",
        "/media/portfolio/saas.jpg",
      ),
    ],
  },
  {
    name: "Events",
    slug: "events",
    description:
      "Event films built from atmosphere, people and the moments worth carrying forward.",
    projects: [
      driveCollectionProject(
        "Event Film Collection",
        "Event coverage",
        "1BBShPhG30MN4VDNKY5X3gREhDB1OpJ6z",
        "1NWyynBGNbTbSwLViGjrMJ_lZNKWC0k1n",
        "/media/portfolio/events.jpg",
      ),
      driveFilmProject(
        "Event Film",
        "Featured event cut",
        "1-wfLaTGfBH22_BLGTcWHrSADqHe3kEa-",
        "/media/portfolio/event-film.jpg",
      ),
    ],
  },
  {
    name: "Documentary",
    slug: "documentary",
    description:
      "Human stories given room to breathe through documentary-led filming and editing.",
    projects: [
      driveFilmProject(
        "Documentary Film 01",
        "Documentary",
        "1byQ0CohUA-swWKvpHuXhH939yZf62hgS",
        "/media/portfolio/documentary-01.jpg",
      ),
      driveFilmProject(
        "Documentary Film 02",
        "Documentary",
        "1dZ1hJHrnMLE1URQ31Bqa4kLayb7xeX02",
        "/media/portfolio/documentary-02.jpg",
      ),
    ],
  },
  {
    name: "3D",
    slug: "3d",
    description:
      "3D-led visual work for products, campaigns and ideas that need another dimension.",
    projects: [
      project(
        "3D Collection 01",
        "3D and motion",
        "/media/work-05.jpg",
        "collection",
        driveFolder("1YEgRg41NTDooKEhfrAwJagXSewX7P_LP"),
        driveFolderPlayer("1YEgRg41NTDooKEhfrAwJagXSewX7P_LP"),
      ),
      driveFilmProject(
        "3D Film",
        "Featured 3D cut",
        "14JaKJ08x7PDxnxyzaaWEWA7-VIYLjgSs",
        "/media/portfolio/3d-film.jpg",
        true,
      ),
      driveCollectionProject(
        "3D Collection 02",
        "3D and motion",
        "12Ih7lXPrWJ7PtXO5ynSHUgCMcI6p9-N-",
        "1VsJODzNSg_d5_bE1s4Gnju3OjSJez9_F",
        "/media/portfolio/3d-02.jpg",
      ),
    ],
  },
  {
    name: "Podcast",
    slug: "podcast",
    description:
      "Long-form conversations and the focused clips that carry each idea further.",
    projects: [
      driveCollectionProject(
        "iDare Podcast",
        "Podcast episodes and cuts",
        "1BHh_K4IAMZm-k-wS0vXBJ913aAieFUSh",
        "1ckumlMUh_iQquJ5BWlMve3SH0gH9fYX5",
        "/media/portfolio/podcast-01.jpg",
      ),
      driveCollectionProject(
        "Podcast Collection 02",
        "Podcast production",
        "1tDwxpDzPGWadO4uLouMD_i20OpxtgyJs",
        "1Y25IEjhRgMizj0qeK7RdItvBecd2v1S-",
        "/media/portfolio/podcast-02.jpg",
        true,
      ),
    ],
  },
  {
    name: "Vlogs",
    slug: "vlogs",
    description:
      "Fast, personal edits that preserve the voice and energy of the creator.",
    projects: [
      project(
        "Vlog Collection",
        "Frame.io collection",
        "/media/work-04.jpg",
        "collection",
        "https://f.io/AW4lu-Ft",
        "https://next.frame.io/share/217298b7-a3fc-4796-9a39-58db8469fd9d/view/6778b81e-dd1c-4b37-9f35-5c39f72de7aa",
      ),
      driveFilmProject(
        "Featured Vlog",
        "Vlog",
        "1qlcGmh2TVWfacma1unfzIFf848xG8eUP",
        "/media/portfolio/vlog-film.jpg",
      ),
    ],
  },
  {
    name: "Product",
    slug: "product",
    description:
      "Product videos that make form, function and the reason to choose it immediately clear.",
    projects: [
      driveCollectionProject(
        "Product Collection 01",
        "Product video",
        "1b2qFZO-K6jRn40ZfzrzAeJWUZnJXYrdd",
        "1L7j93B9bfNDUVt6Q6XrlB5KcooZbnl6r",
        "/media/portfolio/product-01.jpg",
      ),
      driveCollectionProject(
        "Product Collection 02",
        "Product video",
        "1Rw2I36Bq3JC_FyoIUGWUlLrWUlVHrT44",
        "11Z_SbDs28fJjsoWzviDbagVbttEY-TAC",
        "/media/portfolio/product-02.jpg",
        true,
      ),
    ],
  },
  {
    name: "Designs",
    slug: "designs",
    description:
      "Graphic and visual design systems made to support campaigns and moving-image work.",
    projects: [
      project(
        "Design Collection 01",
        "Visual design",
        "/media/work-03.jpg",
        "collection",
        driveFolder("1QIt8sGVTsX6pXR9CDqlXejvMxsPVcByW"),
        driveFolderPlayer("1QIt8sGVTsX6pXR9CDqlXejvMxsPVcByW"),
      ),
      project(
        "Design Collection 02",
        "Visual design",
        "/media/work-01.jpg",
        "collection",
        driveFolder("1EzUkQX2PvDrwnDGJ9HkMCbI8I1X3lc2c"),
        driveFolderPlayer("1EzUkQX2PvDrwnDGJ9HkMCbI8I1X3lc2c"),
      ),
    ],
  },
  {
    name: "Talking Head",
    slug: "talking-head",
    description:
      "Direct-to-camera edits built for pace, clarity and a strong personal point of view.",
    projects: [
      driveCollectionProject(
        "Talking Head Collection 01",
        "Founder and creator content",
        "1nFNM_Jg0VoLmfPKxLL1ywBiO8NampK2-",
        "1ovnglp9Lu67I8yNufQAg37NJLPPcIVjt",
        "/media/portfolio/talking-head-01.jpg",
        true,
      ),
      project(
        "Talking Head Collection 02",
        "Founder and creator content",
        "/media/work-02.jpg",
        "collection",
        driveFolder("1hSMrBQDtS-2GtgWCEgOo-WUDa0AGnQRG"),
        driveFolderPlayer("1hSMrBQDtS-2GtgWCEgOo-WUDa0AGnQRG"),
      ),
    ],
  },
  {
    name: "Storytelling",
    slug: "storytelling",
    description:
      "Founder, creator and human stories cut around emotion, honesty and a memorable point of view.",
    projects: [
      driveFilmProject(
        "When She Swiped Me Right",
        "Storytelling film",
        "1DsRfroRkUvx_iOZq7EqkYdel83Kv1cfH",
        "/media/portfolio/storytelling-film.jpg",
        true,
      ),
      project(
        "Storytelling Reel 01",
        "Instagram reel",
        "/media/portfolio/storytelling-reel-01.jpg",
        "reel",
        "https://www.instagram.com/reel/DUi9dYEk0Gm/",
        instagramPlayer("DUi9dYEk0Gm"),
        true,
      ),
      project(
        "Storytelling Reel 02",
        "Instagram reel",
        "/media/portfolio/storytelling-reel-02.jpg",
        "reel",
        "https://www.instagram.com/reel/DU2-AOrkwX8/",
        instagramPlayer("DU2-AOrkwX8"),
        true,
      ),
      project(
        "Storytelling Reel 03",
        "Instagram reel",
        "/media/portfolio/storytelling-reel-03.jpg",
        "reel",
        "https://www.instagram.com/reel/C_TKAE1SwLi/",
        instagramPlayer("C_TKAE1SwLi"),
        true,
      ),
    ],
  },
];

export const workCategories = categoryData.map((category, index) => ({
  ...category,
  index: String(index + 1).padStart(2, "0"),
  href: `/work/${category.slug}`,
}));

export function getWorkCategory(slug) {
  const aliases = {
    "brand-film": "storytelling",
    "launch-explainer": "saas-launch-explainer",
    "product-videos": "product",
    "motion-graphics": "3d",
    podcasts: "podcast",
    "video-production": "events",
    "content-series": "vlogs",
  };
  const resolvedSlug = aliases[slug] || slug;
  return (
    workCategories.find((category) => category.slug === resolvedSlug) || null
  );
}
