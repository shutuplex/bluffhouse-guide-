import rawCharacters from './characters.json';

const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov)($|\?|#)/i.test(url.trim());
};

// Normalize names, anime strings, and video checks
export const CHARACTERS_DATA = rawCharacters.map(c => {
  const anime = (c.anime || 'Unknown').trim();
  const name = (c.name || 'Unknown').trim();
  const img_url = typeof c.img_url === 'string' ? c.img_url.trim() : c.img_url;
  const isVideo = isVideoUrl(img_url);
  return {
    ...c,
    name,
    anime,
    img_url,
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
