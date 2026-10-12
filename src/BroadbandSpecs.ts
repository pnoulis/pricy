export const BroadbandSpecs = {
  equipment: null,
  landline: null,
  landlineAllowance: null,
  landlineToBroadbandAllowance: null,
  streamingService: null,
  uploadSpeed: null,
  downloadSpeed: null,
} as const;
export type TBroadbandSpecs =
  (typeof BroadbandSpecs)[keyof typeof BroadbandSpecs];
