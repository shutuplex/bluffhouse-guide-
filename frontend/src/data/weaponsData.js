import rawWeapons from './weapons.json';

export const WEAPONS_DATA = rawWeapons.map(w => ({
  ...w,
  tier: w.tier || 1,
  status_effect: w.status_effect || 'None',
  desc: w.desc || `${w.type} with base strike damage of ${w.base_dmg}.`
}));

export const WEAPONS_BY_ID = WEAPONS_DATA.reduce((acc, weapon) => {
  acc[weapon.id] = weapon;
  return acc;
}, {});

export const WEAPON_TYPES = [
  'All Types',
  ...Array.from(new Set(WEAPONS_DATA.map(w => w.type))).sort()
];

export const STATUS_EFFECTS = [
  'All Effects',
  ...Array.from(new Set(WEAPONS_DATA.map(w => w.status_effect))).sort()
];

export default WEAPONS_DATA;
