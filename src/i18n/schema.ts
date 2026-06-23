import { Lang } from "quasar";

export function getLocalLanguage(): PageLanguage {
  const l = Lang.getLocale() || navigator.language;
  if (l.toLowerCase().includes("zh")) {
    return "zh-CN";
  }
  return "en-US";
}

export const languageOptions = [
  { label: "English", value: "en-US" as const },
  { label: "中文 (简体)", value: "zh-CN" as const },
];

export const langPath = "en-US|zh-CN";
