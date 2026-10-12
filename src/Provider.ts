export const Sector = {
  Electricity: "ELECTRICITY",
  Gas: "GAS",
  Broadband: "BROADBAND",
  Telecom: "TELECOM",
} as const;
export type TSector = (typeof Sector)[keyof typeof Sector];

export type TProvider = {
  id: number;
  sector: TSector[];
  name: string;
  homepage: string;
};
