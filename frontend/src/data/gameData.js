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

export const WEAPONS_DATABASE = [
  {
    id: 'starter_straight_sword',
    name: 'Longsword of Grace',
    type: 'Straight Sword',
    tier: 1,
    base_dmg: 22,
    speed_mod: 2,
    scaling_str: 0.35,
    scaling_dex: 0.30,
    scaling_spd: 0.05,
    scaling_def: 0.0,
    crit_mult: 1.5,
    block_pct: 45,
    price: 150,
    rarity: 'Common',
    desc: 'Standard issue straight sword blessed by faint golden residue. Balanced for any aspiring Tarnished.',
    icon: 'Sword'
  },
  {
    id: 'uchigatana',
    name: 'Land of Reeds Uchigatana',
    type: 'Katana',
    tier: 1,
    base_dmg: 24,
    speed_mod: 4,
    scaling_str: 0.15,
    scaling_dex: 0.50,
    scaling_spd: 0.10,
    scaling_def: 0.0,
    crit_mult: 1.75,
    block_pct: 35,
    price: 220,
    rarity: 'Common',
    desc: 'Single-edged curved blade designed for lethal slashes and rapid bleed buildup.',
    icon: 'Sword'
  },
  {
    id: 'claymore_greatsword',
    name: 'Bastard Claymore',
    type: 'Greatsword',
    tier: 1,
    base_dmg: 30,
    speed_mod: -2,
    scaling_str: 0.60,
    scaling_dex: 0.20,
    scaling_spd: 0.0,
    scaling_def: 0.10,
    crit_mult: 1.4,
    block_pct: 55,
    price: 250,
    rarity: 'Common',
    desc: 'Heavy two-handed greatsword capable of cleaving multiple soldiers in a wide arc.',
    icon: 'Shield'
  },
  {
    id: 'reduvia_dagger',
    name: 'Blood Dagger Reduvia',
    type: 'Dagger',
    tier: 1,
    base_dmg: 18,
    speed_mod: 6,
    scaling_str: 0.10,
    scaling_dex: 0.55,
    scaling_spd: 0.25,
    scaling_def: 0.0,
    crit_mult: 2.0,
    block_pct: 25,
    price: 200,
    rarity: 'Common',
    desc: 'Jagged curved dagger drenched in sacrificial blood. High critical multiplier on backstabs.',
    icon: 'Flame'
  },
  {
    id: 'partisan_spear',
    name: 'Gilded Partisan Spear',
    type: 'Spear',
    tier: 1,
    base_dmg: 25,
    speed_mod: 1,
    scaling_str: 0.40,
    scaling_dex: 0.35,
    scaling_spd: 0.05,
    scaling_def: 0.05,
    crit_mult: 1.45,
    block_pct: 50,
    price: 210,
    rarity: 'Common',
    desc: 'Long polearm allowing safe attacks from behind a sturdy guard.',
    icon: 'Crosshair'
  },
  {
    id: 'battle_axe',
    name: 'Iron Battle Axe',
    type: 'Axe',
    tier: 1,
    base_dmg: 27,
    speed_mod: 0,
    scaling_str: 0.55,
    scaling_dex: 0.15,
    scaling_spd: 0.0,
    scaling_def: 0.05,
    crit_mult: 1.5,
    block_pct: 42,
    price: 180,
    rarity: 'Common',
    desc: 'A heavy cleaving weapon favored by highland vanguard fighters.',
    icon: 'Axe'
  },
  {
    id: 'bloodhound_fang',
    name: "Bloodhound's Fang",
    type: 'Curved Greatsword',
    tier: 2,
    base_dmg: 42,
    speed_mod: 3,
    scaling_str: 0.45,
    scaling_dex: 0.65,
    scaling_spd: 0.15,
    scaling_def: 0.0,
    crit_mult: 1.65,
    block_pct: 52,
    price: 650,
    rarity: 'Elite',
    desc: 'Curved greatsword with a gently rippling blade wielded by Bloodhound Knights. Grants agile step-in slashes.',
    icon: 'Zap'
  },
  {
    id: 'crucible_horn_spear',
    name: 'Crucible Horn Spear',
    type: 'Great Spear',
    tier: 2,
    base_dmg: 46,
    speed_mod: -1,
    scaling_str: 0.70,
    scaling_dex: 0.20,
    scaling_spd: 0.0,
    scaling_def: 0.20,
    crit_mult: 1.4,
    block_pct: 62,
    price: 720,
    rarity: 'Elite',
    desc: 'Ancient spear channeling the primordial vitality of the crucible. Enhances defense block absorption.',
    icon: 'Shield'
  },
  {
    id: 'rivers_of_blood',
    name: 'Rivers of Blood',
    type: 'Katana',
    tier: 2,
    base_dmg: 38,
    speed_mod: 5,
    scaling_str: 0.20,
    scaling_dex: 0.75,
    scaling_spd: 0.20,
    scaling_def: 0.0,
    crit_mult: 1.85,
    block_pct: 38,
    price: 850,
    rarity: 'Elite',
    desc: 'Cursed katana of Okina that paints the ground in crimson arcs with relentless Corpse Piler flurries.',
    icon: 'Flame'
  },
  {
    id: 'moonveil_katana',
    name: 'Moonveil Katana',
    type: 'Katana',
    tier: 2,
    base_dmg: 40,
    speed_mod: 4,
    scaling_str: 0.20,
    scaling_dex: 0.70,
    scaling_spd: 0.15,
    scaling_def: 0.05,
    crit_mult: 1.8,
    block_pct: 40,
    price: 820,
    rarity: 'Elite',
    desc: 'Forged from glintstone luster, sheath drawing releases a lethal wave of pure transient moonlight.',
    icon: 'Sparkles'
  },
  {
    id: 'berserk_dragonslayer',
    name: 'Dragonslayer Greatsword',
    type: 'Colossal Sword',
    tier: 2,
    base_dmg: 54,
    speed_mod: -4,
    scaling_str: 0.95,
    scaling_dex: 0.05,
    scaling_spd: -0.10,
    scaling_def: 0.30,
    crit_mult: 1.5,
    block_pct: 70,
    price: 900,
    rarity: 'Elite',
    desc: 'Too big to be called a sword. Massive, thick, heavy, and far too rough. It was more like a heap of raw iron.',
    icon: 'Hammer'
  },
  {
    id: 'dark_moon_greatsword',
    name: 'Dark Moon Greatsword',
    type: 'Greatsword',
    tier: 3,
    base_dmg: 65,
    speed_mod: 2,
    scaling_str: 0.40,
    scaling_dex: 0.40,
    scaling_spd: 0.10,
    scaling_def: 0.20,
    crit_mult: 1.7,
    block_pct: 65,
    price: 1800,
    rarity: 'Boss',
    desc: 'A bridal gift from Ranni the Witch. Bathed in cold lunar light, charging heavy strikes releases moonlight beams.',
    icon: 'Moon'
  },
  {
    id: 'sacred_relic_sword',
    name: 'Sacred Relic Sword',
    type: 'Greatsword',
    tier: 3,
    base_dmg: 70,
    speed_mod: 1,
    scaling_str: 0.50,
    scaling_dex: 0.60,
    scaling_spd: 0.05,
    scaling_def: 0.15,
    crit_mult: 1.6,
    block_pct: 60,
    price: 2200,
    rarity: 'Boss',
    desc: 'Sword wrought from the remains of a god who should have lived as the Elden Beast. Unleashes Wave of Gold.',
    icon: 'Crown'
  },
  {
    id: 'hand_of_malenia',
    name: 'Hand of Malenia',
    type: 'Katana',
    tier: 3,
    base_dmg: 68,
    speed_mod: 6,
    scaling_str: 0.15,
    scaling_dex: 0.95,
    scaling_spd: 0.25,
    scaling_def: 0.0,
    crit_mult: 1.9,
    block_pct: 45,
    price: 2400,
    rarity: 'Boss',
    desc: 'Unalloyed gold prosthetic blade of Malenia, Goddess of Rot. Famous for the unavoidable Waterfowl Dance.',
    icon: 'Flower'
  },
  {
    id: 'starscourge_greatswords',
    name: 'Starscourge Greatswords',
    type: 'Colossal Sword',
    tier: 3,
    base_dmg: 78,
    speed_mod: -3,
    scaling_str: 1.05,
    scaling_dex: 0.20,
    scaling_spd: -0.05,
    scaling_def: 0.35,
    crit_mult: 1.55,
    block_pct: 75,
    price: 2300,
    rarity: 'Boss',
    desc: 'Curved black greatswords of General Radahn. Gravity crest allows pull-in vortex and earth-shattering slams.',
    icon: 'Globe'
  },
  {
    id: 'inverted_spear_of_heaven',
    name: 'Inverted Spear of Heaven',
    type: 'Dagger',
    tier: 3,
    base_dmg: 62,
    speed_mod: 8,
    scaling_str: 0.30,
    scaling_dex: 0.85,
    scaling_spd: 0.40,
    scaling_def: 0.0,
    crit_mult: 2.1,
    block_pct: 35,
    price: 2100,
    rarity: 'Boss',
    desc: 'Special grade cursed tool wielded by Toji Fushiguro. Nullifies any defensive magic and bypasses armor barriers.',
    icon: 'Zap'
  },
  {
    id: 'kamish_wrath',
    name: "Kamish's Wrath (Solo Leveling)",
    type: 'Dual Daggers',
    tier: 3,
    base_dmg: 72,
    speed_mod: 7,
    scaling_str: 0.40,
    scaling_dex: 0.90,
    scaling_spd: 0.35,
    scaling_def: 0.05,
    crit_mult: 2.2,
    block_pct: 40,
    price: 2500,
    rarity: 'Boss',
    desc: 'Crafted from the sharpest tooth of the Dragon Monarch Kamish. Emanates overwhelming crimson aura of annihilation.',
    icon: 'Flame'
  }
];

export const ENEMIES_DATABASE = {
  tier1: [
    {
      id: 'godrick_soldier',
      name: 'Godrick Crossbow Soldier',
      tier: 'Common (Tier 1)',
      hp: 110,
      base_dmg: 18,
      def: 12,
      spd: 8,
      xp_reward: 35,
      shard_reward: 40,
      drops: ['Longsword of Grace', 'Iron Bolts', 'Tarnished Shard'],
      weakness: 'Lightning & Heavy Strike',
      desc: 'Infantry stationed along Limgrave roads. Easily staggered by heavy attacks.'
    },
    {
      id: 'stray_hound',
      name: 'Rotten Stray Hound',
      tier: 'Common (Tier 1)',
      hp: 85,
      base_dmg: 22,
      def: 6,
      spd: 16,
      xp_reward: 30,
      shard_reward: 35,
      drops: ['Beast Liver', 'Hound Claws'],
      weakness: 'Fire damage & Guard Counters',
      desc: 'Swift canine afflicted by scarlet rot. Attacks rapidly with low poise.'
    },
    {
      id: 'vulgar_militia',
      name: 'Vulgar Militia Rogue',
      tier: 'Common (Tier 1)',
      hp: 95,
      base_dmg: 24,
      def: 10,
      spd: 14,
      xp_reward: 45,
      shard_reward: 55,
      drops: ['Reduvia Dagger', 'Smoke Pot'],
      weakness: 'Slash attacks & Parrying',
      desc: 'Diminutive beast-like guerilla warriors who throw smoke bombs and strike from the mist.'
    },
    {
      id: 'hollow_soldier',
      name: 'Wandering Exile Bandit',
      tier: 'Common (Tier 1)',
      hp: 125,
      base_dmg: 20,
      def: 16,
      spd: 10,
      xp_reward: 40,
      shard_reward: 50,
      drops: ['Bastard Claymore', 'Exile Hood'],
      weakness: 'Magic & Poise Break',
      desc: 'Rugged deserter equipped with curved broadsword and heavy armor plates.'
    }
  ],
  tier2: [
    {
      id: 'crucible_knight',
      name: 'Crucible Knight Ordovis',
      tier: 'Elite (Tier 2)',
      hp: 380,
      base_dmg: 45,
      def: 45,
      spd: 12,
      xp_reward: 220,
      shard_reward: 280,
      drops: ['Crucible Horn Spear', 'Aspect of the Crucible', 'Hero Shard x2'],
      weakness: 'Parry & Lightning Piercing',
      desc: 'Ancient knight in heavy primordial armor. Uses tail sweeps and winged dive attacks when enraged.'
    },
    {
      id: 'bloodhound_knight_darriwil',
      name: 'Bloodhound Knight Darriwil',
      tier: 'Elite (Tier 2)',
      hp: 320,
      base_dmg: 52,
      def: 30,
      spd: 26,
      xp_reward: 250,
      shard_reward: 320,
      drops: ["Bloodhound's Fang", 'Bloodhound Step Ash'],
      weakness: 'Heavy Guard Counter & Strike Damage',
      desc: 'Agile quadruped hunter that teleports via mist steps and lunges with razor claws.'
    },
    {
      id: 'cleanrot_knight',
      name: 'Cleanrot Knight Finlay',
      tier: 'Elite (Tier 2)',
      hp: 350,
      base_dmg: 48,
      def: 38,
      spd: 18,
      xp_reward: 240,
      shard_reward: 300,
      drops: ['Cleanrot Spear', 'Halo Scythe', 'Scarlet Preserve'],
      weakness: 'Fire Damage & Bleed',
      desc: 'Valiant knight fighting beside Malenia despite rotting flesh within sealed golden plate.'
    },
    {
      id: 'bell_bearing_hunter',
      name: 'Bell Bearing Hunter (Elemer)',
      tier: 'Elite (Tier 2)',
      hp: 440,
      base_dmg: 56,
      def: 50,
      spd: 14,
      xp_reward: 300,
      shard_reward: 380,
      drops: ['Marais Executioner Sword', 'Bell Bearing [3]'],
      weakness: 'Frostbite & Holy Damage',
      desc: 'Menacing armored executioner who telekinetically flings a red-glowing greatsword.'
    }
  ],
  tier3: [
    {
      id: 'starscourge_radahn',
      name: 'General Radahn, Starscourge',
      tier: 'Boss (Tier 3)',
      hp: 850,
      base_dmg: 82,
      def: 65,
      spd: 20,
      xp_reward: 850,
      shard_reward: 1200,
      drops: ['Starscourge Greatswords', 'Remembrance of the Starscourge', 'Ancient Dragon Smithing Stone'],
      weakness: 'Scarlet Rot & Pierce Damage',
      desc: 'The mightiest demigod of the Shattering who halted the movement of the stars with gravity sorcery.'
    },
    {
      id: 'morgott_omen_king',
      name: 'Morgott, the Omen King',
      tier: 'Boss (Tier 3)',
      hp: 780,
      base_dmg: 78,
      def: 58,
      spd: 24,
      xp_reward: 800,
      shard_reward: 1100,
      drops: ["Morgott's Cursed Sword", 'Remembrance of the Omen King'],
      weakness: 'Slash Damage & Bleed',
      desc: 'The veiled monarch of Leyndell. Conjures holy daggers, spears, and bloodflame cursed slashes.'
    },
    {
      id: 'mohg_lord_of_blood',
      name: 'Mohg, Lord of Blood',
      tier: 'Boss (Tier 3)',
      hp: 920,
      base_dmg: 88,
      def: 62,
      spd: 18,
      xp_reward: 950,
      shard_reward: 1400,
      drops: ["Mohgwyn's Sacred Spear", 'Bloodflame Incantation', 'Great Rune of Mohg'],
      weakness: 'Purifying Crystal Tear & Physical Strike',
      desc: 'Blood demigod lurking in the subterranean mausoleum. Chants NIHIL to drain player life.'
    }
  ],
  tier5_major_bosses: [
    {
      id: 'malenia_blade_of_miquella',
      name: 'Malenia, Goddess of Rot',
      tier: 'Major Boss (Tier 5)',
      hp: 1600,
      base_dmg: 115,
      def: 75,
      spd: 32,
      xp_reward: 2500,
      shard_reward: 4000,
      drops: ['Hand of Malenia', 'Scarlet Aeonia', 'Elden Core x3', 'Legendary Anime Card Ticket'],
      weakness: 'Frostbite, Bleed & Heavy Poise Stagger',
      desc: 'I am Malenia, Blade of Miquella, and I have never known defeat. Heals on every connected hit and releases devastating Waterfowl Dance.'
    },
    {
      id: 'godfrey_first_elden_lord',
      name: 'Godfrey, First Elden Lord / Hoarah Loux',
      tier: 'Major Boss (Tier 5)',
      hp: 1750,
      base_dmg: 125,
      def: 82,
      spd: 22,
      xp_reward: 2600,
      shard_reward: 4200,
      drops: ["Axe of Godfrey", 'Hoarah Loux Earthshaker', 'Elden Core x3'],
      weakness: 'Lightning & Jump Attacks over shockwaves',
      desc: 'The first consort of Queen Marika. Discards his axe in phase two to fight with barehanded grappling strikes as Hoarah Loux, Warrior.'
    },
    {
      id: 'radagon_elden_beast',
      name: 'Radagon & The Elden Beast',
      tier: 'Major Boss (Tier 5)',
      hp: 2000,
      base_dmg: 130,
      def: 88,
      spd: 20,
      xp_reward: 3000,
      shard_reward: 5000,
      drops: ['Sacred Relic Sword', "Marika's Hammer", 'Elden Ring Great Rune'],
      weakness: 'Fire Damage & High Physical Strike',
      desc: 'The living incarnation of the Golden Order and the cosmic vassal of the Greater Will.'
    },
    {
      id: 'ryomen_sukuna_raid',
      name: 'Ryomen Sukuna, King of Curses',
      tier: 'Major Boss (Tier 5)',
      hp: 1850,
      base_dmg: 135,
      def: 80,
      spd: 35,
      xp_reward: 2800,
      shard_reward: 4500,
      drops: ["Sukuna's Severed Finger", 'Malevolent Shrine Domain Card', 'Special Grade Token'],
      weakness: 'Soul Perception & Reverse Cursed Output',
      desc: 'Ancient sorcerer with unmatched cursed energy. Deploys Dismantle, Cleave, and Domain Expansion: Malevolent Shrine.'
    },
    {
      id: 'sosuke_aizen_raid',
      name: 'Sosuke Aizen (Hokyoku Fusion)',
      tier: 'Major Boss (Tier 5)',
      hp: 1900,
      base_dmg: 128,
      def: 85,
      spd: 30,
      xp_reward: 2900,
      shard_reward: 4800,
      drops: ['Kyoka Suigetsu Blade', 'Hogyoku Fragment Card', 'Hado #90 Kurohitsugi'],
      weakness: 'Absolute Spatial Severing & Unpredictable Feints',
      desc: 'Former captain possessing complete hypnosis via Kyoka Suigetsu. Transcends death through the Hogyoku.'
    },
    {
      id: 'sung_jinwoo_shadow_monarch',
      name: 'Sung Jin-Woo, The Shadow Monarch',
      tier: 'Major Boss (Tier 5)',
      hp: 1950,
      base_dmg: 140,
      def: 78,
      spd: 38,
      xp_reward: 3100,
      shard_reward: 5200,
      drops: ["Kamish's Wrath (Solo Leveling)", 'Shadow Monarch Sigil', 'Beru / Igris Card Summon'],
      weakness: 'Light Affinity & Overwhelming Burst before Shadow Army',
      desc: 'Ruler of the Dead with an infinite legion of shadow soldiers. Executes instant stealth strikes and Monarch Domain.'
    }
  ]
};

export const ANIME_CARDS_DATABASE = [
  {
    characterId: 'card_gojo_satoru',
    name: 'Satoru Gojo (Limitless)',
    anime: 'Jujutsu Kaisen',
    rarity: 'Mythic',
    stat: { type: 'SPD', value: 5 },
    quote: 'Throughout heaven and earth, I alone am the honored one.',
    desc: 'Six Eyes bearer with infinite acceleration. Grants +5 SPD when slotted into Talisman Pouch.'
  },
  {
    characterId: 'card_sukuna',
    name: 'Ryomen Sukuna',
    anime: 'Jujutsu Kaisen',
    rarity: 'Mythic',
    stat: { type: 'STR', value: 5 },
    quote: 'Know your place, fool.',
    desc: 'Unmatched raw destructive power. Grants +5 STR to weapon strikes.'
  },
  {
    characterId: 'card_sung_jinwoo',
    name: 'Sung Jin-Woo (Shadow Monarch)',
    anime: 'Solo Leveling',
    rarity: 'Mythic',
    stat: { type: 'DEX', value: 5 },
    quote: 'ARISE.',
    desc: 'Supreme agility and fatal dagger precision. Grants +5 DEX and boosts critical hit probability.'
  },
  {
    characterId: 'card_aizen',
    name: 'Sosuke Aizen',
    anime: 'Bleach',
    rarity: 'Mythic',
    stat: { type: 'DEF', value: 5 },
    quote: 'Since when were you under the impression that I was not using Kyoka Suigetsu?',
    desc: 'Impenetrable spiritual pressure barrier. Grants +5 DEF mitigation.'
  },
  {
    characterId: 'card_toji_fushiguro',
    name: 'Toji Fushiguro',
    anime: 'Jujutsu Kaisen',
    rarity: 'Legendary',
    stat: { type: 'SPD', value: 5 },
    quote: 'I left all that sorcery garbage behind.',
    desc: 'Heavenly restriction granting godlike physical reaction speed. +5 SPD.'
  },
  {
    characterId: 'card_ichigo_bankai',
    name: 'Ichigo Kurosaki (Tensa Zangetsu)',
    anime: 'Bleach',
    rarity: 'Legendary',
    stat: { type: 'STR', value: 5 },
    quote: 'Getsuga Tensho!',
    desc: 'Compressed bankai reiryoku delivering colossal slashing blows. +5 STR.'
  },
  {
    characterId: 'card_ranni_witch',
    name: 'Ranni the Witch',
    anime: 'Elden Ring',
    rarity: 'Legendary',
    stat: { type: 'DEF', value: 5 },
    quote: 'Now cometh the age of the stars.',
    desc: 'Cold lunar ward protecting the chosen Tarnished Lord. +5 DEF.'
  },
  {
    characterId: 'card_malenia',
    name: 'Malenia, Undefeated',
    anime: 'Elden Ring',
    rarity: 'Legendary',
    stat: { type: 'DEX', value: 5 },
    quote: 'Heed my words. I am Malenia.',
    desc: 'Peerless unalloyed swordsmanship with supreme critical precision. +5 DEX.'
  },
  {
    characterId: 'card_gun_park',
    name: 'Gun Park (Shiro Oni)',
    anime: 'Lookism',
    rarity: 'Legendary',
    stat: { type: 'HP', value: 50 },
    quote: 'Pain? That is just proof that I am alive.',
    desc: 'Unbreakable body tempered in blood. Grants massive +50 Max HP in Talisman Pouch.'
  },
  {
    characterId: 'card_goo_kim',
    name: 'Goo Kim (Weapon Master)',
    anime: 'Lookism',
    rarity: 'Legendary',
    stat: { type: 'DEX', value: 5 },
    quote: 'Anything in my hands becomes a sword.',
    desc: 'Genius swordsman capable of cutting steel with chopstick precision. +5 DEX.'
  },
  {
    characterId: 'card_daniel_park_ui',
    name: 'UI Daniel Park',
    anime: 'Lookism',
    rarity: 'Legendary',
    stat: { type: 'SPD', value: 5 },
    quote: 'Perfect Machine of Combat.',
    desc: 'Ultra Instinct reflexive mastery. Guarantees top initiative. +5 SPD.'
  },
  {
    characterId: 'card_killua_godspeed',
    name: 'Killua Zoldyck (Godspeed)',
    anime: 'Hunter x Hunter',
    rarity: 'Legendary',
    stat: { type: 'SPD', value: 5 },
    quote: 'Lightning is inside me.',
    desc: 'Electric aura sending lightning commands directly to muscle nerves. +5 SPD.'
  },
  {
    characterId: 'card_rengoku',
    name: 'Kyojuro Rengoku (Flame Hashira)',
    anime: 'Demon Slayer',
    rarity: 'Legendary',
    stat: { type: 'STR', value: 5 },
    quote: 'Set your heart ablaze!',
    desc: 'Ninth Form: Rengoku incinerating all resistance. +5 STR.'
  },
  {
    characterId: 'card_summer_makima',
    name: 'Makima (Summer Edition)',
    anime: 'Chainsaw Man',
    rarity: 'Summer Edition',
    stat: { type: 'DEF', value: 5 },
    quote: 'A corpse is talking.',
    desc: 'Exclusive seasonal summer gacha edition card with golden frame.'
  },
  {
    characterId: 'card_summer_yor',
    name: 'Yor Forger (Summer Rose)',
    anime: 'Spy x Family',
    rarity: 'Summer Edition',
    stat: { type: 'DEX', value: 5 },
    quote: 'Would you mind if I took your life?',
    desc: 'Thorn Princess enjoying summer breeze with lethal grace.'
  },
  {
    characterId: 'card_zoro',
    name: 'Roronoa Zoro (King of Hell)',
    anime: 'One Piece',
    rarity: 'Rare',
    stat: { type: 'STR', value: 3 },
    quote: 'Scars on the back are a swordsman\'s shame.',
    desc: 'Three-sword style Enma conqueror infused slashes.'
  },
  {
    characterId: 'card_megumi_fushiguro',
    name: 'Megumi Fushiguro',
    anime: 'Jujutsu Kaisen',
    rarity: 'Rare',
    stat: { type: 'DEF', value: 3 },
    quote: 'With this treasure I summon...',
    desc: 'Ten Shadows technique master.'
  },
  {
    characterId: 'card_tanjiro',
    name: 'Tanjiro Kamado (Sun Breathing)',
    anime: 'Demon Slayer',
    rarity: 'Rare',
    stat: { type: 'DEX', value: 3 },
    quote: 'No matter how many people you may lose, you have no choice but to go on living.',
    desc: 'Hinokami Kagura solar dancer.'
  },
  {
    characterId: 'card_denji',
    name: 'Denji (Chainsaw Devil)',
    anime: 'Chainsaw Man',
    rarity: 'Medium',
    stat: { type: 'HP', value: 20 },
    quote: 'If there is a bed and jam for toast, that is heaven!',
    desc: 'Unstoppable chainsaw revving devil.'
  },
  {
    characterId: 'card_zack_lee',
    name: 'Zack Lee (Iron Boxing)',
    anime: 'Lookism',
    rarity: 'Medium',
    stat: { type: 'DEF', value: 2 },
    quote: 'I will never lose to anyone again.',
    desc: 'Iron Fortress boxing stance.'
  },
  {
    characterId: 'card_godrick_footman',
    name: 'Godrick Guard',
    anime: 'Elden Ring',
    rarity: 'Common',
    stat: { type: 'HP', value: 10 },
    quote: 'For Lord Godrick the Golden!',
    desc: 'Basic infantry collectible card.'
  }
];

export const RUSSIAN_ROULETTE_ITEMS = [
  {
    name: 'Magnifying Glass',
    icon: 'Search',
    effect: 'Inspect the current cylinder',
    utility: '100% reveals whether the currently loaded chamber holds a Live Shell or a Blank.',
    strategy: 'Use first on your turn. If live, shoot the opponent. If blank, shoot yourself to gain an extra free turn!'
  },
  {
    name: 'Cigarette',
    icon: 'Cigarette',
    effect: '+1 HP Recovery',
    utility: 'Immediately restores 1 point of life (up to your starting max HP).',
    strategy: 'Best used after surviving a live round to keep out of one-shot fatal threshold.'
  },
  {
    name: 'Handcuffs',
    icon: 'Lock',
    effect: 'Skip Opponent Turn',
    utility: 'Restrains the opponent, completely skipping their upcoming turn.',
    strategy: 'Devastating when the cylinder has multiple live shells or after knowing the next shell is live.'
  },
  {
    name: 'Beer Can',
    icon: 'Wine',
    effect: 'Eject Current Shell',
    utility: 'Safely racks the shotgun slide and discards the loaded shell without firing.',
    strategy: 'Safely discards a known live shell if you cannot shoot the opponent or to adjust shell odds.'
  },
  {
    name: 'Hand Saw',
    icon: 'Scissors',
    effect: '2x Shell Damage',
    utility: 'Saws off the shotgun barrel, causing the next fired live round to deal 2 HP damage instead of 1.',
    strategy: 'Combines lethally with Magnifying Glass when a live shell is confirmed for an instant knockout.'
  }
];

export const BOT_COMMANDS = [
  {
    category: 'Character & Stats',
    command: '/levelup',
    params: '[stat] [points]',
    desc: 'Spend collected Shards at the Site of Grace to level up core attributes (HP, STR, DEX, SPD, DEF).',
    example: '/levelup str 5'
  },
  {
    category: 'Character & Stats',
    command: '/respec',
    params: '',
    desc: 'Reset all allocated stat points back to base level for a fee of 100 Shards.',
    example: '/respec'
  },
  {
    category: 'Character & Stats',
    command: '/talismans',
    params: '',
    desc: 'View your unlocked Talisman Pouch slots (1 at lvl 1, 2 at lvl 25, 3 at lvl 50) and equipped anime cards.',
    example: '/talismans'
  },
  {
    category: 'Character & Stats',
    command: '/profile',
    params: '[@user]',
    desc: 'Displays character level, title, equipped weapon, stats, win rate, and balance.',
    example: '/profile'
  },
  {
    category: 'Armory & Smithy',
    command: '/wshop',
    params: '',
    desc: 'Browse the daily rotating Tier 1 weapon shop (rotates deterministically every 24h UTC).',
    example: '/wshop'
  },
  {
    category: 'Armory & Smithy',
    command: '/armory',
    params: '[page]',
    desc: 'Browse all collected weapons with 3 per page pagination and detailed stat scalings.',
    example: '/armory 1'
  },
  {
    category: 'Armory & Smithy',
    command: '/equip',
    params: '<weapon_id>',
    desc: 'Equip a weapon from your armory to active combat hand.',
    example: '/equip rivers_of_blood'
  },
  {
    category: 'Armory & Smithy',
    command: '/upgrade',
    params: '<weapon_id>',
    desc: 'Upgrade a weapon from +1 up to +10 at the Master Smithy (+12% DMG, +0.05 scaling, +1% block per level).',
    example: '/upgrade uchigatana'
  },
  {
    category: 'Combat & Raids',
    command: '/explore',
    params: '',
    desc: 'Venture into the wilderness to encounter PvE enemies (65% Tier 1, 25% Tier 2, 10% Tier 3).',
    example: '/explore'
  },
  {
    category: 'Combat & Raids',
    command: '/hunt',
    params: '',
    desc: 'Targeted PvE encounter in dangerous terrain with elevated shard & XP multipliers.',
    example: '/hunt'
  },
  {
    category: 'Combat & Raids',
    command: '/boss',
    params: '',
    desc: 'Join the synchronized 2-hour Tier 5 Major Lore Boss raid (Malenia, Sukuna, Aizen, Jin-Woo, Godfrey).',
    example: '/boss'
  },
  {
    category: 'Combat & Raids',
    command: '/fight',
    params: '@user [wager]',
    desc: 'Challenge another player to a real-time turn-based PvP Arena duel with optional shard wager.',
    example: '/fight @TarnishedWarrior 500'
  },
  {
    category: 'Minigames & Duels',
    command: '/duel',
    params: '<amount>',
    desc: 'Initiate a high-stakes Russian Roulette shotgun duel with tactical items.',
    example: '/duel 1000'
  },
  {
    category: 'Minigames & Duels',
    command: '/rduel',
    params: '@user',
    desc: 'Challenge a rival to a 3-round card wager duel where the winner claims character cards.',
    example: '/rduel @CardCollector'
  },
  {
    category: 'Minigames & Duels',
    command: '/quiz_top',
    params: '',
    desc: 'Display the global Telegram trivia leaderboard and all-time quiz masters.',
    example: '/quiz_top'
  },
  {
    category: 'Gacha & Economy',
    command: '/daily',
    params: '',
    desc: 'Claim your daily login bonus of Shards and a free Anime Card summon ticket.',
    example: '/daily'
  },
  {
    category: 'Gacha & Economy',
    command: '/weekly',
    params: '',
    desc: 'Claim weekly reward crates containing rare upgrade stones and premium gacha draws.',
    example: '/weekly'
  }
];

export function getDailyWeapons(date = new Date()) {
  const tier1Weapons = WEAPONS_DATABASE.filter(w => w.tier === 1);
  const startOfYear = new Date(date.getUTCFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
  const idx1 = Math.abs((dayOfYear * 3) % tier1Weapons.length);
  const idx2 = Math.abs((dayOfYear * 3 + 1) % tier1Weapons.length);
  const idx3 = Math.abs((dayOfYear * 3 + 2) % tier1Weapons.length);
  return [tier1Weapons[idx1], tier1Weapons[idx2], tier1Weapons[idx3]];
}

export function getCurrentMajorBoss(now = new Date()) {
  const bosses = ENEMIES_DATABASE.tier5_major_bosses;
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
  const nextUpgradeCost = lvl < 10 ? costPerLevel(lvl) : 0;

  return {
    ...weapon,
    level: lvl,
    base_dmg,
    scaling_str,
    scaling_dex,
    scaling_spd,
    scaling_def,
    block_pct,
    totalShardsSpent,
    nextUpgradeCost
  };
}

export function calculatePlayerStats(level, statAllocations, talismans = []) {
  const hpPoints = statAllocations.HP || 0;
  const strPoints = statAllocations.STR || 0;
  const dexPoints = statAllocations.DEX || 0;
  const spdPoints = statAllocations.SPD || 0;
  const defPoints = statAllocations.DEF || 0;

  let talismanBonus = { HP: 0, STR: 0, DEX: 0, SPD: 0, DEF: 0 };
  talismans.forEach(t => {
    if (t && t.stat) {
      talismanBonus[t.stat.type] = (talismanBonus[t.stat.type] || 0) + t.stat.value;
    }
  });

  const finalHP = 100 + (hpPoints * 10) + talismanBonus.HP;
  const finalSTR = strPoints + talismanBonus.STR;
  const finalDEX = dexPoints + talismanBonus.DEX;
  const finalSPD = spdPoints + talismanBonus.SPD;
  const finalDEF = defPoints + talismanBonus.DEF;

  const critChance = Math.min(0.60, 0.05 + (finalDEX * 0.0035));
  const defMitigation = finalDEF / (finalDEF + 80);
  const passiveDodge = finalSPD / (finalSPD + 120);

  const titleObj = TITLES_PROGRESSION.find(t => level >= t.minLevel && level <= t.maxLevel) || TITLES_PROGRESSION[0];

  return {
    level,
    title: titleObj.title,
    perk: titleObj.perk,
    maxHP: finalHP,
    stats: {
      HP: finalHP,
      STR: finalSTR,
      DEX: finalDEX,
      SPD: finalSPD,
      DEF: finalDEF
    },
    derived: {
      critChance: +(critChance * 100).toFixed(1),
      defMitigation: +(defMitigation * 100).toFixed(1),
      passiveDodge: +(passiveDodge * 100).toFixed(1)
    },
    talismanBonus
  };
}

export const ANIME_CARDS = ANIME_CARDS_DATABASE.map(c => ({
  id: c.characterId,
  ...c
}));

export const ROULETTE_ITEMS = [
  {
    id: 'glass',
    name: 'Magnifying Glass',
    icon: '🔍',
    desc: 'Reveals whether the loaded chamber is a Live Shell or a Blank.',
    strategy: 'Use first on your turn. If live, shoot opponent. If blank, shoot yourself to retain turn.'
  },
  {
    id: 'cigarette',
    name: 'Cigarette',
    icon: '🚬',
    desc: 'Restores +1 HP life point immediately.',
    strategy: 'Best used after surviving a live round to keep out of lethal one-shot threshold.'
  },
  {
    id: 'cuffs',
    name: 'Handcuffs',
    icon: '🔗',
    desc: 'Restrains the opponent, forcing them to skip their next action.',
    strategy: 'Devastating when the cylinder has multiple live shells or when paired with saw.'
  },
  {
    id: 'beer',
    name: 'Beer',
    icon: '🍺',
    desc: 'Racks the cylinder and ejects the current shell safely without firing.',
    strategy: 'Safely discards a known live shell or cycles through blanks.'
  },
  {
    id: 'saw',
    name: 'Hand Saw',
    icon: '🪚',
    desc: 'Saws off the shotgun barrel so the next live round deals 2x damage.',
    strategy: 'Combines lethally with Magnifying Glass for an instant knockout strike.'
  }
];

export const ALL_ENEMIES = [
  ...(ENEMIES_DATABASE.tier1 || []).map(e => ({ ...e, tier: 1, atk: e.base_dmg, hp: e.hp, shards: e.shard_reward, xp: e.xp_reward })),
  ...(ENEMIES_DATABASE.tier2 || []).map(e => ({ ...e, tier: 2, atk: e.base_dmg, hp: e.hp, shards: e.shard_reward, xp: e.xp_reward })),
  ...(ENEMIES_DATABASE.tier3 || []).map(e => ({ ...e, tier: 3, atk: e.base_dmg, hp: e.hp, shards: e.shard_reward, xp: e.xp_reward })),
  ...(ENEMIES_DATABASE.tier5_major_bosses || []).map(e => ({ ...e, tier: 5, atk: e.base_dmg, hp: e.hp, shards: e.shard_reward, xp: e.xp_reward }))
];

// Add cmd property to BOT_COMMANDS
BOT_COMMANDS.forEach(cmd => {
  if (!cmd.cmd) cmd.cmd = cmd.command;
});

