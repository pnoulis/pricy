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

export const plans: TPlans = new Map();

export const telekomGigamax: TBasePlan = {
  id: plans.size + 1,
  providerId: 1,
  sector: Sector.Telecom,
  segment: CustomerSegment.Consumer,
  paymentModel: PaymentModel.Postpaid,
  rateType: RateType.Fixed,
  name: "Telekom Gigamax",
  sources: [
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
    "https://www.telekom.gr/static/residential/en/5g-wifi",
    "https://www.telekom.gr/static/residential/el/5g-wifi",
  ],
};
plans.set(telekom5GWiFi, []);
