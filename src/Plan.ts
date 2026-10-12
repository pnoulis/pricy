import type { TSector } from "./Provider.ts";

export const CustomerSegment = {
  Consumer: "CONSUMER",
  Business: "BUSINESS",
} as const;
export type TCustomerSegment =
  (typeof CustomerSegment)[keyof typeof CustomerSegment];

export const PaymentModel = {
  /*
    Prepaid plans are defined by payments in advance for balance/units/bundles
    before usage. No monthly commitment, credit check, or recurring bill
    liability
   */
  Prepaid: "PREPAID",

  /*
    Postpaid plans are defined by signed contracts where utility units are
    consumed first, get metered, and receive an invoice periodically
    (monthly/bi-monthly etc)
   */
  Postpaid: "POSTPAID",
} as const;
export type TPaymentModel = (typeof PaymentModel)[keyof typeof PaymentModel];

export const RateType = {
  /*
    In Fixed plans the price per unit (and standing fee) is locked for a defined
    commitment period
   */
  Fixed: "FIXED",

  /*
    In Variable plans the rate/price fluctuates periodically based on wholesale
    market indices
   */
  Variable: "VARIABLE",

  /*
    In Real Time plans the price changes hourly based on actual consumption
    through the use of smart meters etc
   */
  RealTime: "REAL_TIME",
} as const;
export type TRateType = (typeof RateType)[keyof typeof RateType];

export type TUpfrontCharge = {
  activationFee?: number;
  equipmentFee?: number;
  deposit?: number;
};

// ISO 8601 duration
export const BillingInterval = {
  Daily: "P1D",
  Weekly: "P1W",
  Days28: "P28D",
  Monthly: "P1M",
  BiMonthly: "P2M",
  Yearly: "P1Y",
} as const;
export type TBillingInterval =
  (typeof BillingInterval)[keyof typeof BillingInterval];

export type TStandingCharge = {
  /* The time interval the standing charge applies to */
  period: TBillingInterval;
  amount: number;
};

export type TTerminationCharge = {
  earlyTerminationFee?: number;
};

export type TBasePlan = {
  id: number;
  providerId: number;
  sector: TSector;
  segment: TCustomerSegment;
  paymentModel: TPaymentModel;
  rateType: TRateType;
  name: string;
  sources: string[];
};

export type TPlanVariant = {
  id: number;
  basePlanId: number;
  name: string;
  specs: Record<string, string | number | boolean>;
};

export type TTariff = {
  id: number;
  planId: number; /* Either a TBasePlan or TPlanVariant */
  revision: string;
  validFrom: string;
  validTo?: string;
  upfrontCharge?: TUpfrontCharge;
  standingCharge?: TStandingCharge;
  terminationCharge?: TTerminationCharge;
  rates: Record<string, number>;
};
