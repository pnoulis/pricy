export const TelecomSpecs = {
  nationalAllowance: null,
  nationalSMSAllowance: null,
  internationalAllowance: null,
  dataAllowance: null,
  roaming: null,
} as const;
export type TTelecomSpecs = (typeof TelecomSpecs)[keyof typeof TelecomSpecs];
