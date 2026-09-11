import { WEAPONS_DATA, WEAPONS_BY_ID, WEAPON_TYPES, STATUS_EFFECTS } from './weaponsData';
import { ENEMIES_DATA, ENEMY_TIERS } from './enemiesData';
import { CHARACTERS_DATA, CHARACTER_ANIMES, CHARACTER_RARITIES, STAT_TYPES } from './charactersData';

export { WEAPONS_DATA, WEAPONS_BY_ID, WEAPON_TYPES, STATUS_EFFECTS };
export { ENEMIES_DATA, ENEMY_TIERS };
export { CHARACTERS_DATA, CHARACTER_ANIMES, CHARACTER_RARITIES, STAT_TYPES };

export const STAT_INFO = {
  HP: {
    name: 'Health Points',
    abbr: 'HP',
    base: 100,
    perPoint: 10,
    desc: 'Determines maximum hit points in combat. Base 100 + 10 per allocated point.'
  },
  STR: {
    name: 'Strength',
    abbr: 'STR',
    desc: 'Boosts Strength-scaling heavy weapons and strike attack damage.'
  },
  DEX: {
    name: 'Dexterity',
    abbr: 'DEX',
    desc: 'Increases critical strike chance (0.05 + DEX * 0.0035, max 60%) and Dexterity weapon scaling.'
  },
  SPD: {
    name: 'Speed',
    abbr: 'SPD',
    desc: 'Determines combat turn initiative, passive dodge chances, and escape flee probability in PvE.'
  },
  DEF: {
    name: 'Defense',
    abbr: 'DEF',
    desc: 'Mitigates incoming physical damage via hyperbolic scaling: DEF / (DEF + 80).'
  }
};

export const TITLES_PROGRESSION = [
  { minLevel: 1, maxLevel: 9, title: 'Tarnished of No Renown', perk: 'Unlocked Talisman Pouch Slot 1. Access to /explore.' },
  { minLevel: 10, maxLevel: 24, title: 'Foul Tarnished', perk: 'Access to Tier 1 Daily Weapon Shop and /hunt encounters.' },
  { minLevel: 25, maxLevel: 49, title: 'Warrior of the Lands Between', perk: 'Unlocked Talisman Pouch Slot 2. +5% base critical damage.' },
  { minLevel: 50, maxLevel: 74, title: 'Demigod Vanquisher', perk: 'Unlocked Talisman Pouch Slot 3. Access to 2-Hour Major Boss Raids.' },
  { minLevel: 75, maxLevel: 89, title: 'Lord of the Frenzied Flame', perk: '+10% XP gain from Tier 3 Bosses and PvP duels.' },
  { minLevel: 90, maxLevel: 99, title: 'Champion of Grace', perk: 'Reduced respec cost by 50% and +5 SPD initiative bonus.' },
  { minLevel: 100, maxLevel: 100, title: 'Elden Lord', perk: 'Maximum stat allocation unlocked. Crown badge on Telegram leaderboard.' }
];

export const WEAPONS_DATABASE = WEAPONS_DATA;

export const ENEMIES_DATABASE = {
  tier1: ENEMIES_DATA.filter(e => e.tier === 'Common'),
  tier2: ENEMIES_DATA.filter(e => e.tier === 'Elite'),
  tier3: ENEMIES_DATA.filter(e => e.tier === 'Boss'),
  tier5_major_bosses: ENEMIES_DATA.filter(e => e.tier === 'Major Boss')
};

export const ANIME_CARDS_DATABASE = CHARACTERS_DATA;

export const RUSSIAN_ROULETTE_ITEMS = [
  {
    name: 'Magnifying Glass',
    desc: 'Check current chamber round (Live or Blank).',
    cooldown: '1 use / duel'
  },
  {
    name: 'Cigarette',
    desc: 'Restore +1 HP instantly (cannot exceed max starting HP).',
    cooldown: '1 use / duel'
  },
  {
    name: 'Handcuffs',
    desc: 'Skip opponent turn on their next shot.',
    cooldown: '1 use / duel'
  },
  {
    name: 'Hand Saw',
    desc: 'Double the damage of next live shell fired.',
    cooldown: '1 use / duel'
  },
  {
    name: 'Beer Can',
    desc: 'Eject current chamber shell without firing it.',
    cooldown: '1 use / duel'
  }
];

export const BOT_COMMANDS = [
  {
    category: 'Core RPG & Progression',
    command: '/stats',
    params: '',
    desc: 'View your character level, current XP progress, allocated attributes, and active title.',
    example: '/stats'
  },
  {
    category: 'Core RPG & Progression',
    command: '/levelup',
    params: '<stat> [amount]',
    desc: 'Spend available stat points into HP, STR, DEX, SPD, or DEF.',
    example: '/levelup str 5'
  },
  {
    category: 'Core RPG & Progression',
    command: '/respec',
    params: '',
    desc: 'Reset all allocated attributes back to base points. Costs 500 Shards.',
    example: '/respec'
  },
  {
    category: 'Core RPG & Progression',
    command: '/pouches',
    params: '',
    desc: 'View unlocked Talisman Pouch slots and currently equipped Anime Cards.',
    example: '/pouches'
  },
  {
    category: 'Combat & Hunting',
    command: '/hunt',
    params: '',
    desc: 'Trigger a PvE monster hunt encounter. Spawns Common (65%), Elite (25%), or Boss (10%).',
    example: '/hunt'
  },
  {
    category: 'Combat & Hunting',
    command: '/boss',
    params: '',
    desc: 'Engage the active global Major Boss Raid. Boss resets every 2 hours.',
    example: '/boss'
  },
  {
    category: 'Combat & Hunting',
    command: '/fight',
    params: '<@username>',
    desc: 'Challenge another player in the group to a turn-based PvP weapon duel.',
    example: '/fight @TarnishedWarrior'
  },
  {
    category: 'Weapons & Armory',
    command: '/armory',
    params: '[page]',
    desc: 'Browse all weapons currently owned in your inventory.',
    example: '/armory 1'
  },
  {
    category: 'Weapons & Armory',
    command: '/equip',
    params: '<weapon_id>',
    desc: 'Equip an owned weapon into your active hand slot.',
    example: '/equip 02'
  },
  {
    category: 'Weapons & Armory',
    command: '/wshop',
    params: '',
    desc: 'Browse today’s daily rotating selection of 3 weapons available for purchase.',
    example: '/wshop'
  },
  {
    category: 'Weapons & Armory',
    command: '/buy',
    params: '<weapon_id>',
    desc: 'Purchase a weapon from the daily shop using Shards.',
    example: '/buy 01'
  },
  {
    category: 'Weapons & Armory',
    command: '/upgrade',
    params: '<weapon_id>',
    desc: 'Forge and enhance weapon level (+0 to +10) at the Smithy using Shards.',
    example: '/upgrade 02'
  },
  {
    category: 'Gacha & Cards',
    command: '/summon',
    params: '',
    desc: 'Pull 3 anime character cards from the summon pool using Shards.',
    example: '/summon'
  },
  {
    category: 'Gacha & Cards',
    command: '/cards',
    params: '[page]',
    desc: 'Display your collected anime character cards and their talisman effects.',
    example: '/cards 1'
  },
  {
    category: 'Gacha & Cards',
    command: '/pouch_equip',
    params: '<slot> <card_id>',
    desc: 'Equip a Legendary or Mythic anime card into a designated Talisman Pouch slot.',
    example: '/pouch_equip 1 01'
  },
  {
    category: 'Economy & Rewards',
    command: '/daily',
    params: '',
    desc: 'Claim daily Shards and free summon tickets. Resets every 24 hours at UTC midnight.',
    example: '/daily'
  },
  {
    category: 'Economy & Rewards',
    command: '/weekly',
    params: '',
    desc: 'Claim weekly reward crates containing rare upgrade shards.',
    example: '/weekly'
  },
  {
    category: 'Economy & Rewards',
    command: '/balance',
    params: '',
    desc: 'Check your current Shard currency balance.',
    example: '/balance'
  }
];

export function getDailyWeapons(date = new Date()) {
  const tier1Weapons = WEAPONS_DATABASE.filter(w => w.tier === 1);
  if (tier1Weapons.length === 0) return WEAPONS_DATABASE.slice(0, 3);
  const startOfYear = new Date(date.getUTCFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
  const idx1 = Math.abs((dayOfYear * 3) % tier1Weapons.length);
  const idx2 = Math.abs((dayOfYear * 3 + 1) % tier1Weapons.length);
  const idx3 = Math.abs((dayOfYear * 3 + 2) % tier1Weapons.length);
  return [tier1Weapons[idx1], tier1Weapons[idx2], tier1Weapons[idx3]];
}

export function getCurrentMajorBoss(now = new Date()) {
  const bosses = ENEMIES_DATABASE.tier5_major_bosses.length > 0
    ? ENEMIES_DATABASE.tier5_major_bosses
    : ENEMIES_DATA;
  const epochHours = Math.floor(now.getTime() / (1000 * 60 * 60));
  const cycleIndex = Math.abs(Math.floor(epochHours / 2)) % bosses.length;
  const boss = bosses[cycleIndex];
  const cycleStartMs = Math.floor(now.getTime() / (1000 * 60 * 60 * 2)) * (1000 * 60 * 60 * 2);
  const cycleEndMs = cycleStartMs + 2 * 60 * 60 * 1000;
  const msRemaining = Math.max(0, cycleEndMs - now.getTime());
  return { boss, msRemaining, cycleEndMs };
}

export function calculateUpgradedWeapon(weapon, level) {
  const lvl = Math.min(10, Math.max(0, level));
  const base_dmg = Math.round(weapon.base_dmg * (1 + 0.12 * lvl));
  const scaling_str = +(weapon.scaling_str + (weapon.scaling_str > 0 ? 0.05 * lvl : 0)).toFixed(2);
  const scaling_dex = +(weapon.scaling_dex + (weapon.scaling_dex > 0 ? 0.05 * lvl : 0)).toFixed(2);
  const scaling_spd = +(weapon.scaling_spd + (weapon.scaling_spd > 0 ? 0.05 * lvl : 0)).toFixed(2);
  const scaling_def = +(weapon.scaling_def + (weapon.scaling_def > 0 ? 0.05 * lvl : 0)).toFixed(2);
  const block_pct = Math.min(95, weapon.block_pct + 1 * lvl);
  
  const costPerLevel = (l) => {
    if (weapon.tier === 1) return 50 * (l + 1);
    if (weapon.tier === 2) return 120 * (l + 1);
    return 250 * (l + 1);
  };
  
  let totalShardsSpent = 0;
  for (let i = 0; i < lvl; i++) {
    totalShardsSpent += costPerLevel(i);
  }
  
  return {
    level: lvl,
    base_dmg,
    scaling_str,
    scaling_dex,
    scaling_spd,
    scaling_def,
    block_pct,
    costForNextLevel: lvl < 10 ? costPerLevel(lvl) : 0,
    totalShardsSpent
  };
}

export const ANIME_CARDS = ANIME_CARDS_DATABASE.map(c => ({
  id: c.id,
  characterId: c.id,
  ...c
}));

export const ROULETTE_ITEMS = [
  {
    id: 'glass',
    name: 'Magnifying Glass',
    desc: 'Reveals whether the loaded chamber is a Live Shell or a Blank.',
    strategy: 'Use first on your turn. If live, shoot opponent. If blank, shoot yourself to retain turn.'
  },
  {
    id: 'cigarette',
    name: 'Cigarette',
    desc: 'Restores +1 HP life point immediately.',
    strategy: 'Best used after surviving a live round to keep out of lethal one-shot threshold.'
  },
  {
    id: 'cuffs',
    name: 'Handcuffs',
    desc: 'Restrains the opponent, forcing them to skip their next action.',
    strategy: 'Devastating when the cylinder has multiple live shells or when paired with saw.'
  },
  {
    id: 'beer',
    name: 'Beer',
    desc: 'Racks the cylinder and ejects the current shell safely without firing.',
    strategy: 'Safely discards a known live shell or cycles through blanks.'
  },
  {
    id: 'saw',
    name: 'Hand Saw',
    desc: 'Saws off the shotgun barrel so the next live round deals 2x damage.',
    strategy: 'Combines lethally with Magnifying Glass for an instant knockout strike.'
  }
];

export const ALL_ENEMIES = ENEMIES_DATA.map(e => ({
  ...e,
  atk: e.base_dmg,
  shards: `${e.shard_min}-${e.shard_max}`,
  xp: e.xp_reward
}));

BOT_COMMANDS.forEach(cmd => {
  if (!cmd.cmd) cmd.cmd = cmd.command;
});
