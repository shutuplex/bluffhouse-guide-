import rawCharacters from './characters.json';

// Normalize names, anime strings, and video checks
export const CHARACTERS_DATA = rawCharacters.map(c => {
  const anime = (c.anime || 'Unknown').trim();
  const name = (c.name || 'Unknown').trim();
  const isVideo = typeof c.img_url === 'string' && (c.img_url.endsWith('.mp4') || c.img_url.endsWith('.webm'));
  return {
    ...c,
    name,
    anime,
    isVideo
  };
});

export const CHARACTER_RARITIES = [
  'All Rarities',
  'Mythic',
  'Summer Edition',
  'Legendary',
  'Rare',
  'Medium',
  'Common'
];

export const CHARACTER_ANIMES = [
  'All Anime',
  ...Array.from(new Set(CHARACTERS_DATA.map(c => c.anime))).sort()
];

export const STAT_TYPES = ['All Stats', 'STR', 'DEX', 'SPD', 'DEF', 'None'];

export default CHARACTERS_DATA;
