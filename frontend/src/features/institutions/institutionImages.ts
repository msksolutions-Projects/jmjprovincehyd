const G = "/media/gallery";

/**
 * Photograph for each institution, matched from the Province archive.
 * Where the archive holds no photograph of a specific house, a photograph of
 * the same kind of work is used — never a photograph of a different house.
 */
const exact: Record<string, string> = {
  "2": `${G}/institutions/ayyalurimetta.jpeg`,
  "4": `${G}/institutions/jmj-gajwel.jpg`,
  "5": `${G}/education/jmj-em-school-gyaraspur.jpeg`,
  "6": `${G}/institutions/sanathnagar-st.jpg`,
  "7": `${G}/institutions/sanathnagar-st.jpg`,
  "10": `${G}/institutions/shanthinilayam.jpg`,
  "11": `${G}/institutions/jmj-jyothinilayam.jpeg`,
  "12": `${G}/institutions/jagadgirigutta.jpeg`,
  "13": `${G}/institutions/jkpally.jpg`,
  "14": `${G}/institutions/katra-convent.jpeg`,
  "17": `${G}/education/jmj-em-school-kurnool-1.jpeg`,
  "19": `${G}/institutions/st-theresas-hospita-kurnool-1.jpeg`,
  "21": `${G}/institutions/jmj-institutions-kurnool.jpg`,
  "22": `${G}/institutions/jmj-shanthinikaten-kurnool.jpeg`,
  "27": `${G}/institutions/st-josephs-nagarjunsagar.jpg`,
  "28": `${G}/institutions/nalgonda.jpg`,
  "29": `${G}/institutions/pedda-kottala.jpg`,
  "30": `${G}/institutions/jmj-cllege-peddaendl.jpg`,
  "31": `${G}/institutions/shamshabad.jpg`,
};

/** Type-appropriate fallbacks, so no card is ever left blank. */
const byType: { match: RegExp; image: string }[] = [
  { match: /hospital|medical|health|nursing/i, image: "/brand/healthcare.webp" },
  { match: /novitiate|formation|boarding/i, image: "/brand/formation.webp" },
  { match: /orphanage|old age|t\.l\.c|rehabilitation|social/i, image: "/brand/social.webp" },
  { match: /pastoral|evangelis|retreat/i, image: "/brand/pastoral.webp" },
  { match: /school|college|cbse/i, image: "/brand/education.webp" },
];

export function institutionImage(id: string, type: string): string {
  return (
    exact[id] ??
    byType.find((entry) => entry.match.test(type))?.image ??
    "/brand/jyothinilayam.webp"
  );
}

/** True when the photograph is of this house rather than a stand-in. */
export const hasOwnPhotograph = (id: string) => id in exact;

/** A small set of related archive photographs for an institution detail page. */
export function institutionGallery(type: string): string[] {
  if (/hospital|medical|health|nursing/i.test(type)) {
    return [
      `${G}/healthcare/healthcare-1.jpg`,
      `${G}/healthcare/healthcare.jpg`,
      `${G}/healthcare/caring-for-covid-victim.jpg`,
    ];
  }
  if (/orphanage|old age|social|rehabilitation/i.test(type)) {
    return [
      `${G}/social-service/children-project.png`,
      `${G}/social-service/caring-the-physically-handicaped.jpg`,
      `${G}/social-service/anjali.jpg`,
    ];
  }
  return [
    `${G}/education/education-1.jpg`,
    `${G}/education/education1.jpg`,
    `${G}/education/education.jpg`,
  ];
}
