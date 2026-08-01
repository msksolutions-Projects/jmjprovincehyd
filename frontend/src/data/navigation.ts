export type NavIcon =
  | "founder"
  | "history"
  | "mission"
  | "vision"
  | "profile"
  | "presence"
  | "formation"
  | "education"
  | "health"
  | "social"
  | "pastoral"
  | "eco"
  | "leadership"
  | "team"
  | "commissions"
  | "institutions"
  | "school"
  | "hospital"
  | "profiles"
  | "gallery"
  | "publications"
  | "news"
  | "contact"
  | "directory";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: NavIcon;
}

export interface NavGroup {
  label: string;
  /** A group with `href` and no items renders as a plain top-level link. */
  href?: string;
  items?: NavItem[];
}

/** One header level plus a single submenu layer — no deeper nesting. */
export const navigation: NavGroup[] = [
  {
    label: "Who We Are",
    items: [
      { label: "Our Founder", href: "/who-we-are/founder", icon: "founder", description: "Rev. Fr. Mathias Wolff S.J." },
      { label: "Our History", href: "/who-we-are/history", icon: "history", description: "From Holland to India and beyond" },
      { label: "Missionary Work", href: "/who-we-are/missionary-work", icon: "mission", description: "The first sisters in India" },
      { label: "Vision and Mission", href: "/who-we-are/vision-mission", icon: "vision", description: "Our purpose and charism" },
      { label: "Province Profile", href: "/who-we-are/province-profile", icon: "profile", description: "The Province at a glance" },
      { label: "Our Presence", href: "/who-we-are/our-presence", icon: "presence", description: "The Congregation worldwide" },
    ],
  },
  {
    label: "What We Do",
    items: [
      { label: "Formation", href: "/ministries/formation", icon: "formation" },
      { label: "Education", href: "/ministries/education", icon: "education" },
      { label: "Health Care", href: "/ministries/health-care", icon: "health" },
      { label: "Social Work", href: "/ministries/social-work", icon: "social" },
      { label: "Pastoral and Evangelization", href: "/ministries/pastoral-evangelization", icon: "pastoral" },
      { label: "Eco Friendliness and Protection", href: "/ministries/eco-friendliness", icon: "eco" },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Provincial Superiors", href: "/administration/provincial-superiors", icon: "leadership" },
      { label: "Administration Team", href: "/administration/team", icon: "team" },
      { label: "Province Commissions", href: "/administration/commissions", icon: "commissions" },
    ],
  },
  {
    label: "Institutions",
    items: [
      { label: "All Institutions", href: "/institutions", icon: "institutions", description: "Directory of all 32 institutions" },
      { label: "Education Institutions", href: "/institutions?type=High+School", icon: "school" },
      { label: "Health Care Institutions", href: "/institutions?type=Hospital", icon: "hospital" },
      { label: "Institution Profiles", href: "/institution-profiles", icon: "profiles", description: "Written profiles of our houses" },
    ],
  },
  {
    label: "Media",
    items: [
      { label: "Gallery", href: "/gallery", icon: "gallery" },
      { label: "Publications", href: "/publications", icon: "publications" },
      { label: "News and Updates", href: "/news", icon: "news" },
    ],
  },
  {
    label: "Contact",
    items: [
      { label: "Province Contact", href: "/contact", icon: "contact", description: "Write to the provincial office" },
      { label: "Convent Directory", href: "/contact/convents", icon: "directory", description: "All 25 communities" },
    ],
  },
];

/** Flat list used by the footer and search index. */
export const allNavItems: NavItem[] = navigation.flatMap((group) => group.items ?? []);
