export const STAT_TO_ICON = {
  Damage: "attack-damage",
  Attackspeed: "attack-speed",
  Armorpenetration: "armor-penetration",
  Onhit: "on-hit",
  Criticalstrike: "ctrit-chance",
  Lifesteal: "omni-vamp",
  Mana: "mana",
  Spelldamage: "ability-power",
  Magicpenetration: "magic-penetration",
  Cooldownreduction: "ability-haste",
  Health: "health",
  Armor: "armor",
  Spellblock: "magic-resist",
  Boots: "movement-speed"
}

export const filters = [
  {
    name: "Attack",
    tags: ["Damage", "Attackspeed", "Armorpenetration", "Criticalstrike", "Lifesteal", "Onhit"]
  },
  {
    name: "Magic",
    tags: ["Spelldamage", "Cooldownreduction", "Magicpenetration", "Mana"]
  },
  {
    name: "Defense",
    tags: ["Health", "Armor", "Spellblock"]
  },
  {
    name: "Movement",
    tags: ["Boots"]
  },
];