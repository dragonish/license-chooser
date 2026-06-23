<template>
  <div class="q-pa-md">
    <filter-card
      v-model="licenseStore.patentUse"
      :question="$t('filter.patentUse.question')"
      :description="$t('filter.patentUse.description')"
      :options="patentUseOptions"
    />

    <filter-card
      v-model="licenseStore.discloseSource"
      :question="$t('filter.discloseSource.question')"
      :description="$t('filter.discloseSource.description')"
      :options="discloseSourceOptions"
    />

    <filter-card
      v-model="licenseStore.licenseAndCopyrightNotice"
      :question="$t('filter.licenseAndCopyrightNotice.question')"
      :description="$t('filter.licenseAndCopyrightNotice.description')"
      :options="licenseAndCopyrightNoticeOptions"
    />

    <filter-card
      v-model="licenseStore.networkUseIsDistribution"
      :question="$t('filter.networkUseIsDistribution.question')"
      :description="$t('filter.networkUseIsDistribution.description')"
      :options="networkUseIsDistributionOptions"
    />

    <filter-card
      v-model="licenseStore.sameLicense"
      :question="$t('filter.sameLicense.question')"
      :description="$t('filter.sameLicense.description')"
      :options="sameLicenseOptions"
    />

    <filter-card
      v-model="licenseStore.stateChanges"
      :question="$t('filter.stateChanges.question')"
      :description="$t('filter.stateChanges.description')"
      :options="stateChangeOptions"
    />

    <filter-card
      v-model="licenseStore.liability"
      :question="$t('filter.liability.question')"
      :description="$t('filter.liability.description')"
      :options="liabilityOptions"
    />

    <filter-card
      v-model="licenseStore.trademarkUse"
      :question="$t('filter.trademarkUse.question')"
      :description="$t('filter.trademarkUse.description')"
      :options="trademarkUseOptions"
    />

    <filter-card
      v-model="licenseStore.warranty"
      :question="$t('filter.warranty.question')"
      :description="$t('filter.warranty.description')"
      :options="warrantyOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useLicenseStore } from "stores/license";
import FilterCard from "components/FilterCard.vue";

const { t } = useI18n();

const licenseStore = useLicenseStore();

const patentUseOptions = computed(() => [
  {
    label: t("filter.patentUse.yes"),
    value: true,
    color: "positive",
  },
  {
    label: t("filter.patentUse.no"),
    value: false,
    color: "negative",
  },
  {
    label: t("filter.patentUse.not"),
    value: "not",
    color: "accent",
  },
  {
    label: t("filter.unknown"),
    value: null,
    color: "info",
  },
]);

const discloseSourceOptions = computed(() => [
  {
    label: t("filter.discloseSource.yes"),
    value: true,
    color: "positive",
  },
  {
    label: t("filter.discloseSource.no"),
    value: false,
    color: "negative",
  },
  {
    label: t("filter.unknown"),
    value: null,
    color: "info",
  },
]);

const licenseAndCopyrightNoticeOptions = computed(() => [
  {
    label: t("filter.licenseAndCopyrightNotice.yes"),
    value: true,
    color: "positive",
  },
  {
    label: t("filter.licenseAndCopyrightNotice.forSource"),
    value: "forSource",
    color: "secondary",
  },
  {
    label: t("filter.licenseAndCopyrightNotice.no"),
    value: false,
    color: "negative",
  },
  {
    label: t("filter.unknown"),
    value: null,
    color: "info",
  },
]);

const networkUseIsDistributionOptions = computed(() => [
  {
    label: t("filter.networkUseIsDistribution.yes"),
    value: true,
    color: "positive",
  },
  {
    label: t("filter.networkUseIsDistribution.no"),
    value: false,
    color: "negative",
  },
  {
    label: t("filter.unknown"),
    value: null,
    color: "info",
  },
]);

const sameLicenseOptions = computed(() => [
  {
    label: t("filter.sameLicense.yes"),
    value: true,
    color: "positive",
  },
  {
    label: t("filter.sameLicense.file"),
    value: "file",
    color: "secondary",
  },
  {
    label: t("filter.sameLicense.library"),
    value: "library",
    color: "secondary",
  },
  {
    label: t("filter.sameLicense.no"),
    value: false,
    color: "negative",
  },
  {
    label: t("filter.unknown"),
    value: null,
    color: "info",
  },
]);

const stateChangeOptions = computed(() => [
  {
    label: t("filter.stateChanges.yes"),
    value: true,
    color: "positive",
  },
  {
    label: t("filter.stateChanges.no"),
    value: false,
    color: "negative",
  },
  {
    label: t("filter.unknown"),
    value: null,
    color: "info",
  },
]);

const liabilityOptions = computed(() => [
  {
    label: t("filter.liability.yes"),
    value: true,
    color: "positive",
  },
  {
    label: t("filter.liability.no"),
    value: false,
    color: "negative",
  },
  {
    label: t("filter.unknown"),
    value: null,
    color: "info",
  },
]);

const trademarkUseOptions = computed(() => [
  {
    label: t("filter.trademarkUse.yes"),
    value: true,
    color: "positive",
  },
  {
    label: t("filter.trademarkUse.no"),
    value: false,
    color: "negative",
  },
  {
    label: t("filter.unknown"),
    value: null,
    color: "info",
  },
]);

const warrantyOptions = computed(() => [
  {
    label: t("filter.warranty.yes"),
    value: true,
    color: "positive",
  },
  {
    label: t("filter.warranty.no"),
    value: false,
    color: "negative",
  },
  {
    label: t("filter.unknown"),
    value: null,
    color: "info",
  },
]);
</script>
