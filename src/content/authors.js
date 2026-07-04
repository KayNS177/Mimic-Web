/**
 * Author registry. Posts reference an author by id in their frontmatter.
 *
 * Note: this is a studio pen-name (not a real individual's personal identity).
 * The bio describes the studio's genuine expertise; the avatar is the generated
 * monogram (Cover), not a photo. Rename freely.
 */

export const DEFAULT_AUTHOR = {
  id: 'mimic-studio',
  name: 'Mimic.Studio',
  role: 'B2B & B2C Web Design Studio',
  bio: 'A B2B & B2C web design studio building fast, conversion-focused websites and digital solutions.',
  url: 'https://mimicstudio.co/about',
  sameAs: ['https://wa.me/60174018136'],
};

export const AUTHORS = {
  'mimic-editorial': {
    id: 'mimic-editorial',
    name: 'Marcus Tan',
    role: 'Lead Web Designer, Mimic.Studio',
    bio: 'Marcus leads web design and custom software at Mimic.Studio, building high-converting B2B and B2C websites and tailored digital solutions. He writes on conversion-focused design, custom software, and SEO.',
    url: 'https://mimicstudio.co/about',
    sameAs: ['https://wa.me/60174018136'],
  },
};

export function resolveAuthor(idOrName) {
  if (!idOrName) return DEFAULT_AUTHOR;
  return AUTHORS[idOrName] || DEFAULT_AUTHOR;
}
