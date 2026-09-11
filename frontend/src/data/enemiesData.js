import rawEnemies from './enemies.json';
import { WEAPONS_BY_ID } from './weaponsData';

export const ENEMIES_DATA = rawEnemies.map(e => ({
  ...e,
  dropWeapon: e.drop_weapon_id ? WEAPONS_BY_ID[e.drop_weapon_id] || null : null
}));

export const ENEMY_TIERS = ['All Tiers', 'Common', 'Elite', 'Boss', 'Major Boss'];

export default ENEMIES_DATA;
