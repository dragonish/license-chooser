<template>
  <q-layout view="hHh LpR lFr">
    <q-header :class="$q.dark.isActive ? 'bg-secondary' : 'bg-primary'">
      <q-toolbar>
        <q-toolbar-title>
          {{ $t("app.title") }}
          <span class="text-subtitle1">v{{ appVersion }}</span>
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          class="cursor-pointer"
          icon="info"
          @click="showAbout = true"
        ></q-btn>

        <q-btn-dropdown
          flat
          dense
          no-caps
          :icon="darkModeIcon"
          :label="currentModeLabel"
        >
          <q-list>
            <q-item
              v-for="mode in darkModeOptions"
              :key="mode.value"
              clickable
              v-close-popup
              :active="configStore.darkMode === mode.value"
              @click="configStore.darkMode = mode.value"
            >
              <q-item-section>{{ mode.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown
          flat
          dense
          no-caps
          icon="language"
          :label="currentLangLabel"
        >
          <q-list>
            <q-item
              v-for="lang in languageOptions"
              :key="lang.value"
              clickable
              v-close-popup
              :active="currentLang === lang.value"
              @click="switchLanguage(lang.value)"
            >
              <q-item-section>{{ lang.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>

      <about-dialog v-model="showAbout" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Dark } from "quasar";
import { languageOptions, getLocalLanguage } from "src/i18n/schema";
import { useConfigStore } from "src/stores/config";
import AboutDialog from "src/components/AboutDialog.vue";

const appVersion = __APP_VERSION__;

const route = useRoute();
const router = useRouter();
const configStore = useConfigStore();
const { locale, t } = useI18n();

const showAbout = ref(false);

const currentLang = computed<PageLanguage>(() => {
  const lang = route.params.lang as PageLanguage | undefined;
  return lang || getLocalLanguage();
});

const currentLangLabel = computed(
  () => languageOptions.find((l) => l.value === currentLang.value)?.label,
);

const darkModeIcon = computed(() => {
  switch (configStore.darkMode) {
    case "dark":
      return "dark_mode";
    case "light":
      return "light_mode";
    default:
      return "brightness_auto";
  }
});

const darkModeOptions = computed(() => [
  { value: "auto" as const, label: t("app.darkModeAuto") },
  { value: "dark" as const, label: t("app.darkModeDark") },
  { value: "light" as const, label: t("app.darkModeLight") },
]);

const currentModeLabel = computed(
  () =>
    darkModeOptions.value.find((l) => l.value === configStore.darkMode)?.label,
);

function switchLanguage(lang: PageLanguage) {
  void router.push({ params: { lang } });
}

watch(
  currentLang,
  (lang) => {
    locale.value = lang;
    document.title = t("app.title");
  },
  { immediate: true },
);

watch(
  () => configStore.darkMode,
  (mode) => {
    Dark.set(mode === "auto" ? "auto" : mode === "dark");
  },
  { immediate: true },
);
</script>
