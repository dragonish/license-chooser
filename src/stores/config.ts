import { defineStore, acceptHMRUpdate } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export type DarkMode = "auto" | "dark" | "light";

export const useConfigStore = defineStore("config", {
  state: () => {
    const darkMode = useLocalStorage<DarkMode>("darkMode", "auto");

    return {
      darkMode,
    };
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot));
}
