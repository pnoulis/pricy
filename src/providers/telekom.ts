import { Sector } from "../Provider.ts";
import type { TProvider } from "../Provider.ts";
import { CustomerSegment, PaymentModel, RateType } from "../Plan.ts";
import type { TBasePlan, TPlans } from "../Plan.ts";

export const Telekom: TProvider = {
  id: 1,
  sector: [Sector.Broadband, Sector.Telecom],
  name: "telekom",
  homepage: "https://www.telekom.gr",
};

const PlanCategory = {
  "5G WiFi": "5G WiFi",
  "Business Double Play Plans": "Business Double Play Plans",
  "Business Email": "Business Email",
  "Business Telephony": "Business Telephony",
  "COSMOTE FIBER TO ROOM": "COSMOTE FIBER TO ROOM",
  "Double Play FTTH - Wizard": "Double Play FTTH - Wizard",
  "Double Play Fiberspeed up to 200 Mbps":
    "Double Play Fiberspeed up to 200 Mbps",
  "Double Play Fiberspeed up to 3Gbps": "Double Play Fiberspeed up to 3Gbps",
  "Double Play Plans": "Double Play Plans",
  "Double Play up to 24Mbps": "Double Play up to 24Mbps",
  "Fixed Plans": "Fixed Plans",
  "Home Double Play for Holiday House": "Home Double Play for Holiday House",
  "Home Telephony": "Home Telephony",
  MagentaTV: "MagentaTV",
  "MagentaTV + Netflix": "MagentaTV + Netflix",
  "MagentaTV App offer ": "MagentaTV App offer ",
  "MagentaTV Business Packs": "MagentaTV Business Packs",
  "MagentaTV Business Δορυφορικό": "MagentaTV Business Δορυφορικό",
  "MagentaTV Movies": "MagentaTV Movies",
  "MagentaTV Rate Plans": "MagentaTV Rate Plans",
  "MagentaTV Sport Daily Pass": "MagentaTV Sport Daily Pass",
  "MagentaTV Sports choices": "MagentaTV Sports choices",
  "Mobile Internet plans": "Mobile Internet plans",
  "Mobile Plans": "Mobile Plans",
  "Preconfigured Smartphone Bundle": "Preconfigured Smartphone Bundle",
  "Preconfigured Tablet Bundle": "Preconfigured Tablet Bundle",
  Streaming: "Streaming",
  "Telekom Business Gigamax": "Telekom Business Gigamax",
  "Telekom Fiber 100": "Telekom Fiber 100",
  "Telekom Gigamax Plans": "Telekom Gigamax Plans",
  "Telephony plans": "Telephony plans",
  Satelite: "Δορυφορικό",
} as const;
export type TPlanCategory = (typeof PlanCategory)[keyof typeof PlanCategory];

export const plans: TPlans = new Map();

export const telekomGigamax: TBasePlan = {
  id: plans.size + 1,
  providerId: 1,
  sector: Sector.Telecom,
  segment: CustomerSegment.Consumer,
  paymentModel: PaymentModel.Postpaid,
  rateType: RateType.Fixed,
  name: PlanCategory["Telekom Gigamax Plans"],
  sources: [
    `https://www.telekom.gr/eshop/go/${PlanCategory["Telekom Gigamax Plans"]}`,
    "https://www.telekom.gr/static/residential/en/programmata-kinitis",
    "https://www.telekom.gr/static/residential/el/programmata-kinitis",
  ],
};
plans.set(telekomGigamax, []);

export const mobileInternet: TBasePlan = {
  id: plans.size + 1,
  providerId: 1,
  sector: Sector.Telecom,
  segment: CustomerSegment.Consumer,
  paymentModel: PaymentModel.Postpaid,
  rateType: RateType.Fixed,
  name: "Mobile Internet",
  sources: [
    "https://www.telekom.gr/static/residential/en/programmata-kinitis-mobile-internet",
    "https://www.telekom.gr/static/residential/el/programmata-kinitis-mobile-internet",
  ],
};
plans.set(mobileInternet, []);

export const telekomCardContract: TBasePlan = {
  id: plans.size + 1,
  providerId: 1,
  sector: Sector.Telecom,
  segment: CustomerSegment.Consumer,
  paymentModel: PaymentModel.Prepaid,
  rateType: RateType.Fixed,
  name: "Telekom Card Contract",
  sources: [
    "https://www.telekom.gr/static/residential/en/programmata-kinitis-kartosymvolaio",
    "https://www.telekom.gr/static/residential/el/programmata-kinitis-kartosymvolaio",
  ],
};
plans.set(telekomCardContract, []);

export const telekomCard: TBasePlan = {
  id: plans.size + 1,
  providerId: 1,
  sector: Sector.Telecom,
  segment: CustomerSegment.Consumer,
  paymentModel: PaymentModel.Prepaid,
  rateType: RateType.Fixed,
  name: "Telekom Card",
  sources: [
    "https://www.telekom.gr/static/residential/en/telekom-karta",
    "https://www.telekom.gr/static/residential/el/telekom-karta",
  ],
};
plans.set(telekomCard, []);

export const telekomFiber: TBasePlan = {
  id: plans.size + 1,
  providerId: 1,
  sector: Sector.Broadband,
  segment: CustomerSegment.Consumer,
  paymentModel: PaymentModel.Postpaid,
  rateType: RateType.Fixed,
  name: "Telekom Fiber (Double Play)",
  sources: [
    "https://www.telekom.gr/eshop/go/Fixed%20Plans",
    "https://www.telekom.gr/static/residential/en/nea-programmata-internet",
    "https://www.telekom.gr/static/residential/el/nea-programmata-internet",
  ],
};
plans.set(telekomFiber, []);

const telekom5GWiFiDoublePlay: TBasePlan = {
  id: plans.size + 1,
  providerId: 1,
  sector: Sector.Broadband,
  segment: CustomerSegment.Consumer,
  paymentModel: PaymentModel.Postpaid,
  rateType: RateType.Fixed,
  name: "Telekom 5G WiFi Double Play",
  sources: [
    "https://www.telekom.gr/eshop/go/Fixed%20Plans/Double%20Play%20Plans",
    "https://www.telekom.gr/static/residential/en/5g-wifi",
    "https://www.telekom.gr/static/residential/el/5g-wifi",
  ],
};
plans.set(telekom5GWiFiDoublePlay, []);

export const telekom5GWiFi: TBasePlan = {
  id: plans.size + 1,
  providerId: 1,
  sector: Sector.Broadband,
  segment: CustomerSegment.Consumer,
  paymentModel: PaymentModel.Prepaid,
  rateType: RateType.Fixed,
  name: "Telekom 5G WiFi",
  sources: [
    "https://www.telekom.gr/eshop/go/Fixed%20Plans/5G%20WiFi",
    "https://www.telekom.gr/static/residential/en/5g-wifi",
    "https://www.telekom.gr/static/residential/el/5g-wifi",
  ],
};
plans.set(telekom5GWiFi, []);
