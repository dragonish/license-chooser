import { defineStore, acceptHMRUpdate } from "pinia";
import { useLocalStorage, type RemovableRef } from "@vueuse/core";
import { licenseList } from "src/constants/licenses";

type FilterOption = boolean | null;

interface LicenseStore {
  list: LicenseItem[];
  sortKey: RemovableRef<SortType>;
  patentUse: FilterOption | "not";
  discloseSource: FilterOption;
  licenseAndCopyrightNotice: FilterOption | "forSorce";
  networkUseIsDistribution: FilterOption;
  sameLicense: FilterOption | "file" | "library";
  stateChanges: FilterOption;
  liability: FilterOption;
  trademarkUse: FilterOption;
  warranty: FilterOption;
  search: string;
}

export const useLicenseStore = defineStore("license", {
  state: (): LicenseStore => ({
    list: [...licenseList],
    sortKey: useLocalStorage<SortType>("sortKey", "usage"),
    patentUse: null,
    discloseSource: null,
    licenseAndCopyrightNotice: null,
    networkUseIsDistribution: null,
    sameLicense: null,
    stateChanges: null,
    liability: null,
    trademarkUse: null,
    warranty: null,
    search: "",
  }),

  getters: {
    sortList: (state) => {
      const filterList = state.list.filter((item) => {
        if (state.patentUse != null) {
          if (
            state.patentUse === true &&
            !item.permissions?.includes("patentUse")
          ) {
            return false;
          }

          if (
            state.patentUse === "not" &&
            !item.limitations?.includes("patentUse")
          ) {
            return false;
          }

          if (
            !state.patentUse &&
            (item.permissions?.includes("patentUse") ||
              item.limitations?.includes("patentUse"))
          ) {
            return false;
          }
        }

        if (state.discloseSource != null) {
          if (
            state.discloseSource &&
            !item.conditions?.includes("discloseSource")
          ) {
            return false;
          }

          if (
            !state.discloseSource &&
            item.conditions?.includes("discloseSource")
          ) {
            return false;
          }
        }

        if (state.licenseAndCopyrightNotice != null) {
          if (
            state.licenseAndCopyrightNotice === true &&
            !item.conditions?.includes("licenseAndCopyrightNotice")
          ) {
            return false;
          }

          if (
            state.licenseAndCopyrightNotice === "forSorce" &&
            !item.conditions?.includes("licenseAndCopyrightNoticeForSource")
          ) {
            return false;
          }

          if (
            !state.licenseAndCopyrightNotice &&
            (item.conditions?.includes("licenseAndCopyrightNotice") ||
              item.conditions?.includes("licenseAndCopyrightNoticeForSource"))
          ) {
            return false;
          }
        }

        if (state.networkUseIsDistribution != null) {
          if (
            state.networkUseIsDistribution &&
            !item.conditions?.includes("networkUseIsDistribution")
          ) {
            return false;
          }

          if (
            !state.networkUseIsDistribution &&
            item.conditions?.includes("networkUseIsDistribution")
          ) {
            return false;
          }
        }

        if (state.sameLicense != null) {
          if (
            state.sameLicense === true &&
            !item.conditions?.includes("sameLicense")
          ) {
            return false;
          }

          if (
            state.sameLicense === "file" &&
            !item.conditions?.includes("sameLicenseFile")
          ) {
            return false;
          }

          if (
            state.sameLicense === "library" &&
            !item.conditions?.includes("sameLicenseLibrary")
          ) {
            return false;
          }

          if (
            !state.sameLicense &&
            (item.conditions?.includes("sameLicense") ||
              item.conditions?.includes("sameLicenseFile") ||
              item.conditions?.includes("sameLicenseLibrary"))
          ) {
            return false;
          }
        }

        if (state.stateChanges != null) {
          if (
            state.stateChanges &&
            !item.conditions?.includes("stateChanges")
          ) {
            return false;
          }

          if (
            !state.stateChanges &&
            item.conditions?.includes("stateChanges")
          ) {
            return false;
          }
        }

        if (state.liability != null) {
          if (state.liability && !item.limitations?.includes("liability")) {
            return false;
          }

          if (!state.liability && item.limitations?.includes("liability")) {
            return false;
          }
        }

        if (state.trademarkUse != null) {
          if (
            state.trademarkUse &&
            !item.limitations?.includes("trademarkUse")
          ) {
            return false;
          }

          if (
            !state.trademarkUse &&
            item.limitations?.includes("trademarkUse")
          ) {
            return false;
          }
        }

        if (state.warranty != null) {
          if (state.warranty && !item.limitations?.includes("warranty")) {
            return false;
          }

          if (!state.warranty && item.limitations?.includes("warranty")) {
            return false;
          }
        }

        const searchText = state.search.toLowerCase().trim();
        if (searchText) {
          if (
            !item.id.toLowerCase().includes(searchText) &&
            !item.name.toLowerCase().includes(searchText)
          ) {
            return false;
          }
        }

        return true;
      });

      if (state.sortKey === "usage") {
        return filterList.toSorted((a, b) => b.usage - a.usage);
      }
      return filterList;
    },

    licenseCount(): number {
      return this.sortList.length;
    },

    allLicenseCount: (state) => {
      return state.list.length;
    },

    filterCount: (state) => {
      let count = 0;
      if (state.patentUse != null) {
        count++;
      }
      if (state.discloseSource != null) {
        count++;
      }
      if (state.licenseAndCopyrightNotice != null) {
        count++;
      }
      if (state.networkUseIsDistribution != null) {
        count++;
      }
      if (state.sameLicense != null) {
        count++;
      }
      if (state.stateChanges != null) {
        count++;
      }
      if (state.liability != null) {
        count++;
      }
      if (state.trademarkUse != null) {
        count++;
      }
      if (state.warranty != null) {
        count++;
      }

      return count;
    },

    allFilterCount: () => 9,
  },

  actions: {
    getLicense(id: string) {
      for (const item of this.list) {
        if (item.id === id) {
          return item;
        }
      }
      return null;
    },

    resetFilters() {
      this.patentUse = null;
      this.discloseSource = null;
      this.licenseAndCopyrightNotice = null;
      this.networkUseIsDistribution = null;
      this.sameLicense = null;
      this.stateChanges = null;
      this.liability = null;
      this.trademarkUse = null;
      this.warranty = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLicenseStore, import.meta.hot));
}
