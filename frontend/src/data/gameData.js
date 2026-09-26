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
  // Core RPG & Progression
  {
    category: 'Character Progression',
    command: '/stats',
    params: '',
    desc: 'View your character level, current XP progress, allocated attributes, and active title.',
    example: '/stats'
  },
  {
    category: 'Character Progression',
    command: '/levelup',
    params: '<stat> [amount]',
    desc: 'Spend available stat points into HP, STR, DEX, SPD, or DEF.',
    example: '/levelup str 5'
  },
  {
    category: 'Character Progression',
    command: '/respec',
    params: '',
    desc: 'Reset all allocated attributes back to base points. Costs 100 Shards.',
    example: '/respec'
  },
  {
    category: 'Character Progression',
    command: '/pouches',
    params: '',
    desc: 'View unlocked Talisman Pouch slots and currently equipped Anime Cards.',
    example: '/pouches'
  },
  {
    category: 'Character Progression',
    command: '/talismans',
    params: '',
    desc: 'Inspect equipped Talismans, active Mythic passives, and slot limits (Max 1 Mythic).',
    example: '/talismans'
  },
  {
    category: 'Character Progression',
    command: '/setstats',
    params: '<hp> <str> <dex> <spd> <def>',
    desc: 'Instantly allocate total stat points up to the 110 max cap (99 Base + 5 Ref + 6 Clan).',
    example: '/setstats 25 30 20 15 20'
  },
  {
    category: 'Character Progression',
    command: '/presets',
    params: '[save/load/view]',
    desc: 'Manage and quickly switch between customized stat allocation presets. Bonus points permanently preserved.',
    example: '/presets'
  },

  // Clans & Guilds
  {
    category: 'Clans & Guilds',
    command: '/clan',
    params: '',
    desc: 'Open the Clan Dashboard, check member roster, treasury balance, and active guild perks. Alias: /guild.',
    example: '/clan'
  },
  {
    category: 'Clans & Guilds',
    command: '/guild',
    params: '',
    desc: 'Alias for /clan. View clan level, perk bonuses, and member list.',
    example: '/guild'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan create',
    params: '<Name> <TAG>',
    desc: 'Found a new Clan for 500 Shards. TAG must be 2 to 5 alphanumeric characters (e.g. SHP, AKTSK, ELITE).',
    example: '/clan create ShadowKeep SHP'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan join',
    params: '<TAG>',
    desc: 'Submit a join request to a clan by tag. Alias: /join <TAG>. Leader receives automated review DM.',
    example: '/clan join SHP'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan leave',
    params: '',
    desc: 'Leave your current clan. Relinquishes guild passive perks and clan tag.',
    example: '/clan leave'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan donate',
    params: '<amount>',
    desc: 'Donate Shards directly to your Clan Treasury to accelerate clan leveling and perk unlocks.',
    example: '/clan donate 1000'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan requests',
    params: '',
    desc: 'View and manage pending applicant join requests (Leader and Officers).',
    example: '/clan requests'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan promote',
    params: '<@user>',
    desc: 'Promote a Member to Officer rank (Leader only). Alias: /promote.',
    example: '/clan promote @Warrior'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan demote',
    params: '<@user>',
    desc: 'Demote an Officer back to standard Member rank (Leader only). Alias: /demote.',
    example: '/clan demote @Officer'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan kick',
    params: '<@user>',
    desc: 'Remove a player from the clan roster (Leader & Officers). Alias: /clankick.',
    example: '/clan kick @Tarnished'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan transfer',
    params: '<@user>',
    desc: 'Transfer Clan Leadership to another trusted member (Leader only). Alias: /clantransfer.',
    example: '/clan transfer @NewLeader'
  },
  {
    category: 'Clans & Guilds',
    command: '/clan boss',
    params: '',
    desc: 'Challenge the weekly Ancient Clan Titan Boss. Each member gets 3 daily attacks (resets 00:00 UTC).',
    example: '/clan boss'
  },
  {
    category: 'Clans & Guilds',
    command: '/setclanpfp',
    params: '[URL]',
    desc: 'Update your Clan banner / profile image via URL or by replying to a photo (Leader & Officers).',
    example: '/setclanpfp https://example.com/banner.jpg'
  },
  {
    category: 'Clans & Guilds',
    command: '/topclans',
    params: '',
    desc: 'Global leaderboard ranking clans by Level, Treasury, and Roster size.',
    example: '/topclans'
  },

  // Referrals & Social
  {
    category: 'Referrals & Social',
    command: '/ref',
    params: '',
    desc: 'Open your Referral Dashboard to check your invite link, recruit count, and claim milestone rewards.',
    example: '/ref'
  },
  {
    category: 'Referrals & Social',
    command: '/referral',
    params: '',
    desc: 'Alias for /ref. Inspect recruit progress, invite statistics, and milestone rewards.',
    example: '/referral'
  },
  {
    category: 'Referrals & Social',
    command: '/profile',
    params: '[@user]',
    desc: 'View full player profile, equipped clan tag [TAG], unlocked titles, and achievements.',
    example: '/profile'
  },

  // Combat & Raids
  {
    category: 'Combat & Raids',
    command: '/hunt',
    params: '',
    desc: 'Trigger a PvE monster hunt encounter. Spawns Common (65%), Elite (25%), or Boss (10%).',
    example: '/hunt'
  },
  {
    category: 'Combat & Raids',
    command: '/boss',
    params: '',
    desc: 'Engage the active global Major Boss Raid. Boss resets every 2 hours.',
    example: '/boss'
  },
  {
    category: 'Combat & Raids',
    command: '/fight',
    params: '<@username>',
    desc: 'Challenge another player in the group to a turn-based PvP weapon duel.',
    example: '/fight @TarnishedWarrior'
  },

  // Weapons & Armory
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
    desc: 'Browse today’s rotating selection of weapons available for purchase with Shards.',
    example: '/wshop'
  },
  {
    category: 'Weapons & Armory',
    command: '/shop',
    params: '',
    desc: 'Browse the general store for cards, weapons, consumables, and pouch expansions.',
    example: '/shop'
  },
  {
    category: 'Weapons & Armory',
    command: '/buy',
    params: '<item_id>',
    desc: 'Purchase a weapon or card from the shop using Shards.',
    example: '/buy 01'
  },
  {
    category: 'Weapons & Armory',
    command: '/upgrade',
    params: '<weapon_id>',
    desc: 'Forge and enhance weapon level (+0 to +10) at the Smithy using Shards.',
    example: '/upgrade 02'
  },

  // Gacha & Economy
  {
    category: 'Gacha & Economy',
    command: '/summon',
    params: '',
    desc: 'Pull 3 anime character cards from the summon pool using Shards.',
    example: '/summon'
  },
  {
    category: 'Gacha & Economy',
    command: '/cards',
    params: '[page]',
    desc: 'Display your collected anime character cards and their talisman effects.',
    example: '/cards 1'
  },
  {
    category: 'Gacha & Economy',
    command: '/collection',
    params: '',
    desc: 'Inspect your full character collection with inline ability badges and rarity filters.',
    example: '/collection'
  },
  {
    category: 'Gacha & Economy',
    command: '/pouch_equip',
    params: '<slot> <card_id>',
    desc: 'Equip an anime card into a Talisman Pouch slot (Max 1 active Mythic allowed).',
    example: '/pouch_equip 1 01'
  },
  {
    category: 'Gacha & Economy',
    command: '/daily',
    params: '',
    desc: 'Claim daily Shards and free summon tickets. Resets every 24 hours at UTC midnight.',
    example: '/daily'
  },
  {
    category: 'Gacha & Economy',
    command: '/weekly',
    params: '',
    desc: 'Claim weekly reward crates containing rare upgrade shards.',
    example: '/weekly'
  },
  {
    category: 'Gacha & Economy',
    command: '/balance',
    params: '',
    desc: 'Check your current Shard currency balance.',
    example: '/balance'
  },
  {
    category: 'Gacha & Economy',
    command: '/spin',
    params: '[amount]',
    desc: 'Spin the Character Wheel of Fortune (1 to 10 spins) using Arena Vouchers for transparent drops and refund shards.',
    example: '/spin 5'
  },
  {
    category: 'Gacha & Economy',
    command: '/melt',
    params: '<charid_1> <charid_2> ...',
    desc: 'Recycle duplicate character cards of the same rarity to forge Arena Vouchers (Classic 5:1, Rare 3:1, Medium 2:1).',
    example: '/melt 01 01 01 01 01'
  },
  {
    category: 'Gacha & Economy',
    command: '/fav',
    params: '<card_id>',
    desc: 'Favorite/lock an anime card to protect it against accidental /melt or transfers.',
    example: '/fav 189'
  },

  // Minigames & Duels
  {
    category: 'Minigames & Duels',
    command: '/duel',
    params: '<@user>',
    desc: 'Challenge another player to Russian Roulette with 5 tactical items and turn wagers.',
    example: '/duel @Challenger'
  },
  {
    category: 'Minigames & Duels',
    command: '/rduel',
    params: '<@user>',
    desc: 'Wager collected anime cards in a 3-round tactical card duel.',
    example: '/rduel @Opponent'
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

export const CLAN_ROLES = [
  { role: 'Leader', badge: 'Leader', icon: 'Crown', desc: 'Full sovereign management: promote/demote officers, transfer ownership, manage settings, and kick members.' },
  { role: 'Officer', badge: 'Officer', icon: 'Star', desc: 'Operational leadership: review and accept/reject pending applicant requests, update banner (/setclanpfp), and kick standard members.' },
  { role: 'Member', badge: 'Member', icon: 'Shield', desc: 'Active warrior: contributes shards to treasury, participates in 3 daily Titan Boss strikes, and benefits from all clan passive perks.' }
];

export const CLAN_LEVELS = [
  { level: 1, shardsNeeded: 'Base (500 to create)', totalShards: 500, memberCap: 5, perks: 'Clan Creation & Custom Profile Tag [TAG]' },
  { level: 2, shardsNeeded: '1,000 Shards', totalShards: 1000, memberCap: 6, perks: '+5% Hunt XP Boost' },
  { level: 3, shardsNeeded: '2,500 Shards', totalShards: 2500, memberCap: 8, perks: '+1 Bonus RPG Stat Point & +5% Hunt Shards Drop Boost' },
  { level: 4, shardsNeeded: '5,000 Shards', totalShards: 5000, memberCap: 10, perks: '5% RPG Gear Upgrade Discount' },
  { level: 5, shardsNeeded: '10,000 Shards', totalShards: 10000, memberCap: 12, perks: '+1 Bonus RPG Stat Point & +5% PvE Damage Boost' },
  { level: 6, shardsNeeded: '18,000 Shards', totalShards: 18000, memberCap: 15, perks: '+10% Hunt XP Boost' },
  { level: 7, shardsNeeded: '30,000 Shards', totalShards: 30000, memberCap: 18, perks: '+1 Bonus RPG Stat Point & +10% Hunt Shards Drop Boost' },
  { level: 8, shardsNeeded: '50,000 Shards', totalShards: 50000, memberCap: 22, perks: '10% RPG Gear Upgrade Discount' },
  { level: 9, shardsNeeded: '75,000 Shards', totalShards: 75000, memberCap: 26, perks: '+1 Bonus RPG Stat Point & +10% PvE Damage Boost' },
  { level: 10, shardsNeeded: '120,000 Shards', totalShards: 120000, memberCap: 30, perks: '+2 Bonus RPG Stat Points (Total +6 from Clan Perks) & +1 Extra Talisman Slot for active members (+15% XP/Shards/DMG, 15% Upgrade Discount)' },
];

export const CHALLENGER_TIERS = [
  { tier: 'Classic', hp: 800, atk: 35, shards: 35, cardDrop: '75%', color: 'text-zinc-300' },
  { tier: 'Rare', hp: 1400, atk: 60, shards: 65, cardDrop: '50%', color: 'text-sky-300' },
  { tier: 'Medium', hp: 2200, atk: 95, shards: 100, cardDrop: '35%', color: 'text-indigo-300' },
  { tier: 'Legendary', hp: 3500, atk: 140, shards: 200, cardDrop: '20%', color: 'text-amber-300' },
];

export const REFERRAL_DATA = {
  inviteFormat: '/start ref_<USER_ID>',
  baseRecruit: {
    title: 'New Recruit Welcome Bundle',
    rewards: '+30 Welcome Starter Shards + Starter RPG Equipment'
  },
  baseInviter: {
    title: 'Inviter Bounty',
    rewards: '+100 Shards + 1 Classic Character Card (+50 Shards duplicate compensation)'
  },
  milestones: [
    { recruits: 1, reward: 'Random Tier 2 Elite Weapon', dupReward: '+50 Shards duplicate protection' },
    { recruits: 3, reward: 'Random Tier 2 Elite Weapon + 1 Legendary Character Card (with random +5 stat roll)', dupReward: 'Duplicate protection applies' },
    { recruits: 5, reward: '+500 Shards + +5 RPG Stat Points + Grand Recruiter Achievement Title', dupReward: 'Unlocks Grand Recruiter Title' },
    { recruits: 10, reward: '+1,000 Shards + Tier 3 Boss Weapon', dupReward: 'Apex recruitment reward' },
  ]
};

export const SHOP_PRICING = {
  characterCards: [
    { rarity: 'Classic', range: '30–50 ◈', desc: 'Foundational anime cards and collection synthesis' },
    { rarity: 'Rare', range: '90–150 ◈', desc: 'Higher stat cards and enhanced collector ratings' },
    { rarity: 'Medium', range: '210–320 ◈', desc: 'Elite anime characters with high market value' },
    { rarity: 'Legendary', range: '580–850 ◈', desc: 'Peak +5 combat attribute talisman cards (STR, DEX, SPD, DEF)' },
  ],
  weapons: [
    { tier: 'Tier 1 Starters', price: '0 ◈', desc: 'Standard starter armaments (/equip 01, 02, 03, 04)' },
    { tier: 'Tier 1 Advanced', price: '250–450 ◈', desc: 'Advanced early-game weapons rotated in daily shop' },
    { tier: 'Tier 2 Standard', price: '650–880 ◈', desc: 'Mid-game armaments with elevated damage and block absorption' },
    { tier: 'Tier 2 Status/Elite', price: '1,100–1,450 ◈', desc: 'Elite weapons with innate status effects (Bleed, Scarlet Rot, Frost)' },
  ]
};

export const CLAN_GLORY_SYSTEM = {
  overview: 'Glory Points (GP) are earned collaboratively by clan members through World Boss Raids and clan activities.',
  settlementSchedule: 'Weekly Settlement occurs automatically every Sunday at 00:00 UTC.',
  deliveryMethod: 'Rewards are distributed directly to eligible members via Telegram DM.',
  minThreshold: 25,
  minThresholdDesc: 'Minimum eligibility threshold: 25 GP contributed during the active week to receive settlement rewards.',
  rankRewards: [
    { rank: 'Rank 1', vouchers: 10, shards: 500, treasury: 500, minGP: 25, tierDesc: 'Champion Clan Tier' },
    { rank: 'Rank 2–3', vouchers: 6, shards: 300, treasury: 250, minGP: 25, tierDesc: 'Podium Clan Tier' },
    { rank: 'Rank 4–10', vouchers: 3, shards: 150, treasury: 100, minGP: 25, tierDesc: 'Top 10 Contenders Tier' },
    { rank: 'Rank 11+', vouchers: 1, shards: 50, treasury: 0, minGP: 50, tierDesc: 'Active Contenders Tier (Requires min. 50 GP)' },
  ],
  mvpAward: {
    title: 'Clan MVP Award',
    bonusVouchers: 2,
    bonusShards: 100,
    desc: 'The single highest GP contributor in each eligible clan earns an additional +2 Bonus Vouchers and +100 Shards.'
  }
};

export const WHEEL_OF_FORTUNE = {
  command: '/spin [amount]',
  spinsRange: '1 to 10 spins at a time',
  currency: 'Arena Vouchers',
  sources: 'Clan Glory Sunday settlements, Character Card Melting Station (/melt), and special redeem codes',
  rates: [
    { rarity: 'Classic', rate: '50.0%', stars: 1, desc: 'Foundational anime cards and collection synthesis' },
    { rarity: 'Medium', rate: '25.0%', stars: 3, desc: 'Elite anime characters with versatile collection value' },
    { rarity: 'Rare', rate: '15.0%', stars: 2, desc: 'High-value characters with enhanced attributes' },
    { rarity: 'Legendary', rate: '8.0%', stars: 4, desc: 'Peak +5 combat attribute talisman cards' },
    { rarity: 'Mythic', rate: '2.0%', stars: 5, desc: 'Pinnacle +50 Max HP and exclusive in-combat passives' },
  ],
  duplicateRefunds: [
    { rarity: 'Classic', refund: '+5 Shards' },
    { rarity: 'Medium', refund: '+10 Shards' },
    { rarity: 'Rare', refund: '+25 Shards' },
    { rarity: 'Legendary', refund: '+75 Shards' },
    { rarity: 'Mythic', refund: '+200 Shards' },
  ]
};

export const MELTING_STATION = {
  command: '/melt <charid_1> <charid_2> [charid_3] ...',
  purpose: 'Sacrifice duplicate character cards to forge Arena Vouchers for the Wheel of Fortune (/spin).',
  ratios: [
    { rarity: 'Classic', requirement: '5 cards ➔ 1 Voucher', note: 'Requires multiples of 5' },
    { rarity: 'Rare', requirement: '3 cards ➔ 1 Voucher', note: 'Requires multiples of 3' },
    { rarity: 'Medium', requirement: '2 cards ➔ 1 Voucher', note: 'Requires multiples of 2' },
  ],
  protectedTiers: [
    { rarity: 'Legendary', status: 'Protected tier (strictly cannot be melted)' },
    { rarity: 'Mythic', status: 'Protected tier (strictly cannot be melted)' },
  ],
  rules: [
    'Single-Rarity Batching: All cards in a single /melt command must belong to the exact same rarity.',
    'Multi-Copy Melting: Multiple copies of the same character can be melted by repeating the ID (e.g. /melt 01 01 01 01 01).',
    'Favorite & Equipped Protection: Favorited cards (/fav) and actively equipped Talisman cards are locked and cannot be melted.',
    'Safety Confirmation Prompt: Features an interactive inline confirmation prompt before cards are permanently destroyed.'
  ]
};

export const STAT_POINTS_EXPANSION = {
  maxCap: 110,
  breakdown: [
    { source: 'Base Level-ups', points: 99, desc: 'Level 1 to 100 Tarnished (Level - 1 formula)' },
    { source: 'Referral Milestones', points: 5, desc: 'Unlocked at Milestone 5 in /ref' },
    { source: 'Clan Level Perks', points: 6, desc: 'Unlocked across Clan Levels 3, 5, 7, 9, 10 in /clan' },
  ],
  totalFormula: '99 Base + 5 Referral + 6 Clan Perks = 110 Total Max Stat Points',
  preservation: 'Bonus stat points (+11 total) are permanently preserved across Rebirth (/rebirth / /respec), custom allocation (/setstats), and Stat Presets (/presets).'
};

export const ELDEN_RING_DLC_WEAPON_CATEGORIES = [
  { name: 'Light-Greatswords', desc: 'Fluid continuous stance combos blending greatsword reach with straight-sword recovery speeds.' },
  { name: 'Hand-to-Hand Arts', desc: 'Martial unarmed strikes delivering high poise disruption and lightning-fast strike chains.' },
  { name: 'Great-Katanas', desc: 'Colossal slashing blades inflicting innate bleed with massive sweeping reach in PvE and PvP.' },
  { name: 'Backhand Blades', desc: 'High-dexterity twin blades featuring swift evasive pivot maneuvers and rapid blindspot strikes.' },
  { name: 'Beast Claws', desc: 'Ferocious predatory lunges with savage continuous multi-hit bleed build-up.' },
  { name: 'Throwing Blades', desc: 'Ranged piercing projectiles requiring no ammunition with rapid critical strike scaling.' },
  { name: 'Heavy Thrusting Swords', desc: 'Devastating armor-piercing counter-thrusts that pierce through standard guard absorption.' }
];

export const MYTHIC_PASSIVES = {
  limitRule: '1 Mythic Talisman Limit Rule: Players can only have 1 active Mythic Talisman equipped at a time. Equipping a second Mythic automatically swaps the existing one in-place while keeping Legendary / Summer Edition cards intact in other slots.',
  passives: [
    {
      id: '289',
      character: 'Changsu OH',
      ability: "Lord of Blood's Exultation",
      effect: 'Landing a Blood Loss hit triggers +20% ATK damage on your next 3 strikes (PvP, PvE Hunts, World Boss Raids).',
      anime: 'Lookism'
    },
    {
      id: '189',
      character: 'Bunny Iglesias',
      ability: 'Vampiric Rot',
      effect: '100% of Scarlet Rot DoT ticks heal your character directly (PvP, PvE Hunts, World Boss Raids).',
      anime: 'Blue Lock'
    }
  ]
};
