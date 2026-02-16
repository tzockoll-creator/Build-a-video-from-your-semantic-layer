export const basinData = [
  { basin: "Permian Midland", wells: 22, eurOil: 957, ip30Oil: 112, capex: 13.5, npv: -8.8, irr: 38 },
  { basin: "Permian Delaware", wells: 18, eurOil: 998, ip30Oil: 113, capex: 13.8, npv: -8.8, irr: 41 },
  { basin: "Eagle Ford", wells: 16, eurOil: 516, ip30Oil: 60, capex: 12.1, npv: -7.8, irr: 41 },
  { basin: "Bakken", wells: 10, eurOil: 610, ip30Oil: 64, capex: 13.8, npv: -9.1, irr: 45 },
  { basin: "DJ Basin", wells: 9, eurOil: 440, ip30Oil: 48, capex: 12.4, npv: -8.0, irr: 37 },
];

export const tierData = [
  { tier: "Tier 1 Core", wells: 22, eurOil: 721, capex: 12.8, npv: -8.2, irr: 42 },
  { tier: "Tier 2 Development", wells: 18, eurOil: 645, capex: 12.6, npv: -8.1, irr: 40 },
  { tier: "Tier 3 Delineation", wells: 23, eurOil: 867, capex: 13.6, npv: -8.8, irr: 40 },
  { tier: "Maintenance", wells: 12, eurOil: 828, capex: 13.8, npv: -9.1, irr: 38 },
];

export const statusData = [
  { status: "Possible", wells: 16, irr: 42, payout: 25 },
  { status: "PUD", wells: 13, irr: 42, payout: 24 },
  { status: "Probable", wells: 13, irr: 40, payout: 25 },
  { status: "DUC", wells: 11, irr: 39, payout: 23 },
  { status: "Drilled Uncomp.", wells: 9, irr: 34, payout: 21 },
  { status: "Ready to Drill", wells: 7, irr: 39, payout: 26 },
  { status: "Permitted", wells: 6, irr: 44, payout: 27 },
];

export const keyStats = {
  totalWells: 75,
  avgCapex: 13.1,
  avgNpv: -8.5,
  avgIrr: 40,
  avgPayout: 24,
  topBasin: "Bakken (45% IRR)",
  topTier: "Tier 1 Core (42% IRR)",
};
