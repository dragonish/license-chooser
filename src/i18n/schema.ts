import { Lang } from "quasar";

export function getLocalLanguage(): PageLanguage {
  const l = (Lang.getLocale() || navigator.language).toLowerCase();
  if (l.includes("zh-tw") || l.includes("zh-hant") || l === "zh-hk" || l === "zh-mo") {
    return "zh-TW";
  }
  if (l.includes("zh")) {
    return "zh-CN";
  }
  return "en-US";
}

export const languageOptions = [
  { label: "English", value: "en-US" as const },
  { label: "中文 (简体)", value: "zh-CN" as const },
  { label: "中文 (繁體)", value: "zh-TW" as const },
];

export const langPath = "en-US|zh-CN|zh-TW";
