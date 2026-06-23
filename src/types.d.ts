type PageLanguage = "en-US" | "zh-CN" | "zh-TW";

type SortType = "usage" | "id";

type Permission =
  | "commercialUse"
  | "distribution"
  | "modification"
  | "patentUse"
  | "privateUse";

type Limitation = "liability" | "patentUse" | "trademarkUse" | "warranty";

type Condition =
  | "discloseSource"
  | "licenseAndCopyrightNotice"
  | "licenseAndCopyrightNoticeForSource"
  | "networkUseIsDistribution"
  | "sameLicense"
  | "sameLicenseFile"
  | "sameLicenseLibrary"
  | "stateChanges";

type UserField =
  | "author"
  | "year"
  | "email"
  | "programIntroduction"
  | "libraryIntroduction"
  | "owner"
  | "holder"
  | "program"
  | "software"
  | "project"
  | "projectName"
  | "projectUrl";

interface LicenseItem {
  id: string;
  name: string;
  abbreviation?: string;
  otherId?: string[];
  variantId?: Record<string, string>;
  permissions?: Permission[];
  limitations?: Limitation[];
  conditions?: Condition[];
  userFields?: UserField[];
  usage: number;
}
